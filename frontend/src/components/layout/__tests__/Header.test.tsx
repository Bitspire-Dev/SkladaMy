import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../Header";

describe("Header", () => {
  it("should render logo with link to home", () => {
    render(<Header />);
    const logoLink = screen.getByRole("link", { name: /SkładaMy/ });
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("should render desktop navigation links", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "O nas" })).toHaveAttribute("href", "/o-nas");
    expect(screen.getByRole("link", { name: "Portfolio" })).toHaveAttribute("href", "/portfolio");
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
    expect(screen.getByRole("link", { name: "Słupsk" })).toHaveAttribute("href", "/slupsk");
    expect(screen.getByRole("link", { name: "Kontakt" })).toHaveAttribute("href", "/kontakt");
  });

  it("should render call button with tel link", () => {
    render(<Header />);
    const callButton = screen.getByRole("link", { name: /zadzwoń/i });
    expect(callButton).toHaveAttribute("href", expect.stringContaining("tel:"));
  });

  it("should render contact button linking to kontakt page", () => {
    render(<Header />);
    const contactButton = screen.getByRole("link", { name: /zapytanie/i });
    expect(contactButton).toHaveAttribute("href", "/kontakt");
  });

  it("should render mobile menu button", () => {
    render(<Header />);
    const menuButton = screen.getByRole("button", { name: /otwórz menu/i });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("should toggle mobile menu on button click", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const menuButton = screen.getByRole("button", { name: /otwórz menu/i });
    await user.click(menuButton);

    // After click, button should show "Zamknij menu"
    const closeButton = screen.getByRole("button", { name: /zamknij menu/i });
    expect(closeButton).toHaveAttribute("aria-expanded", "true");
  });

  it("should have correct navigation aria label", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "Top" });
    expect(nav).toBeInTheDocument();
  });

  it("should close mobile menu when a mobile menu navigation link is clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);

    // Open menu
    const menuButton = screen.getByRole("button", { name: /otwórz menu/i });
    await user.click(menuButton);

    // Click a mobile navigation link
    const links = screen.getAllByRole("link", { name: "O nas" });
    await user.click(links[1]);

    // Menu should close
    expect(screen.getByRole("button", { name: /otwórz menu/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });
});
