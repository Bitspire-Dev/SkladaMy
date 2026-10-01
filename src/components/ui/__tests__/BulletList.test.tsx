import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BulletList from "../BulletList";

describe("BulletList", () => {
  const dummyItems = ["Item 1", "Item 2", "Item 3"];

  it("should render list items correctly", () => {
    render(<BulletList items={dummyItems} />);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent("Item 1");
    expect(items[1]).toHaveTextContent("Item 2");
    expect(items[2]).toHaveTextContent("Item 3");
  });

  it("should support a custom root element tag", () => {
    render(<BulletList items={dummyItems} as="ol" />);
    const list = screen.getByRole("list");
    expect(list.tagName.toLowerCase()).toBe("ol");
  });

  it("should apply custom class names", () => {
    render(
      <BulletList
        items={dummyItems}
        className="custom-ul"
        itemClassName="custom-li"
        bulletClassName="custom-bullet"
      />
    );

    const list = screen.getByRole("list");
    expect(list).toHaveClass("custom-ul");

    const itemSpan = screen.getByText("Item 1");
    expect(itemSpan).toHaveClass("custom-li");

    const bulletDiv = itemSpan.previousSibling;
    expect(bulletDiv).toHaveClass("custom-bullet");
  });
});
