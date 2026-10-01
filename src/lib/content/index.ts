// ============================================
// CONTENT - Content processing and formatting
// ============================================

// Formatters
export { formatDate } from "./formatters/dates";
export { limitTags } from "./formatters/tags";

// Processors
export { processBlogContent, extractPlainText } from "./processors/html";

// Backward compatibility
export { formatDate as formatBlogDate } from "./formatters/dates";
export { limitTags as limitBlogTags } from "./formatters/tags";
export {
  processBlogContent as addHeadingIds,
  extractPlainText as stripHtml,
} from "./processors/html";
