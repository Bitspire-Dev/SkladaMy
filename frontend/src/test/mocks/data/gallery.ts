import { createMockGallery } from "../../factories/gallery.js";
import type { Gallery } from "@/types/strapi";

const createMockImage = (id: number, name: string, hash: string, size: number) => ({
  id,
  documentId: `img-${id}`,
  name,
  url: `/uploads/${name}`,
  width: 1200,
  height: 800,
  hash,
  ext: ".jpg",
  mime: "image/jpeg",
  size,
  provider: "local",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  publishedAt: "2024-01-01T00:00:00.000Z",
});

export const mockGallery: Gallery = createMockGallery({
  id: 1,
  images: [
    createMockImage(1, "realizacja-1.jpg", "hash1", 150),
    createMockImage(2, "realizacja-2.jpg", "hash2", 140),
    createMockImage(3, "realizacja-3.jpg", "hash3", 160),
  ],
  featuredImages: [
    createMockImage(1, "realizacja-1.jpg", "hash1", 150),
    createMockImage(2, "realizacja-2.jpg", "hash2", 140),
  ],
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  publishedAt: "2024-01-01T00:00:00.000Z",
});
