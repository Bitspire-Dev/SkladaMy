/**
 * Process blog content from the CMS:
 *  1. Sanitize HTML with DOMPurify (server-safe via isomorphic-dompurify) to
 *     prevent stored XSS from Strapi rich-text. Scripts, on* handlers, iframes
 *     and other dangerous markup are stripped.
 *  2. Add stable IDs to h2/h3 headings so the Table of Contents can link to
 *     them. Existing IDs are preserved.
 */
import DOMPurify from "isomorphic-dompurify";

// Restrictive allow-list for blog content. No scripts, no event handlers,
// no iframes, no inline styles (Strapi rich-text doesn't need them).
const SANITIZE_CONFIG = {
  ALLOWED_TAGS: [
    "p",
    "br",
    "hr",
    "strong",
    "em",
    "u",
    "s",
    "sub",
    "sup",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "a",
    "img",
    "figure",
    "figcaption",
    "blockquote",
    "pre",
    "code",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "div",
    "span",
  ],
  ALLOWED_ATTR: [
    "href",
    "src",
    "alt",
    "title",
    "id",
    "class",
    "target",
    "rel",
    "width",
    "height",
    "colspan",
    "rowspan",
  ],
  ALLOW_DATA_ATTR: false,
  FORBID_TAGS: [
    "script",
    "style",
    "iframe",
    "object",
    "embed",
    "form",
    "input",
    "button",
    "meta",
    "link",
  ],
  FORBID_ATTR: ["onerror", "onload", "onclick", "style", "srcset"],
};

export function processBlogContent(content: string): string {
  if (!content) return "";
  // Sanitize first, then add heading IDs to the cleaned HTML.
  const sanitized = DOMPurify.sanitize(content, SANITIZE_CONFIG);
  let counter = 0;
  // Only add IDs to h2-h6 (not h1 — the article title is not a TOC entry).
  return sanitized.replace(/<(h[2-6])([^>]*)>/gi, (match, tag, attrs) => {
    // Preserve existing IDs (e.g. set by the CMS) so TOC links match.
    if (/\sid\s*=\s*["'][^"']*["']/i.test(attrs)) {
      return match;
    }
    const id = `heading-${counter++}`;
    return `<${tag}${attrs} id="${id}">`;
  });
}

/**
 * Extract plain text from HTML content
 * Server-safe version using regex
 */
export function extractPlainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
