// ============================================
// CMS - Content Management System Integration
// ============================================
// Strapi CMS integration with typed API methods

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
  StrapiImage,
} from "@/types/strapi";

// Backward compatibility aliases
export {
  getBlogPosts as getAllBlogPosts,
  getBlogPost as getSingleBlogPost,
  getCategories as getAllCategories,
  getTags as getAllTags,
  getGallery as getGalleryData,
} from "./api";
