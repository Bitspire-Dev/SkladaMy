import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionBadge } from "../SectionBadge";

describe("SectionBadge", () => {
  it("should render children", () => {
    render(<SectionBadge>Kategoria</SectionBadge>);
    expect(screen.getByText("Kategoria")).toBeInTheDocument();
  });

  it("should apply correct classes for default variant", () => {
    render(<SectionBadge>Default</SectionBadge>);
    const element = screen.getByText("Default");
    expect(element).toHaveClass("bg-secondary");
    expect(element).toHaveClass("text-secondary-foreground");
  });

  it("should support outline variant", () => {
    render(<SectionBadge variant="outline">Outline</SectionBadge>);
    const element = screen.getByText("Outline");
    expect(element).toHaveClass("border-border");
    expect(element).toHaveClass("text-muted-foreground");
  });

  it("should support accent variant", () => {
    render(<SectionBadge variant="accent">Accent</SectionBadge>);
    const element = screen.getByText("Accent");
    expect(element).toHaveClass("bg-primary/10");
    expect(element).toHaveClass("text-primary-foreground");
  });

  it("should merge custom className", () => {
    render(<SectionBadge className="custom-test">Custom</SectionBadge>);
    const element = screen.getByText("Custom");
    expect(element).toHaveClass("custom-test");
  });
});
