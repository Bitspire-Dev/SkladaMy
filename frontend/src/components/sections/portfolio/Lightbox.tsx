"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import axios from "axios";
import { X, ChevronLeft, ChevronRight, Download, Share } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface LightboxImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/* eslint-disable max-lines-per-function */
export function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const [isLoading, setIsLoading] = useState(true);
  const currentImage = images[currentIndex];

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (currentIndex > 0) {
            onNavigate(currentIndex - 1);
          }
          break;
        case "ArrowRight":
          if (currentIndex < images.length - 1) {
            onNavigate(currentIndex + 1);
          }
          break;
      }
    },
    [currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
      setIsLoading(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1);
      setIsLoading(true);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(currentImage.src, {
        responseType: "blob",
      });

      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${currentImage.title}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentImage.title,
          text: `Sprawdź to zdjęcie z portfolio SkładaMy`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Failed to share:", error);
      }
    } else {
      // Fallback - copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        // You could show a toast notification here
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
          onClick={onClose}
          aria-label="Zamknij podgląd"
        >
          <X className="w-6 h-6" aria-hidden="true" />
        </Button>

        {/* Navigation buttons */}
        {currentIndex > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            aria-label="Poprzednie zdjęcie"
          >
            <ChevronLeft className="w-8 h-8" aria-hidden="true" />
          </Button>
        )}

        {currentIndex < images.length - 1 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Następne zdjęcie"
          >
            <ChevronRight className="w-8 h-8" aria-hidden="true" />
          </Button>
        )}

        {/* Action buttons */}
        <div className="absolute top-4 left-4 z-10 flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
            aria-label="Pobierz zdjęcie"
          >
            <Download className="w-5 h-5" aria-hidden="true" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            aria-label="Udostępnij zdjęcie"
          >
            <Share className="w-5 h-5" aria-hidden="true" />
          </Button>
        </div>

        {/* Image container */}
        <motion.div
          className="relative max-w-[90vw] max-h-[90vh] mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              width={1200}
              height={800}
              className={`
                max-w-full max-h-[90vh] w-auto h-auto object-contain
                transition-opacity duration-300
                ${isLoading ? "opacity-0" : "opacity-100"}
              `}
              onLoad={() => setIsLoading(false)}
              priority
            />

            {/* Loading indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </motion.div>

        {/* Image info */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 z-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
        >
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="space-y-1">
                {currentImage.title && (
                  <h3 className="font-semibold text-lg">{currentImage.title}</h3>
                )}

                <div className="flex items-center space-x-4 text-sm text-gray-200">
                  <span>
                    Zdjęcie {currentIndex + 1} z {images.length}
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-200">
                {currentIndex + 1} z {images.length}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
