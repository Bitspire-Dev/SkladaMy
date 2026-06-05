import { createMockBlogPost } from "../../factories/blog-post.js";
import type { BlogPost } from "@/types/strapi";

export const mockBlogPosts: BlogPost[] = [
  createMockBlogPost({
    id: 1,
    documentId: "post-1",
    title: "Jak zmontować szafę PAX IKEA?",
    slug: "jak-zmontowac-szafe-pax-ikea",
    excerpt: "Kompletny poradnik montażu szafy PAX krok po kroku",
    featured: true,
    publishDate: "2024-01-15T10:00:00.000Z",
  }),
  createMockBlogPost({
    id: 2,
    documentId: "post-2",
    title: "Montaż kuchni KNOXHULT - instrukcja",
    slug: "montaz-kuchni-knoxhult",
    excerpt: "Praktyczne wskazówki przy montażu kuchni IKEA",
    featured: false,
    publishDate: "2024-01-10T10:00:00.000Z",
  }),
  createMockBlogPost({
    id: 3,
    documentId: "post-3",
    title: "Meble BESTÅ - czy warto kupić?",
    slug: "meble-bestaa-czy-warto",
    excerpt: "Recenzja systemu mebli telewizyjnych BESTÅ",
    featured: false,
    publishDate: "2024-01-05T10:00:00.000Z",
  }),
];
