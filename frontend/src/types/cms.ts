// =============================================================================
// CMS TYPES (TinaCMS)
// Centralized type definitions for the TinaCMS content layer.
// Content lives in `content/` as Markdown/JSON files managed by TinaCMS.
// =============================================================================

// =============================================================================
// MEDIA
// =============================================================================

/**
 * Image stored by TinaCMS. `src` is a path inside `public/` (e.g.
 * `/uploads/photo.avif`) or an absolute external URL.
 */
export interface CmsImage {
  src: string;
  alt?: string;
  caption?: string;
}

// =============================================================================
// RESPONSE WRAPPERS
// Kept for API compatibility with the previous CMS layer.
// =============================================================================

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/** Collection response (array of items) */
export interface CollectionResponse<T> {
  data: T[];
  meta: {
    pagination: PaginationMeta;
  };
}

/** Single item response */
export interface SingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

// =============================================================================
// BLOG SYSTEM TYPES
// =============================================================================

/** Blog post category (`content/categories/*.md`) */
export interface Category {
  /** Stable identifier — same as slug */
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon?: string;
  order?: number;
  seo?: SEO;
}

/** Blog post tag (`content/tags/*.md`) */
export interface Tag {
  /** Stable identifier — same as slug */
  id: string;
  name: string;
  slug: string;
  color?: string;
  description?: string;
}

/** Blog post author (object embedded in post frontmatter) */
export interface Author {
  name: string;
  role?: string;
  bio?: string;
  email?: string;
  avatar?: CmsImage;
  website?: string;
  linkedin?: string;
  twitter?: string;
}

/** FAQ item for structured data */
export interface FAQItem {
  question: string;
  answer: string;
}

/** Blog post (`content/posts/*.md`) */
export interface BlogPost {
  /** Stable identifier — same as slug */
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  /** Article body rendered to sanitized HTML from Markdown */
  content: string;
  featured: boolean;
  publishDate: string;
  lastModified?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  featuredImage?: CmsImage;
  author: Author;
  category?: Category;
  tags?: Tag[];
  relatedPosts?: BlogPost[];
  readTime?: number;
  views?: number;
  gallery?: CmsImage[];
  seo?: SEO;
  breadcrumbs?: Record<string, unknown>;
  faq?: FAQItem[];
}

/** Simplified blog tag (for filtering UI) */
export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

// =============================================================================
// SEO
// =============================================================================

/** SEO metadata for pages and posts */
export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  /** Image path (e.g. `/uploads/og.png`) or full URL */
  ogImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
  twitterCard?: "summary" | "summary_large_image";
  structuredData?: Record<string, unknown>;
  lastmod?: string;
}

// =============================================================================
// GALLERY
// =============================================================================

/** Photo gallery singleton (`content/gallery/gallery.json`) */
export interface Gallery {
  images: CmsImage[];
  featuredImages: CmsImage[];
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/** Category filter option (for blog sidebar/filtering) */
export interface BlogCategoryFilter {
  value: string;
  label: string;
  count: number;
  color: string;
}

/** Filter parameters for blog posts */
export interface BlogFilters {
  search?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  page?: number;
  pageSize?: number;
  /** Alias for pageSize kept for backward compatibility */
  limit?: number;
}
