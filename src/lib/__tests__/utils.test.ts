import { describe, it, expect } from "vitest";
import { cn } from "../styles";

describe("utils cn re-export", () => {
  it("should merge classes successfully via re-exported cn function", () => {
    const result = cn("class1", "class2", { class3: true, class4: false });
    expect(result).toBe("class1 class2 class3");
  });

  it("should deduplicate Tailwind classes via re-exported cn function", () => {
    const result = cn("px-2 py-2", "px-4");
    expect(result).toBe("py-2 px-4");
  });
});
