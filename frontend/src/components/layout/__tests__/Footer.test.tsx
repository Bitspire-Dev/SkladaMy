import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Footer from "../Footer";

interface CustomWindow extends Window {
  openCookiePreferences?: () => void;
}

describe("Footer", () => {
  it("should render company info section", () => {
    render(<Footer />);
    expect(screen.getByText(/Profesjonalny montaż mebli/)).toBeInTheDocument();
  });

  it("should render footer sections with titles", () => {
    render(<Footer />);
    expect(screen.getByText("Usługi")).toBeInTheDocument();
    expect(screen.getByText("Informacje")).toBeInTheDocument();
    expect(screen.getByText("Montaż w Słupsku")).toBeInTheDocument();
  });

  it("should render service links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Montaż mebli IKEA" })).toHaveAttribute(
      "href",
      "/#uslugi"
    );
    expect(screen.getByRole("link", { name: "Portfolio realizacji" })).toHaveAttribute(
      "href",
      "/portfolio"
    );
  });

  it("should render info links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "O nas" })).toHaveAttribute("href", "/o-nas");
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
  });

  it("should render location links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Montaż mebli Słupsk" })).toHaveAttribute(
      "href",
      "/slupsk"
    );
  });

  it("should render contact phone link", () => {
    render(<Footer />);
    const phoneLink = screen.getByRole("link", { name: /\+48 780/ });
    expect(phoneLink).toHaveAttribute("href", expect.stringContaining("tel:"));
  });

  it("should render contact email link", () => {
    render(<Footer />);
    const emailLink = screen.getByRole("link", { name: /kontakt@skladamy.com.pl/ });
    expect(emailLink).toHaveAttribute("href", "mailto:kontakt@skladamy.com.pl");
  });

  it("should render copyright with current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${currentYear} SkładaMy`))).toBeInTheDocument();
  });

  it("should render legal links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Polityka prywatności" })).toHaveAttribute(
      "href",
      "/polityka-prywatnosci"
    );
    expect(screen.getByRole("link", { name: "Regulamin" })).toHaveAttribute("href", "/regulamin");
  });

  it("should have footer role", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("should call window.openCookiePreferences when cookie preferences button is clicked", async () => {
    const user = userEvent.setup();
    const mockOpenPreferences = vi.fn();
    (window as CustomWindow).openCookiePreferences = mockOpenPreferences;

    render(<Footer />);

    const cookieButton = screen.getByRole("button", { name: /Otwórz ustawienia cookies/i });
    await user.click(cookieButton);

    expect(mockOpenPreferences).toHaveBeenCalled();

    // Clean up
    delete (window as CustomWindow).openCookiePreferences;
  });
});
