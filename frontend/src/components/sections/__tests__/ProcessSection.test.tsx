import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProcessSection from "../ProcessSection";
import { homeSection } from "@/test/fixtures/page-sections";
import type { ProcessBlock } from "../blocks/blocks";

const data = homeSection<ProcessBlock>("process");

describe("ProcessSection", () => {
  it("should render section heading", () => {
    render(<ProcessSection data={data} />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("should render all process steps", () => {
    render(<ProcessSection data={data} />);
    expect(screen.getByText("Kontakt i szczegóły")).toBeInTheDocument();
    expect(screen.getByText("Ustalenie terminu")).toBeInTheDocument();
    expect(screen.getByText("Montaż i odbiór")).toBeInTheDocument();
  });

  it("should render step numbers", () => {
    const { container } = render(<ProcessSection data={data} />);
    // Step numbers are in aria-labels, check for the number badges
    expect(container.textContent).toMatch(/1/);
    expect(container.textContent).toMatch(/2/);
    expect(container.textContent).toMatch(/3/);
  });

  it("should render step details", () => {
    render(<ProcessSection data={data} />);
    expect(screen.getByText(/Opisujesz co chcesz zmontować/i)).toBeInTheDocument();
    expect(screen.getByText(/Ustalamy dokładny dzień/i)).toBeInTheDocument();
    expect(screen.getByText(/Składamy meble według instrukcji/i)).toBeInTheDocument();
  });
});
