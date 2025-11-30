import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getGallery, updateGallery } from '@/lib/strapi-client';
import type { Gallery } from '@/types/strapi';

// Query keys
export const galleryKeys = {
  all: ['gallery'] as const,
  main: () => [...galleryKeys.all, 'main'] as const,
};

// Gallery Hook
export function useGallery() {
  return useQuery({
    queryKey: galleryKeys.main(),
    queryFn: () => getGallery(),
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
}

// Gallery Update Mutation
export function useUpdateGallery() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Gallery>) => updateGallery(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: galleryKeys.all });
    },
  });
}
