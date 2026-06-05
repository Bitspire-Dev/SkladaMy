import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { IconBox } from "../IconBox";
import { Check } from "lucide-react";

describe("IconBox", () => {
  it("should render the icon", () => {
    const { container } = render(<IconBox icon={Check} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should render default variant classes", () => {
    const { container } = render(<IconBox icon={Check} />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("w-10 h-10 bg-primary/10");
  });

  it("should support large variant", () => {
    const { container } = render(<IconBox icon={Check} variant="large" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("w-14 h-14 bg-primary/10");
  });

  it("should support outline variant", () => {
    const { container } = render(<IconBox icon={Check} variant="outline" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("w-12 h-12 border border-border");
  });

  it("should merge custom classNames", () => {
    const { container } = render(
      <IconBox icon={Check} className="custom-box" iconClassName="custom-icon" />
    );
    const wrapper = container.firstChild;
    const svg = container.querySelector("svg");
    expect(wrapper).toHaveClass("custom-box");
    expect(svg).toHaveClass("custom-icon");
  });
});
