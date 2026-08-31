"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Download, Share, Check } from "lucide-react";
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

// Focusable selector for the focus trap.
const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/* eslint-disable max-lines-per-function */
export function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const currentImage = images[currentIndex];
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Centralized navigation: sets loading state + delegates to parent.
  const navigate = useCallback(
    (index: number) => {
      setIsLoading(true);
      onNavigate(index);
    },
    [onNavigate]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (currentIndex > 0) {
            navigate(currentIndex - 1);
          }
          break;
        case "ArrowRight":
          if (currentIndex < images.length - 1) {
            navigate(currentIndex + 1);
          }
          break;
        case "Tab":
          // Focus trap: keep Tab within the lightbox.
          if (!containerRef.current) return;
          {
            const focusables = Array.from(
              containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
            ).filter((el) => !el.hasAttribute("disabled"));
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            const active = document.activeElement as HTMLElement | null;
            if (e.shiftKey) {
              if (active === first || !containerRef.current.contains(active)) {
                e.preventDefault();
                last.focus();
              }
            } else {
              if (active === last || !containerRef.current.contains(active)) {
                e.preventDefault();
                first.focus();
              }
            }
          }
          break;
      }
    },
    [currentIndex, images.length, onClose, navigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    // Save current focus and move it into the lightbox on open.
    previouslyFocused.current = document.activeElement as HTMLElement;
    // Focus the close button (first focusable) once mounted.
    const t = setTimeout(() => {
      const first = containerRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      first?.focus();
    }, 0);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
      clearTimeout(t);
      // Restore focus to the element that opened the lightbox.
      previouslyFocused.current?.focus?.();
    };
  }, [handleKeyDown]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigate(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      navigate(currentIndex + 1);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(currentImage.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      // Derive extension from the image URL instead of hardcoding .jpg.
      let ext = "jpg";
      try {
        const { pathname } = new URL(currentImage.src);
        const match = pathname.match(/\.(\w+)$/);
        if (match) ext = match[1];
      } catch {
        // keep default
      }
      const a = document.createElement("a");
      a.href = url;
      a.download = `${currentImage.title || "skladamy"}.${ext}`;
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
      // Fallback - copy to clipboard with visual feedback
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
      }
    }
  };

  // Touch handlers for swipe navigation on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const diff = endX - touchStartX.current;
    // Swipe threshold: 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handlePrevious();
      } else {
        handleNext();
      }
    }
    touchStartX.current = null;
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Podgląd zdjęcia"
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
            aria-label={copied ? "Link skopiowany" : "Udostępnij zdjęcie"}
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-400" aria-hidden="true" />
            ) : (
              <Share className="w-5 h-5" aria-hidden="true" />
            )}
          </Button>
        </div>

        {/* Image container */}
        <motion.div
          className="relative max-w-[90vw] max-h-[90vh] mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative">
            <Image
              key={currentImage.src}
              src={currentImage.src}
              alt={currentImage.alt}
              width={1200}
              height={800}
              sizes="90vw"
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
          onClick={(e) => e.stopPropagation()}
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
