// ============================================
// CMS - Content Management System Integration
// ============================================
// TinaCMS (git-based) integration with typed API methods.
// Content lives in `content/` as Markdown/JSON files.

// API Methods
export {
  getBlogPosts,
  getBlogPost,
  getFeaturedBlogPosts,
  getCategories,
  getTags,
  getGallery,
  searchContent,
} from "./api";

// Re-export types for convenience
export type {
  BlogPost,
  Category,
  Tag,
  Gallery,
  CollectionResponse,
  SingleResponse,
  BlogFilters,
  CmsImage,
} from "@/types/cms";

// Backward compatibility aliases
export {
  getBlogPosts as getAllBlogPosts,
  getBlogPost as getSingleBlogPost,
  getCategories as getAllCategories,
  getTags as getAllTags,
  getGallery as getGalleryData,
} from "./api";
