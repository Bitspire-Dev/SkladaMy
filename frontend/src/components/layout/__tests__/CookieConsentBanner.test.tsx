import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CookieConsentBanner from "../CookieConsentBanner";

type TestWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  openCookiePreferences?: () => void;
};

describe("CookieConsentBanner", () => {
  let initialScript: HTMLScriptElement;

  beforeEach(() => {
    // Clear cookies
    document.cookie = "cookie_consent=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    // Reset window.dataLayer and preferences triggers
    delete (window as TestWindow).dataLayer;
    delete (window as TestWindow).openCookiePreferences;

    // Reset scripts
    document.querySelectorAll("#gtm-script-loader").forEach((el) => el.remove());

    // Add a dummy script to ensure there's at least one script element
    // because GTM loader uses document.getElementsByTagName("script")[0]
    initialScript = document.createElement("script");
    document.head.appendChild(initialScript);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    initialScript.remove();
    document.querySelectorAll("#gtm-script-loader").forEach((el) => el.remove());
  });

  const getConsentCookieValue = () => {
    const cookies = document.cookie.split(";").reduce(
      (acc, c) => {
        const [key, val] = c.trim().split("=");
        if (key) acc[key] = val;
        return acc;
      },
      {} as Record<string, string>
    );
    const val = cookies["cookie_consent"];
    return val ? JSON.parse(decodeURIComponent(val)) : null;
  };

  it("should render when no cookie consent exists", () => {
    render(<CookieConsentBanner />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/Pliki cookies i Twoja prywatność/i)).toBeInTheDocument();
  });

  it("should not render when cookie consent already exists", () => {
    const existingConsent = {
      necessary: true,
      analytics: true,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    document.cookie = `cookie_consent=${encodeURIComponent(JSON.stringify(existingConsent))}; Path=/;`;

    render(<CookieConsentBanner />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should render when external openCookiePreferences is called", async () => {
    const existingConsent = {
      necessary: true,
      analytics: true,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    document.cookie = `cookie_consent=${encodeURIComponent(JSON.stringify(existingConsent))}; Path=/;`;

    render(<CookieConsentBanner />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Call external function to open banner
    act(() => {
      if (window.openCookiePreferences) {
        window.openCookiePreferences();
      }
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    // Verify states are initialized from existing cookies
    const analyticsCheckbox = screen.getByLabelText(/^Analityczne/i) as HTMLInputElement;
    const marketingCheckbox = screen.getByLabelText(/^Marketingowe/i) as HTMLInputElement;

    expect(analyticsCheckbox.checked).toBe(true);
    expect(marketingCheckbox.checked).toBe(false);
  });

  it("should accept all cookies and inject GTM script when Accept All is clicked", async () => {
    const user = userEvent.setup();
    render(<CookieConsentBanner />);

    const acceptAllBtn = screen.getByRole("button", { name: /Akceptuj wszystko/i });
    await user.click(acceptAllBtn);

    // Assert cookie is written correctly
    const cookieVal = getConsentCookieValue();
    expect(cookieVal.necessary).toBe(true);
    expect(cookieVal.analytics).toBe(true);
    expect(cookieVal.marketing).toBe(true);

    // Assert dataLayer event is pushed
    expect(window.dataLayer).toContainEqual({
      event: "consent_update",
      consent: { analytics: true, marketing: true, necessary: true },
    });

    // Assert script is injected
    expect(document.getElementById("gtm-script-loader")).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should reject all cookies and not inject GTM script when Reject All is clicked", async () => {
    const user = userEvent.setup();
    render(<CookieConsentBanner />);

    const rejectAllBtn = screen.getByRole("button", { name: /Odrzuć wszystkie/i });
    await user.click(rejectAllBtn);

    const cookieVal = getConsentCookieValue();
    expect(cookieVal.necessary).toBe(true);
    expect(cookieVal.analytics).toBe(false);
    expect(cookieVal.marketing).toBe(false);

    expect(window.dataLayer).toContainEqual({
      event: "consent_update",
      consent: { analytics: false, marketing: false, necessary: true },
    });

    expect(document.getElementById("gtm-script-loader")).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should save selected preferences when Zapisz wybór is clicked", async () => {
    const user = userEvent.setup();
    render(<CookieConsentBanner />);

    const analyticsCheckbox = screen.getByLabelText(/^Analityczne/i);
    const marketingCheckbox = screen.getByLabelText(/^Marketingowe/i);

    // Toggle analytics on and ensure marketing is off (it should be off by default)
    if (!(analyticsCheckbox as HTMLInputElement).checked) {
      await user.click(analyticsCheckbox);
    }
    if ((marketingCheckbox as HTMLInputElement).checked) {
      await user.click(marketingCheckbox);
    }

    const saveBtn = screen.getByRole("button", { name: /Zapisz wybór/i });
    await user.click(saveBtn);

    const cookieVal = getConsentCookieValue();
    expect(cookieVal.analytics).toBe(true);
    expect(cookieVal.marketing).toBe(false);

    expect(window.dataLayer).toContainEqual({
      event: "consent_update",
      consent: { analytics: true, marketing: false, necessary: true },
    });

    expect(document.getElementById("gtm-script-loader")).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should auto-load GTM if initial consent has analytics enabled", () => {
    const existingConsent = {
      necessary: true,
      analytics: true,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    document.cookie = `cookie_consent=${encodeURIComponent(JSON.stringify(existingConsent))}; Path=/;`;

    render(<CookieConsentBanner />);

    expect(document.getElementById("gtm-script-loader")).toBeInTheDocument();
  });
});
