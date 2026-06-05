import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import WhyUsSection from "../WhyUsSection";

describe("WhyUsSection", () => {
  it("should render section heading", () => {
    render(<WhyUsSection />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("should render all benefit cards", () => {
    render(<WhyUsSection />);
    expect(screen.getByText("Szybkie terminy realizacji")).toBeInTheDocument();
    expect(screen.getByText("30 dni gwarancji")).toBeInTheDocument();
    expect(screen.getByText("Porządek po montażu")).toBeInTheDocument();
    expect(screen.getByText("Doświadczenie z IKEA/PAX")).toBeInTheDocument();
  });

  it("should render benefit descriptions", () => {
    render(<WhyUsSection />);
    expect(screen.getByText(/Większość montaży wykonujemy w ciągu 1-3 dni/i)).toBeInTheDocument();
    expect(screen.getByText(/gwarancją. Jeśli coś się rozłączy/i)).toBeInTheDocument();
  });
});
