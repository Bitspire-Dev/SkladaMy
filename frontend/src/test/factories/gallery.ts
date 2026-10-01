import type { Gallery } from "@/types/cms";
import { createMockCmsImage } from "./cms-image.js";

export const createMockGallery = (overrides?: Partial<Gallery>): Gallery => ({
  images: [
    createMockCmsImage({ src: "/uploads/gallery-1.avif" }),
    createMockCmsImage({ src: "/uploads/gallery-2.avif" }),
    createMockCmsImage({ src: "/uploads/gallery-3.avif" }),
  ],
  featuredImages: [
    createMockCmsImage({ src: "/uploads/featured-1.avif" }),
    createMockCmsImage({ src: "/uploads/featured-2.avif" }),
  ],
  ...overrides,
});
