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
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  featuredImage?: StrapiImage;
  author?: string;
  category?: string;
  tags?: BlogTag[];
  readTime?: number;
  views?: number;
  seo?: SEO;
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
  metaRobots?: string;
  structuredData?: Record<string, unknown>;
  metaViewport?: string;
  canonicalURL?: string;
  metaImage?: StrapiImage;
  metaSocial?: MetaSocial[];
}

export interface MetaSocial {
  socialNetwork: 'Facebook' | 'Twitter';
  title: string;
  description: string;
  image?: StrapiImage;
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
