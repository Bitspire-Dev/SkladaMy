import "server-only";

import { getBlogPosts } from "./blog-posts";

/**
 * Search content across blog posts
 */
export const searchContent = async (query: string, limit: number = 10) => {
  const blogResults = await getBlogPosts({ search: query, pageSize: limit });
  return {
    blog: blogResults.data || [],
    total: blogResults.data?.length || 0,
  };
};
