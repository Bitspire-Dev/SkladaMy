import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StickyCTA from "../StickyCTA";

type TestWindow = {
  gtag?: (...args: unknown[]) => void;
};

describe("StickyCTA", () => {
  beforeEach(() => {
    // Reset scroll position. Component uses window.scrollY (pageYOffset is
    // deprecated).
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should not render initially when scroll is at top", () => {
    render(<StickyCTA />);
    // Component uses scrollY > 300 to show
    expect(screen.queryByRole("link", { name: /zadzwoń/i })).not.toBeInTheDocument();
  });

  it("should render call button with correct phone link after scroll", async () => {
    // Mock scroll position
    Object.defineProperty(window, "scrollY", { value: 400, writable: true });

    render(<StickyCTA />);

    // Trigger scroll event
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    // Wait for component to update
    await waitFor(() => {
      expect(screen.getByRole("link", { name: /zadzwoń/i })).toBeInTheDocument();
    });

    const callButton = screen.getByRole("link", { name: /zadzwoń/i });
    expect(callButton).toHaveAttribute("href", expect.stringContaining("tel:"));
  });

  it("should have mobile-only classes", async () => {
    Object.defineProperty(window, "scrollY", { value: 400, writable: true });
    render(<StickyCTA />);
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    await waitFor(() => {
      expect(screen.getByRole("link", { name: /zadzwoń/i })).toBeInTheDocument();
    });

    const container = screen.getByRole("link", { name: /zadzwoń/i }).parentElement;
    expect(container).toHaveClass("md:hidden");
  });

  it("should hide call button when scrolling back to top", async () => {
    // 1. Scroll down to show button
    Object.defineProperty(window, "scrollY", { value: 400, writable: true });
    render(<StickyCTA />);

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    await waitFor(() => {
      expect(screen.getByRole("link", { name: /zadzwoń/i })).toBeInTheDocument();
    });

    // 2. Scroll back up to hide button
    Object.defineProperty(window, "scrollY", { value: 100, writable: true });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    await waitFor(() => {
      expect(screen.queryByRole("link", { name: /zadzwoń/i })).not.toBeInTheDocument();
    });
  });

  it("should call window.gtag when call button is clicked and gtag is available", async () => {
    const user = userEvent.setup();
    const mockGtag = vi.fn();

    // Mock global gtag
    (window as TestWindow).gtag = mockGtag;

    Object.defineProperty(window, "scrollY", { value: 400, writable: true });
    render(<StickyCTA />);

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    await waitFor(() => {
      expect(screen.getByRole("link", { name: /zadzwoń/i })).toBeInTheDocument();
    });

    const callButton = screen.getByRole("link", { name: /zadzwoń/i });
    await user.click(callButton);

    expect(mockGtag).toHaveBeenCalledWith("event", "call_click", {
      event_category: "engagement",
      event_label: "sticky_cta",
    });

    // Clean up
    delete (window as TestWindow).gtag;
  });
});
