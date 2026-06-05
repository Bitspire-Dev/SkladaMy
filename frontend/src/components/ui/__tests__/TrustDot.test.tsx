import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { TrustDot } from "../TrustDot";

describe("TrustDot", () => {
  it("should render correctly", () => {
    const { container } = render(<TrustDot />);
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toBeInTheDocument();
    expect(outerDiv).toHaveClass("rounded-full bg-[#FFC400]/20 p-3");

    const innerDiv = outerDiv.firstChild as HTMLElement;
    expect(innerDiv).toBeInTheDocument();
    expect(innerDiv).toHaveClass("h-6 w-6 rounded-full bg-[#FFC400]");
  });

  it("should merge custom classNames", () => {
    const { container } = render(<TrustDot className="custom-class" />);
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toHaveClass("custom-class");
  });
});
