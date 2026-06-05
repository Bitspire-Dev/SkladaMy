import type { Gallery } from "@/types/strapi";
import { createMockStrapiImage } from "./strapi-image.js";

export const createMockGallery = (overrides?: Partial<Gallery>): Gallery => ({
  id: 1,
  images: [
    createMockStrapiImage({ id: 1, name: "gallery-1.jpg" }),
    createMockStrapiImage({ id: 2, name: "gallery-2.jpg" }),
    createMockStrapiImage({ id: 3, name: "gallery-3.jpg" }),
  ],
  featuredImages: [
    createMockStrapiImage({ id: 1, name: "featured-1.jpg" }),
    createMockStrapiImage({ id: 2, name: "featured-2.jpg" }),
  ],
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  publishedAt: "2024-01-01T00:00:00.000Z",
  ...overrides,
});
