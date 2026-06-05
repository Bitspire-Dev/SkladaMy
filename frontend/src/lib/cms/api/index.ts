// ============================================
// CMS API - Public exports
// ============================================

export { getBlogPosts, getBlogPost, getFeaturedBlogPosts } from "./blog-posts";
export { getCategories } from "./categories";
export { getTags } from "./tags";
export { getGallery } from "./gallery";
export { searchContent } from "./search";

// Backward compatibility
export { getBlogPosts as getAllBlogPosts, getBlogPost as getSingleBlogPost } from "./blog-posts";
