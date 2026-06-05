import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileMenu } from "../MobileMenu";

const mockNavigation = [
  { name: "Home", href: "/" },
  { name: "O nas", href: "/o-nas" },
  { name: "Kontakt", href: "/kontakt" },
];

describe("MobileMenu", () => {
  it("should not render when isOpen is false", () => {
    const onClose = vi.fn();
    render(<MobileMenu isOpen={false} onClose={onClose} navigation={mockNavigation} />);

    // Menu should not be visible
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should render navigation links when open", () => {
    const onClose = vi.fn();
    render(<MobileMenu isOpen={true} onClose={onClose} navigation={mockNavigation} />);

    // Check that each navigation item appears at least once
    mockNavigation.forEach((item) => {
      const elements = screen.getAllByText(item.name);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it("should render close button", () => {
    const onClose = vi.fn();
    render(<MobileMenu isOpen={true} onClose={onClose} navigation={mockNavigation} />);

    expect(screen.getByRole("button", { name: /zamknij menu/i })).toBeInTheDocument();
  });

  it("should call onClose when close button clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<MobileMenu isOpen={true} onClose={onClose} navigation={mockNavigation} />);

    const closeButton = screen.getByRole("button", { name: /zamknij menu/i });
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when backdrop clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<MobileMenu isOpen={true} onClose={onClose} navigation={mockNavigation} />);

    // Click on backdrop (the element with onClick that closes menu)
    const backdrop = screen.getByTestId("mobile-menu-backdrop");
    await user.click(backdrop);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should render contact buttons", () => {
    const onClose = vi.fn();
    render(<MobileMenu isOpen={true} onClose={onClose} navigation={mockNavigation} />);

    expect(screen.getByRole("link", { name: /zadzwoń teraz/i })).toHaveAttribute(
      "href",
      expect.stringContaining("tel:")
    );
    expect(screen.getByRole("link", { name: /napisz wiadomość/i })).toHaveAttribute(
      "href",
      "/kontakt"
    );
  });

  it("should have correct hrefs for navigation links", () => {
    const onClose = vi.fn();
    render(<MobileMenu isOpen={true} onClose={onClose} navigation={mockNavigation} />);

    // Check that navigation links have correct hrefs within the menu list
    const { container } = render(
      <MobileMenu isOpen={true} onClose={onClose} navigation={mockNavigation} />
    );
    mockNavigation.forEach((item) => {
      const links = container.querySelectorAll(`a[href="${item.href}"]`);
      expect(links.length).toBeGreaterThan(0);
    });
  });
});
