/**
 * Markdown → sanitized HTML for CMS page content.
 * Client- and server-safe (isomorphic-dompurify under the hood).
 */
import { marked } from "marked";
import { processBlogContent } from "./html";

export function renderMarkdown(markdown: string): string {
  if (!markdown) return "";
  return processBlogContent(marked.parse(markdown) as string);
}

/** Inline markdown (bold/links/…) for short UI strings like subtexts. */
export function renderInlineMarkdown(markdown: string): string {
  if (!markdown) return "";
  return processBlogContent(marked.parseInline(markdown) as string);
}
