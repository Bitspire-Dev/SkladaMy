import { describe, it, expect } from "vitest";
import { cn } from "../styles";

describe("cn (classnames)", () => {
  it("should merge simple classes", () => {
    const result = cn("class1", "class2");
    expect(result).toBe("class1 class2");
  });

  it("should handle conditional classes with clsx", () => {
    const result = cn("base", true && "conditional", false && "never");
    expect(result).toBe("base conditional");
  });

  it("should deduplicate Tailwind classes with twMerge", () => {
    const result = cn("px-2", "px-4");
    // twMerge keeps the last conflicting class
    expect(result).toBe("px-4");
  });

  it("should handle complex Tailwind merging", () => {
    const result = cn("bg-red-500 hover:bg-red-600", "bg-blue-500");
    // bg-blue-500 should override bg-red-500, but hover classes should merge
    expect(result).toContain("bg-blue-500");
    expect(result).toContain("hover:bg-red-600");
    expect(result).not.toContain("bg-red-500");
  });

  it("should filter out falsy values", () => {
    const result = cn("base", null, undefined, false, "", "valid");
    expect(result).toBe("base valid");
  });

  it("should handle arrays and nested cn calls", () => {
    const result = cn(["class1", "class2"], { class3: true, class4: false });
    expect(result).toBe("class1 class2 class3");
  });

  it("should return empty string for no arguments", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("should handle object syntax", () => {
    const result = cn({
      "bg-red-500": true,
      "text-white": true,
      hidden: false,
    });
    expect(result).toBe("bg-red-500 text-white");
  });
});
