import type { Category } from "@/types/cms";

export const createMockCategory = (overrides?: Partial<Category>): Category => ({
  id: "poradniki",
  name: "Poradniki",
  slug: "poradniki",
  description: "Praktyczne poradniki montażowe",
  color: "#3b82f6",
  icon: "BookOpen",
  seo: {
    metaTitle: "Poradniki montażowe",
    metaDescription: "Poradniki i tutoriale",
  },
  ...overrides,
});
