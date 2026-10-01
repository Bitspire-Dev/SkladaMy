import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroSection from "../HeroSection";
import { homeSection } from "@/test/fixtures/page-sections";
import type { HeroBlock } from "../blocks/blocks";

const data = homeSection<HeroBlock>("hero");

describe("HeroSection", () => {
  it("should render main heading", () => {
    render(<HeroSection data={data} />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("should contain location in heading", () => {
    render(<HeroSection data={data} />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toMatch(/Słupsk/i);
  });

  it("should render trust indicators", () => {
    render(<HeroSection data={data} />);
    // Use getAllByText for duplicate text in hero and paragraphs
    expect(screen.getAllByText(/Gwarancja 30 dni/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Dojazd w 24h/i)).toBeInTheDocument();
  });

  it("should render call CTA button", () => {
    render(<HeroSection data={data} />);
    const callButton = screen.getByRole("link", { name: /Zadzwoń/i });
    expect(callButton).toHaveAttribute("href", expect.stringContaining("tel:"));
  });

  it("should render contact form CTA button", () => {
    render(<HeroSection data={data} />);
    const contactButton = screen.getByRole("link", { name: /Wyślij zapytanie/i });
    expect(contactButton).toHaveAttribute("href", "/kontakt");
  });

  it("should have hero section with heading id", () => {
    render(<HeroSection data={data} />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveAttribute("id", "hero-heading");
  });
});
