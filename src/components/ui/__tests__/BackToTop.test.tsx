import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BackToTop from "../BackToTop";

describe("BackToTop", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should render correctly", () => {
    render(<BackToTop />);
    const link = screen.getByRole("link", { name: /powrót na górę strony/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "#top");
  });

  it("should scroll to the top of the page when clicked", async () => {
    const user = userEvent.setup();
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<BackToTop />);

    const link = screen.getByRole("link", { name: /powrót na górę strony/i });
    await user.click(link);

    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
