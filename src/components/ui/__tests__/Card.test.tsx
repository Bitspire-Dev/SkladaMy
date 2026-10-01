import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "../Card";

describe("Card Components", () => {
  it("should render Card and apply default class names", () => {
    render(<Card>Card Content</Card>);
    const card = screen.getByText("Card Content");
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("data-slot", "card");
    expect(card).toHaveClass("bg-card");
  });

  it("should render CardHeader and apply classes", () => {
    render(<CardHeader>Card Header Content</CardHeader>);
    const header = screen.getByText("Card Header Content");
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute("data-slot", "card-header");
  });

  it("should render CardTitle", () => {
    render(<CardTitle>Card Title Content</CardTitle>);
    const title = screen.getByText("Card Title Content");
    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute("data-slot", "card-title");
  });

  it("should render CardDescription", () => {
    render(<CardDescription>Card Description Content</CardDescription>);
    const desc = screen.getByText("Card Description Content");
    expect(desc).toBeInTheDocument();
    expect(desc).toHaveAttribute("data-slot", "card-description");
    expect(desc).toHaveClass("text-muted-foreground");
  });

  it("should render CardAction", () => {
    render(<CardAction>Card Action Content</CardAction>);
    const action = screen.getByText("Card Action Content");
    expect(action).toBeInTheDocument();
    expect(action).toHaveAttribute("data-slot", "card-action");
  });

  it("should render CardContent", () => {
    render(<CardContent>Card Content Body</CardContent>);
    const content = screen.getByText("Card Content Body");
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute("data-slot", "card-content");
  });

  it("should render CardFooter", () => {
    render(<CardFooter>Card Footer Content</CardFooter>);
    const footer = screen.getByText("Card Footer Content");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute("data-slot", "card-footer");
  });

  it("should allow merging custom class names", () => {
    render(
      <Card className="custom-card-class">
        <CardHeader className="custom-header-class">Header</CardHeader>
        <CardContent className="custom-content-class">Body</CardContent>
        <CardFooter className="custom-footer-class">Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText("Header").parentElement).toHaveClass("custom-card-class");
    expect(screen.getByText("Header")).toHaveClass("custom-header-class");
    expect(screen.getByText("Body")).toHaveClass("custom-content-class");
    expect(screen.getByText("Footer")).toHaveClass("custom-footer-class");
  });
});
