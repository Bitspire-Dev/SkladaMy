import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ServicesSection from "../ServicesSection";

describe("ServicesSection", () => {
  it("should render section heading", () => {
    render(<ServicesSection />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("should render service cards", () => {
    render(<ServicesSection />);
    expect(screen.getByText("Montaż mebli IKEA")).toBeInTheDocument();
    expect(screen.getByText("Wieszanie szafek kuchennych")).toBeInTheDocument();
    expect(screen.getByText("Kotwienie w każdej ścianie")).toBeInTheDocument();
  });

  it("should render service details", () => {
    render(<ServicesSection />);
    expect(screen.getByText(/Szafy PAX i garderoby/i)).toBeInTheDocument();
    expect(screen.getByText(/Szafki kuchenne KNOXHULT/i)).toBeInTheDocument();
    expect(screen.getByText(/Ściany z płyt gipsowo-kartonowych/i)).toBeInTheDocument();
  });

  it("should have services section id", () => {
    render(<ServicesSection />);
    const section = document.querySelector("section");
    expect(section).toHaveAttribute("id", "uslugi");
  });
});
