import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TestimonialsSection from "../TestimonialsSection";

describe("TestimonialsSection", () => {
  it("should render section heading", () => {
    render(<TestimonialsSection />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("should render testimonial cards", () => {
    render(<TestimonialsSection />);
    // Check for testimonial content from data
    expect(screen.getByText(/Co mówią nasi klienci/i)).toBeInTheDocument();
  });

  it("should render star ratings", () => {
    const { container } = render(<TestimonialsSection />);
    // Look for star SVG elements
    const stars = container.querySelectorAll("svg");
    expect(stars.length).toBeGreaterThan(0);
  });

  it("should have verified badges on some testimonials", () => {
    render(<TestimonialsSection />);
    const verifiedBadges = screen.getAllByText(/Zweryfikowana opinia/i);
    expect(verifiedBadges.length).toBeGreaterThanOrEqual(1);
  });
});
