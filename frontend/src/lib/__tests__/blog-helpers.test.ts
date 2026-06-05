import { describe, it, expect } from "vitest";
import { formatDate, limitTags, processBlogContent, extractPlainText } from "../content";
import type { BlogTag } from "@/types/strapi";

describe("formatDate", () => {
  it("should format valid date string to Polish format", () => {
    const result = formatDate("2024-01-15T10:00:00.000Z");
    expect(result).toBe("15 stycznia 2024");
  });

  it("should return 'Brak daty' for undefined date", () => {
    const result = formatDate(undefined);
    expect(result).toBe("Brak daty");
  });

  it("should return 'Brak daty' for empty string", () => {
    const result = formatDate("");
    expect(result).toBe("Brak daty");
  });

  it("should handle different date formats", () => {
    const result = formatDate("2023-12-25");
    expect(result).toBe("25 grudnia 2023");
  });
});

describe("limitTags", () => {
  const mockTags: BlogTag[] = [
    { id: 1, name: "React", slug: "react" },
    { id: 2, name: "TypeScript", slug: "typescript" },
    { id: 3, name: "Next.js", slug: "nextjs" },
    { id: 4, name: "Node.js", slug: "nodejs" },
  ];

  it("should return all tags when no limit specified", () => {
    const result = limitTags(mockTags);
    expect(result).toHaveLength(4);
    expect(result).toEqual(mockTags);
  });

  it("should limit tags to specified number", () => {
    const result = limitTags(mockTags, 2);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("React");
    expect(result[1].name).toBe("TypeScript");
  });

  it("should return empty array for undefined tags", () => {
    const result = limitTags(undefined, 2);
    expect(result).toEqual([]);
  });

  it("should return empty array for non-array input", () => {
    const result = limitTags("not an array" as unknown as BlogTag[], 2);
    expect(result).toEqual([]);
  });

  it("should handle limit larger than array", () => {
    const result = limitTags(mockTags, 10);
    expect(result).toHaveLength(4);
  });

  it("should handle empty array", () => {
    const result = limitTags([], 3);
    expect(result).toEqual([]);
  });
});

describe("processBlogContent", () => {
  it("should add ids to h2 headings", () => {
    const content = "<h2>Introduction</h2>";
    const result = processBlogContent(content);
    expect(result).toBe('<h2 id="heading-0">Introduction</h2>');
  });

  it("should add ids to h3 headings", () => {
    const content = "<h3>Subsection</h3>";
    const result = processBlogContent(content);
    expect(result).toBe('<h3 id="heading-0">Subsection</h3>');
  });

  it("should not modify h1 headings", () => {
    const content = "<h1>Title</h1>";
    const result = processBlogContent(content);
    expect(result).toBe("<h1>Title</h1>");
  });

  it("should preserve existing ids", () => {
    const content = '<h2 id="existing">Heading</h2>';
    const result = processBlogContent(content);
    expect(result).toBe('<h2 id="existing">Heading</h2>');
  });

  it("should handle multiple headings with incremental ids", () => {
    const content = "<h2>First</h2><p>Text</p><h2>Second</h2><h3>Third</h3>";
    const result = processBlogContent(content);
    expect(result).toContain('id="heading-0"');
    expect(result).toContain('id="heading-1"');
    expect(result).toContain('id="heading-2"');
  });

  it("should preserve other attributes", () => {
    const content = '<h2 class="custom-class">Styled Heading</h2>';
    const result = processBlogContent(content);
    expect(result).toBe('<h2 class="custom-class" id="heading-0">Styled Heading</h2>');
  });

  it("should handle case-insensitive tags", () => {
    const content = "<H2>Uppercase</H2><h2>Lowercase</h2>";
    const result = processBlogContent(content);
    expect(result).toContain('id="heading-0"');
    expect(result).toContain('id="heading-1"');
  });

  it("should handle empty content", () => {
    const result = processBlogContent("");
    expect(result).toBe("");
  });
});

describe("extractPlainText", () => {
  it("should remove HTML tags", () => {
    const html = "<p>Hello <strong>world</strong></p>";
    const result = extractPlainText(html);
    expect(result).toBe("Hello world");
  });

  it("should normalize whitespace within tags", () => {
    const html = "<p>Hello   world</p><p>Second   paragraph</p>";
    const result = extractPlainText(html);
    // Note: extractPlainText doesn't add spaces between tags, only normalizes within
    expect(result).toBe("Hello worldSecond paragraph");
  });

  it("should trim leading and trailing whitespace", () => {
    const html = "   <p>Content</p>   ";
    const result = extractPlainText(html);
    expect(result).toBe("Content");
  });

  it("should handle empty string", () => {
    const result = extractPlainText("");
    expect(result).toBe("");
  });

  it("should handle complex HTML", () => {
    const html = `
      <article>
        <h1>Title</h1>
        <p>First paragraph with <a href="link">link</a>.</p>
        <p>Second paragraph.</p>
      </article>
    `;
    const result = extractPlainText(html);
    expect(result).toBe("Title First paragraph with link. Second paragraph.");
  });

  it("should handle HTML without any tags", () => {
    const text = "Plain text without HTML";
    const result = extractPlainText(text);
    expect(result).toBe("Plain text without HTML");
  });
});
