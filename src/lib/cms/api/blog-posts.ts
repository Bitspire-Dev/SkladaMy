import "server-only";

import type { BlogPost, CollectionResponse, SingleResponse, BlogFilters } from "@/types/cms";
import { extractPlainText } from "@/lib/content/processors/html";
import { loadPostBySlug, loadPosts } from "../reader";

const emptyCollection = <T>(): CollectionResponse<T> => ({
  data: [],
  meta: {
    pagination: {
      page: 1,
      pageSize: 0,
      pageCount: 0,
      total: 0,
    },
  },
});

const matchesFilters = (post: BlogPost, filters?: BlogFilters): boolean => {
  if (!filters) return true;

  if (filters.search) {
    const q = filters.search.toLowerCase();
    const haystack = [post.title, post.excerpt, extractPlainText(post.content)];
    if (!haystack.some((f) => f?.toLowerCase().includes(q))) return false;
  }

  if (filters.category && post.category?.slug !== filters.category) return false;

  if (filters.tags && filters.tags.length > 0) {
    const postTagSlugs = new Set((post.tags ?? []).map((t) => t.slug));
    if (!filters.tags.some((slug) => postTagSlugs.has(slug))) return false;
  }

  if (filters.featured !== undefined && post.featured !== filters.featured) return false;

  return true;
};

/**
 * Fetch all blog posts with optional filtering
 */
export const getBlogPosts = async (
  filters?: BlogFilters
): Promise<CollectionResponse<BlogPost>> => {
  try {
    const filtered = loadPosts().filter((post) => matchesFilters(post, filters));

    const pageSize = filters?.limit ?? filters?.pageSize;
    const page = filters?.page ?? 1;
    const total = filtered.length;
    const pageCount = pageSize ? Math.ceil(total / pageSize) : 1;
    const data = pageSize ? filtered.slice((page - 1) * pageSize, page * pageSize) : filtered;

    return {
      data,
      meta: {
        pagination: {
          page,
          pageSize: pageSize ?? total,
          pageCount,
          total,
        },
      },
    };
  } catch {
    return emptyCollection();
  }
};

/**
 * Fetch a single blog post by slug
 */
export const getBlogPost = async (slug: string): Promise<SingleResponse<BlogPost>> => {
  const post = loadPostBySlug(slug);
  if (!post) {
    throw new Error(`Blog post with slug "${slug}" not found`);
  }
  return { data: post, meta: {} };
};

/**
 * Fetch featured blog posts (posts with featured=true flag, most recent first).
 */
export const getFeaturedBlogPosts = async (
  limit: number = 3
): Promise<CollectionResponse<BlogPost>> => {
  return getBlogPosts({ pageSize: limit, featured: true });
};
