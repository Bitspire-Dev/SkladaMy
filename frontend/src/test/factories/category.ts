import type { Category } from "@/types/strapi";

export const createMockCategory = (overrides?: Partial<Category>): Category => ({
  id: 1,
  documentId: "cat-1",
  name: "Poradniki",
  slug: "poradniki",
  description: "Praktyczne poradniki montażowe",
  color: "#3b82f6",
  icon: "BookOpen",
  seo: {
    metaTitle: "Poradniki montażowe",
    metaDescription: "Poradniki i tutoriale",
  },
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  publishedAt: "2024-01-01T00:00:00.000Z",
  ...overrides,
});
