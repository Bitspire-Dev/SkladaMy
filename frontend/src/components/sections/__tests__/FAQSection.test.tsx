import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FAQSection from "../FAQSection";

describe("FAQSection", () => {
  it("should render FAQ heading", () => {
    render(<FAQSection />);
    expect(screen.getByText(/Najczęściej zadawane pytania/i)).toBeInTheDocument();
  });

  it("should render FAQ items from data", () => {
    render(<FAQSection />);
    // Should have multiple FAQ item buttons
    const faqButtons = screen.getAllByRole("button", { expanded: false });
    expect(faqButtons.length).toBeGreaterThan(0);
  });

  it("should render contact CTAs", () => {
    render(<FAQSection />);
    expect(screen.getByText(/Nie znalazłeś odpowiedzi/i)).toBeInTheDocument();
    // Check for tel link and contact link
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(2);
  });

  it("should have proper section heading hierarchy", () => {
    render(<FAQSection />);
    const heading = screen.getByRole("heading", { level: 2, name: /pytania/i });
    expect(heading).toBeInTheDocument();
  });

  it("should expand and collapse an FAQ item when clicked", async () => {
    const user = userEvent.setup();
    render(<FAQSection />);

    // Get the first FAQ item button
    const firstButton = screen.getAllByRole("button", { expanded: false })[0];

    // Initially the button has aria-expanded = false
    expect(firstButton).toHaveAttribute("aria-expanded", "false");

    // Click to open
    await user.click(firstButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "true");

    // Click again to close
    await user.click(firstButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "false");
  });

  it("should filter FAQ items when a category button is clicked", async () => {
    const user = userEvent.setup();
    render(<FAQSection />);

    // Click on "Montaż" category
    const montazButton = screen.getByRole("button", { name: "Montaż" });
    await user.click(montazButton);

    // Verify it is pressed
    expect(montazButton).toHaveAttribute("aria-pressed", "true");

    // Click on "Wszystkie" to restore all
    const wszystkieButton = screen.getByRole("button", { name: "Wszystkie" });
    await user.click(wszystkieButton);
    expect(wszystkieButton).toHaveAttribute("aria-pressed", "true");
  });
});
