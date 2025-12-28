'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { Eye } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

interface MasonryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
  className?: string;
}

export function MasonryGrid({ images, onImageClick, className = '' }: MasonryGridProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  
  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  const handleImageLoad = (imageId: string) => {
    setLoadedImages(prev => new Set([...prev, imageId]));
  };

  return (
    <div className={className}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {images.map((image, index) => (
          <GalleryImageItem
            key={image.id}
            image={image}
            index={index}
            onImageClick={onImageClick}
            onImageLoad={() => handleImageLoad(image.id)}
            isLoaded={loadedImages.has(image.id)}
          />
        ))}
      </Masonry>
    </div>
  );
}

interface GalleryImageItemProps {
  image: GalleryImage;
  index: number;
  onImageClick: (index: number) => void;
  onImageLoad: () => void;
  isLoaded: boolean;
}

function GalleryImageItem({ 
  image, 
  index, 
  onImageClick, 
  onImageLoad, 
  isLoaded 
}: GalleryImageItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection observer for lazy loading animation
  useIntersectionObserver(ref, {
    threshold: 0.1,
    onIntersect: () => setIsVisible(true)
  });

  return (
    <motion.div
      ref={ref}
      className="mb-4 break-inside-avoid cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20 
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => onImageClick(index)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        {/* Image */}
        <div className="relative">
          <Image
            src={image.src}
            alt={image.alt}
            width={400}
            height={300}
            className={`
              w-full h-auto object-cover transition-transform duration-300
              ${isHovered ? 'scale-105' : 'scale-100'}
              ${isLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            onLoad={onImageLoad}
            loading="lazy"
          />
          
          {/* Loading state */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"
            initial={false}
            animate={{ 
              backgroundColor: isHovered 
                ? 'rgba(0, 0, 0, 0.4)' 
                : 'rgba(0, 0, 0, 0)' 
            }}
          />
          
        </div>
        
        {/* Image info overlay */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 20 
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-2">
            {image.title && (
              <h3 className="font-semibold text-sm line-clamp-2">
                {image.title}
              </h3>
            )}
            
            <div className="flex items-center justify-end text-xs">
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>Zobacz</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
