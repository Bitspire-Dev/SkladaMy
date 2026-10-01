import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TestimonialsSection from "../TestimonialsSection";
import { homeSection } from "@/test/fixtures/page-sections";
import type { TestimonialsBlock } from "../blocks/blocks";

const data = homeSection<TestimonialsBlock>("testimonials");

describe("TestimonialsSection", () => {
  it("should render section heading", () => {
    render(<TestimonialsSection data={data} />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("should render testimonial cards", () => {
    render(<TestimonialsSection data={data} />);
    // Check for testimonial content from data
    expect(screen.getByText(/Co mówią nasi klienci/i)).toBeInTheDocument();
  });

  it("should render star ratings", () => {
    const { container } = render(<TestimonialsSection data={data} />);
    // Look for star SVG elements
    const stars = container.querySelectorAll("svg");
    expect(stars.length).toBeGreaterThan(0);
  });

  it("should have verified badges on some testimonials", () => {
    render(<TestimonialsSection data={data} />);
    const verifiedBadges = screen.getAllByText(/Zweryfikowana opinia/i);
    expect(verifiedBadges.length).toBeGreaterThanOrEqual(1);
  });
});
