import { createMockCategory } from "../../factories/category.js";
import type { Category } from "@/types/strapi";

export const mockCategories: Category[] = [
  createMockCategory({
    id: 1,
    documentId: "cat-1",
    name: "Poradniki",
    slug: "poradniki",
    color: "#3b82f6",
  }),
  createMockCategory({
    id: 2,
    documentId: "cat-2",
    name: "Recenzje",
    slug: "recenzje",
    color: "#10b981",
  }),
  createMockCategory({
    id: 3,
    documentId: "cat-3",
    name: "DIY",
    slug: "diy",
    color: "#f59e0b",
  }),
];
