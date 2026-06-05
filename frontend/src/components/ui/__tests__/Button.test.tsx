import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button";

describe("Button", () => {
  it("should render with children text", () => {
    render(<Button>Kliknij mnie</Button>);
    expect(screen.getByText("Kliknij mnie")).toBeInTheDocument();
  });

  it("should render as button element by default", () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should not have explicit type attribute by default (browser default is submit)", () => {
    render(<Button>Test</Button>);
    // HTML button without type attribute defaults to "submit" behavior
    // but the attribute itself is not set in DOM
    expect(screen.getByRole("button")).not.toHaveAttribute("type");
  });

  it("should accept custom type", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button disabled>Nieaktywny</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should accept additional className", () => {
    render(<Button className="custom-class">Test</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("should handle onClick", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Kliknij</Button>);

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
