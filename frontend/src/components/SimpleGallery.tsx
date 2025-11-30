'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGallery } from '@/hooks/useGallery';
import { getMediaURL } from '@/lib/axios-client';
import { MasonryGrid } from './portfolio/MasonryGrid';
import { Lightbox } from './portfolio/Lightbox';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import type { StrapiImage } from '@/types/strapi';

interface SimpleGalleryProps {
  className?: string;
  featuredOnly?: boolean;
  limit?: number;
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  item: {
    id: number;
    title: string;
    featured: boolean;
    images: StrapiImage[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export function SimpleGallery({
  className = '',
  featuredOnly = false,
  limit
}: SimpleGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);

  // Fetch gallery data
  const { 
    data: galleryData, 
    isLoading, 
    error 
  } = useGallery();

  // Process gallery items
  const galleryItems = useMemo(() => {
    if (!galleryData?.data) return [];

    const gallery = galleryData.data;
    let images: StrapiImage[] = [];

    if (featuredOnly && gallery.featuredImages) {
      images = gallery.featuredImages;
    } else if (gallery.images) {
      images = gallery.images;
    }

    // Apply limit if specified
    if (limit && images.length > limit) {
      images = images.slice(0, limit);
    }

    return images.map((image) => ({
      id: image.id.toString(),
      src: getMediaURL({ url: image.url }),
      alt: image.alternativeText || `Zdjęcie ${image.id}`,
      title: image.caption || `Zdjęcie ${image.id}`,
      item: {
        id: image.id,
        title: `Zdjęcie ${image.id}`,
        featured: false,
        images: [image],
        createdAt: '',
        updatedAt: '',
        publishedAt: ''
      }
    }));
  }, [galleryData, featuredOnly, limit]);

  // Handle image click
  const handleImageClick = (index: number) => {
    setLightboxImages(galleryItems);
    setLightboxIndex(index);
  };

  // Handle lightbox close
  const handleLightboxClose = () => {
    setLightboxIndex(null);
    setLightboxImages([]);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <ErrorMessage 
        message="Błąd ładowania galerii. Spróbuj ponownie później." 
        className="my-8"
      />
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Gallery Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key="gallery"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <MasonryGrid
            images={galleryItems}
            onImageClick={handleImageClick}
          />
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {galleryItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-500 text-lg">
            Brak zdjęć do wyświetlenia
          </div>
        </motion.div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && lightboxImages.length > 0 && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={handleLightboxClose}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
