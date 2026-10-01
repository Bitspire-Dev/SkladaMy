import type { BlogPost, Author, FAQItem } from "@/types/cms";
import { createMockCategory } from "./category.js";
import { createMockTag } from "./tag.js";
import { createMockCmsImage } from "./cms-image.js";

export const createMockAuthor = (overrides?: Partial<Author>): Author => ({
  name: "Jan Kowalski",
  role: "Montażysta mebli",
  bio: "Ekspert od mebli IKEA z 10-letnim doświadczeniem",
  email: "jan@skladamy.com",
  ...overrides,
});

export const createMockFAQItem = (overrides?: Partial<FAQItem>): FAQItem => ({
  question: "Jak długo trwa montaż?",
  answer: "Standardowy montaż szafy trwa 2-3 godziny.",
  ...overrides,
});

export const createMockBlogPost = (overrides?: Partial<BlogPost>): BlogPost => ({
  id: "jak-zmontowac-szafe-pax-ikea",
  title: "Jak zmontować szafę PAX IKEA?",
  slug: "jak-zmontowac-szafe-pax-ikea",
  excerpt: "Praktyczny poradnik montażu szafy PAX krok po kroku",
  content: "<h2>Wstęp</h2><p>Szafa PAX to popularny wybór...</p>",
  featured: false,
  publishDate: "2024-01-15T10:00:00.000Z",
  lastModified: "2024-01-15T10:00:00.000Z",
  publishedAt: "2024-01-15T10:00:00.000Z",
  createdAt: "2024-01-15T10:00:00.000Z",
  updatedAt: "2024-01-15T10:00:00.000Z",
  featuredImage: createMockCmsImage(),
  author: createMockAuthor(),
  category: createMockCategory(),
  tags: [createMockTag(), createMockTag({ id: "diy", name: "DIY", slug: "diy" })],
  relatedPosts: [],
  readTime: 5,
  views: 1234,
  gallery: [],
  seo: {
    metaTitle: "Montaż szafy PAX IKEA - poradnik",
    metaDescription: "Dowiedz się jak zmontować szafę PAX",
  },
  breadcrumbs: {},
  faq: [createMockFAQItem()],
  ...overrides,
});
