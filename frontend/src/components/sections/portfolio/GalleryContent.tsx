"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getMediaURL } from "@/lib/cms/client";
import { MasonryGrid } from "./MasonryGrid";
import { Lightbox } from "./Lightbox";
import type { CmsImage } from "@/types/cms";

interface GalleryContentProps {
  images: CmsImage[];
  featuredImages?: CmsImage[];
  featuredOnly?: boolean;
  limit?: number;
  className?: string;
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

export function GalleryContent({
  images,
  featuredImages,
  featuredOnly = false,
  limit,
  className = "",
}: GalleryContentProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);

  // Process gallery items
  const galleryItems = useMemo(() => {
    let sourceImages: CmsImage[] = [];

    if (featuredOnly && featuredImages) {
      sourceImages = featuredImages;
    } else {
      sourceImages = images;
    }

    // Apply limit if specified
    if (limit && sourceImages.length > limit) {
      sourceImages = sourceImages.slice(0, limit);
    }

    return sourceImages.map((image) => ({
      id: image.src,
      src: getMediaURL(image),
      alt: image.alt || `Realizacja SkładaMy`,
      title: image.caption || image.alt || `Realizacja SkładaMy`,
    }));
  }, [images, featuredImages, featuredOnly, limit]);

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
          <MasonryGrid images={galleryItems} onImageClick={handleImageClick} />
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {galleryItems.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <div className="text-gray-500 text-lg">Brak zdjęć do wyświetlenia</div>
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
