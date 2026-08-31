// =============================================================================
// STRAPI API TYPES
// Centralized type definitions for Strapi CMS integration
// =============================================================================

// =============================================================================
// BASE TYPES
// Core types used across multiple entities
// =============================================================================

/**
 * Strapi image with multiple formats
 */
export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/**
 * Image format variant (thumbnail, small, medium, large)
 */
export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

// =============================================================================
// RESPONSE TYPES
// Generic wrappers for Strapi API responses
// =============================================================================

/**
 * Generic Strapi response wrapper
 */
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Base entity fields present in all Strapi content types
 */
export interface StrapiEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

/** Collection response (array of items) */
export type CollectionResponse<T> = StrapiResponse<T[]>;

/** Single item response */
export type SingleResponse<T> = StrapiResponse<T>;

// =============================================================================
// BLOG SYSTEM TYPES
// Types for blog posts, categories, tags, and authors
// =============================================================================

/**
 * Blog post category
 */
export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon?: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/**
 * Blog post tag
 */
export interface Tag {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  color: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/**
 * Blog post author
 */
export interface Author {
  name: string;
  role?: string;
  bio?: string;
  email?: string;
  avatar?: StrapiImage;
  website?: string;
  linkedin?: string;
  twitter?: string;
}

/**
 * FAQ item for structured data
 */
export interface FAQItem {
  id?: number;
  question: string;
  answer: string;
}

/**
 * Blog post content type
 */
export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured: boolean;
  publishDate: string;
  lastModified?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  featuredImage?: StrapiImage;
  author: Author;
  category: Category;
  tags?: Tag[];
  relatedPosts?: BlogPost[];
  readTime?: number;
  views?: number;
  gallery?: StrapiImage[];
  seo?: SEO;
  breadcrumbs?: Record<string, unknown>;
  faq?: FAQItem[];
}

/**
 * Simplified blog tag (for filtering UI)
 */
export interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

// =============================================================================
// SEO TYPES
// Search engine optimization metadata
// =============================================================================

/**
 * SEO metadata for pages and posts
 */
export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: StrapiImage;
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
  twitterCard?: "summary" | "summary_large_image";
  structuredData?: Record<string, unknown>;
  lastmod?: string;
}

/**
 * Social media specific metadata
 */
export interface MetaSocial {
  socialNetwork: "Facebook" | "Twitter";
  title: string;
  description: string;
  image?: StrapiImage;
}

/**
 * Category filter option (for blog sidebar/filtering)
 */
export interface BlogCategoryFilter {
  value: string;
  label: string;
  count: number;
  color: string;
}

// =============================================================================
// GALLERY TYPES
// Portfolio and image gallery content
// =============================================================================

/**
 * Photo gallery collection
 */
export interface Gallery {
  id: number;
  images: StrapiImage[];
  featuredImages: StrapiImage[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/**
 * Shared FAQ item (simplified, no ID)
 */
export interface SharedFAQItem {
  question: string;
  answer: string;
}

// =============================================================================
// UTILITY TYPES
// Helper types for API calls and filtering
// =============================================================================

/**
 * Blog category display info
 */
export interface BlogCategory {
  value: string;
  label: string;
  count: number;
}

/**
 * Blog statistics for dashboard
 */
export interface BlogStats {
  totalPosts: number;
  totalViews: number;
  totalCategories: number;
  categories: Record<string, number>;
}

/**
 * Filter parameters for blog posts API
 */
export interface BlogFilters {
  search?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  page?: number;
  pageSize?: number;
  limit?: number; // Alias for pageSize for backward compatibility
}

/**
 * Blog posts API response (convenience wrapper)
 */
export interface BlogPostsResponse {
  data: BlogPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// =============================================================================
// API FUNCTION TYPES
// Type aliases for async API functions
// =============================================================================

/** Generic API response promise */
export type ApiResponse<T> = Promise<StrapiResponse<T>>;
export type EntityResponse<T> = Promise<StrapiResponse<StrapiEntity & { attributes: T }>>;
export type CollectionResponsePromise<T> = Promise<
  StrapiResponse<Array<StrapiEntity & { attributes: T }>>
>;
