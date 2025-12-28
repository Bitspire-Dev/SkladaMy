// Strapi API Types
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

// Response Types
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

export interface StrapiEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export type CollectionResponse<T> = StrapiResponse<T[]>;
export type SingleResponse<T> = StrapiResponse<T>;

// Blog Types
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

export interface FAQItem {
  id?: number;
  question: string;
  answer: string;
}

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

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

// SEO Component
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
  twitterCard?: 'summary' | 'summary_large_image';
  structuredData?: Record<string, unknown>;
  lastmod?: string;
}

export interface MetaSocial {
  socialNetwork: 'Facebook' | 'Twitter';
  title: string;
  description: string;
  image?: StrapiImage;
}

// Blog Category for filtering
export interface BlogCategoryFilter {
  value: string;
  label: string;
  count: number;
  color: string;
}

// Gallery Types (nowa galeria zamiast portfolio)
export interface Gallery {
  id: number;
  images: StrapiImage[];
  featuredImages: StrapiImage[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface SharedFAQItem {
  question: string;
  answer: string;
}

// Blog types
export interface BlogCategory {
  value: string;
  label: string;
  count: number;
}

export interface BlogStats {
  totalPosts: number;
  totalViews: number;
  totalCategories: number;
  categories: Record<string, number>;
}

export interface BlogFilters {
  search?: string;
  category?: string;
  tags?: string[];
  page?: number;
  pageSize?: number;
  limit?: number;  // Alias for pageSize for backward compatibility
}

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

// API Functions Types
export type ApiResponse<T> = Promise<StrapiResponse<T>>;
export type EntityResponse<T> = Promise<StrapiResponse<StrapiEntity & { attributes: T }>>;
export type CollectionResponsePromise<T> = Promise<StrapiResponse<Array<StrapiEntity & { attributes: T }>>>;
