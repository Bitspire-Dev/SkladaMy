import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogSearch from "../BlogSearch";
import { createMockCategory } from "@/test/factories/category";

const mockCategories = [
  createMockCategory({
    id: 1,
    documentId: "cat-1",
    name: "Montaż",
    slug: "montaz",
    description: "Porady montażowe",
  }),
  createMockCategory({
    id: 2,
    documentId: "cat-2",
    name: "IKEA",
    slug: "ikea",
    description: "Meble IKEA",
  }),
];

describe("BlogSearch", () => {
  it("should render search input", () => {
    render(
      <BlogSearch categories={mockCategories} onSearch={vi.fn()} onCategoryChange={vi.fn()} />
    );
    expect(screen.getByPlaceholderText(/szukaj/i)).toBeInTheDocument();
  });

  it("should render category buttons", () => {
    render(
      <BlogSearch categories={mockCategories} onSearch={vi.fn()} onCategoryChange={vi.fn()} />
    );
    expect(screen.getByText("Montaż")).toBeInTheDocument();
    expect(screen.getByText("IKEA")).toBeInTheDocument();
  });

  it("should call onSearch when typing", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(
      <BlogSearch categories={mockCategories} onSearch={onSearch} onCategoryChange={vi.fn()} />
    );

    const input = screen.getByPlaceholderText(/szukaj/i);
    await user.type(input, "test query");

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith("test query");
    });
  });

  it("should call onCategoryChange when category clicked", async () => {
    const user = userEvent.setup();
    const onCategoryChange = vi.fn();

    render(
      <BlogSearch
        categories={mockCategories}
        onSearch={vi.fn()}
        onCategoryChange={onCategoryChange}
      />
    );

    const categoryButton = screen.getByText("Montaż");
    await user.click(categoryButton);

    expect(onCategoryChange).toHaveBeenCalledWith("montaz");
  });

  it("should clear category selection when clicked again", async () => {
    const user = userEvent.setup();
    const onCategoryChange = vi.fn();

    render(
      <BlogSearch
        categories={mockCategories}
        onSearch={vi.fn()}
        onCategoryChange={onCategoryChange}
        initialCategory="montaz"
      />
    );

    const categoryButton = screen.getByText("Montaż");
    await user.click(categoryButton);

    expect(onCategoryChange).toHaveBeenCalledWith(null);
  });

  it("should display results count with correct Polish pluralization", () => {
    const { rerender } = render(
      <BlogSearch
        categories={mockCategories}
        onSearch={vi.fn()}
        onCategoryChange={vi.fn()}
        totalResults={0}
      />
    );
    expect(screen.getByText("Nie znaleziono artykułów")).toBeInTheDocument();

    rerender(
      <BlogSearch
        categories={mockCategories}
        onSearch={vi.fn()}
        onCategoryChange={vi.fn()}
        totalResults={1}
      />
    );
    expect(screen.getByText("1 artykuł")).toBeInTheDocument();

    rerender(
      <BlogSearch
        categories={mockCategories}
        onSearch={vi.fn()}
        onCategoryChange={vi.fn()}
        totalResults={3}
      />
    );
    expect(screen.getByText("3 artykuły")).toBeInTheDocument();

    rerender(
      <BlogSearch
        categories={mockCategories}
        onSearch={vi.fn()}
        onCategoryChange={vi.fn()}
        totalResults={6}
      />
    );
    expect(screen.getByText("6 artykułów")).toBeInTheDocument();
  });

  it("should display active filter badges and allow clearing all filters", async () => {
    const user = userEvent.setup();
    const onCategoryChange = vi.fn();
    const onSearch = vi.fn();

    render(
      <BlogSearch
        categories={mockCategories}
        onSearch={onSearch}
        onCategoryChange={onCategoryChange}
        initialSearch="IKEA meble"
        initialCategory="ikea"
        totalResults={5}
      />
    );

    expect(screen.getByText(/Szukaj: "IKEA meble"/)).toBeInTheDocument();
    expect(screen.getAllByText("IKEA").length).toBe(2);

    const clearFiltersButton = screen.getByRole("button", { name: /Wyczyść filtry/i });
    await user.click(clearFiltersButton);

    expect(onCategoryChange).toHaveBeenCalledWith(null);
    expect(screen.getByPlaceholderText(/szukaj/i)).toHaveValue("");
  });

  it("should clear search query when X button clicked", async () => {
    const user = userEvent.setup();

    render(
      <BlogSearch
        categories={mockCategories}
        onSearch={vi.fn()}
        onCategoryChange={vi.fn()}
        initialSearch="test"
      />
    );

    const clearButton = screen.getByRole("button", { name: /Wyczyść wyszukiwanie/i });
    await user.click(clearButton);

    expect(screen.getByPlaceholderText(/szukaj/i)).toHaveValue("");
  });
});
