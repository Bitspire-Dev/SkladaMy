/**
 * Process blog content and add IDs to headings for Table of Contents
 * Server-safe version using regex instead of DOMParser
 */
export function processBlogContent(content: string): string {
  let counter = 0;
  return content.replace(/<(h[23])([^>]*)>/gi, (match, tag, attrs) => {
    const id = `heading-${counter++}`;
    // Check if id already exists
    if (attrs.includes("id=")) {
      return match;
    }
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
