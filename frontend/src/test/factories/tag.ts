import type { Tag } from "@/types/strapi";

export const createMockTag = (overrides?: Partial<Tag>): Tag => ({
  id: 1,
  documentId: "tag-1",
  name: "IKEA",
  slug: "ikea",
  color: "#0058a3",
  description: "Meble IKEA",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  publishedAt: "2024-01-01T00:00:00.000Z",
  ...overrides,
});
