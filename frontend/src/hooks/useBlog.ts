import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query';
import {
  getBlogPosts,
  getBlogPost,
  getFeaturedBlogPosts,
} from '@/lib/strapi-client';
import type { 
  BlogPost
} from '@/types/strapi';

// Blog Posts List Hook
export function useBlogPosts(params?: {
  featured?: boolean;
  limit?: number;
  sort?: string;
}) {
  return useQuery({
    queryKey: queryKeys.blog.posts(params),
    queryFn: () => getBlogPosts(params),
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
}

// Single Blog Post Hook
export function useBlogPost(slug: string, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.blog.post(slug),
    queryFn: () => getBlogPost(slug),
    enabled: enabled && !!slug,
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
}

// Featured Blog Posts Hook
export function useFeaturedBlogPosts(limit: number = 3) {
  return useQuery({
    queryKey: queryKeys.blog.posts({ featured: true, limit }),
    queryFn: () => getFeaturedBlogPosts(limit),
    staleTime: 1000 * 60 * 20, // 20 minutes for featured content
    gcTime: 1000 * 60 * 60, // 1 hour
  });
}

// Related Blog Posts Hook - Simplified version
export function useRelatedBlogPosts(currentSlug: string, limit: number = 3) {
  return useQuery({
    queryKey: [...queryKeys.blog.all, 'related', currentSlug],
    queryFn: async () => {
      const posts = await getBlogPosts({
        limit: limit + 5, // Get extra to filter out current post
      });
      
      // Filter out current post and limit results
      const relatedPosts = posts.data
        .filter((post: BlogPost) => post.slug !== currentSlug)
        .slice(0, limit);
      
      return {
        ...posts,
        data: relatedPosts
      };
    },
    enabled: !!currentSlug,
    staleTime: 1000 * 60 * 20, // 20 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
}
