import { QueryClient } from '@tanstack/react-query';

// Create QueryClient with optimized defaults
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time - how long data is considered fresh
      staleTime: 1000 * 60 * 5, // 5 minutes
      
      // Cache time - how long unused data stays in cache
      gcTime: 1000 * 60 * 30, // 30 minutes (was cacheTime)
      
      // Retry configuration
      retry: (failureCount, error: unknown) => {
        // Don't retry on 4xx errors (client errors)
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as { response?: { status?: number } };
          if (axiosError.response?.status && axiosError.response.status >= 400 && axiosError.response.status < 500) {
            return false;
          }
        }
        
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      
      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Don't refetch on window focus by default
      refetchOnWindowFocus: false,
      
      // Don't refetch on reconnect by default
      refetchOnReconnect: 'always',
      
      // Refetch on mount if data is stale
      refetchOnMount: true,
    },
    mutations: {
      // Retry mutations once
      retry: 1,
      
      // Retry delay for mutations
      retryDelay: 1000,
    },
  },
});

// Query keys factory for consistent key management
export const queryKeys = {
  // Blog queries
  blog: {
    all: ['blog'] as const,
    posts: (params?: Record<string, unknown>) => [...queryKeys.blog.all, 'posts', params] as const,
    post: (slug: string) => [...queryKeys.blog.all, 'post', slug] as const,
  },
  
  // Gallery queries
  gallery: {
    all: ['gallery'] as const,
    data: () => [...queryKeys.gallery.all, 'data'] as const,
  },
} as const;

// Error boundary for React Query
export const queryErrorHandler = (error: unknown) => {
  console.error('React Query Error:', error);
  
  // You can integrate with error reporting service here
  // Example: Sentry.captureException(error);
};

// Prefetch helpers
export const prefetchBlogPosts = async (params?: Record<string, unknown>) => {
  const { getBlogPosts } = await import('./strapi-client');
  
  await queryClient.prefetchQuery({
    queryKey: queryKeys.blog.posts(params),
    queryFn: () => getBlogPosts(params),
    staleTime: 1000 * 60 * 10, // 10 minutes for prefetched data
  });
};

export const prefetchGallery = async () => {
  const { getGallery } = await import('./strapi-client');
  
  await queryClient.prefetchQuery({
    queryKey: queryKeys.gallery.all,
    queryFn: () => getGallery(),
    staleTime: 1000 * 60 * 15, // 15 minutes for gallery
  });
};

// Cache invalidation helpers
export const invalidateQueries = {
  blog: () => queryClient.invalidateQueries({ queryKey: queryKeys.blog.all }),
  gallery: () => queryClient.invalidateQueries({ queryKey: queryKeys.gallery.all }),
  all: () => queryClient.invalidateQueries(),
};

// Background refetch helpers
export const refetchQueries = {
  blog: () => queryClient.refetchQueries({ queryKey: queryKeys.blog.all }),
  gallery: () => queryClient.refetchQueries({ queryKey: queryKeys.gallery.all }),
};

export default queryClient;
