import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FinalCTASection from "../FinalCTASection";
import { homeSection } from "@/test/fixtures/page-sections";
import type { CtaBlock } from "../blocks/blocks";

const data = homeSection<CtaBlock>("cta");

describe("FinalCTASection", () => {
  it("should render main heading", () => {
    render(<FinalCTASection data={data} />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("should contain call to action text", () => {
    render(<FinalCTASection data={data} />);
    expect(screen.getByText(/Gotowy na montaż bez stresu/i)).toBeInTheDocument();
  });

  it("should render phone CTA button", () => {
    render(<FinalCTASection data={data} />);
    const phoneLink = screen.getByRole("link", { name: /Zadzwoń/i });
    expect(phoneLink).toHaveAttribute("href", expect.stringContaining("tel:"));
  });

  it("should render contact form link", () => {
    render(<FinalCTASection data={data} />);
    const contactLink = screen.getByRole("link", { name: /Formularz kontaktowy/i });
    expect(contactLink).toHaveAttribute("href", "/kontakt");
  });

  it("should render trust signals", () => {
    render(<FinalCTASection data={data} />);
    expect(screen.getByText(/Gwarancja 30 dni/i)).toBeInTheDocument();
    expect(screen.getByText(/Ubezpieczenie OC/i)).toBeInTheDocument();
    expect(screen.getByText(/Bezpłatny dojazd/i)).toBeInTheDocument();
    expect(screen.getByText(/Porządek po montażu/i)).toBeInTheDocument();
  });

  it("should render location info", () => {
    render(<FinalCTASection data={data} />);
    expect(screen.getByText(/Słupsk i okolice/i)).toBeInTheDocument();
  });
});
