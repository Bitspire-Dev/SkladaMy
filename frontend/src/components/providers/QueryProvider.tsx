'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Stale time - how long data is considered fresh
            staleTime: 1000 * 60 * 5, // 5 minutes
            
            // Cache time - how long unused data stays in cache
            gcTime: 1000 * 60 * 30, // 30 minutes
            
            // Retry configuration
            retry: (failureCount, error: unknown) => {
              // Don't retry on 4xx errors (client errors)
              if (typeof error === 'object' && error !== null && 'response' in error) {
                const httpError = error as { response?: { status?: number } };
                if (httpError.response?.status && httpError.response.status >= 400 && httpError.response.status < 500) {
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
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
