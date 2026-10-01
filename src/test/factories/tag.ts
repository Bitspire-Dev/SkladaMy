import type { Tag } from "@/types/cms";

export const createMockTag = (overrides?: Partial<Tag>): Tag => ({
  id: "ikea",
  name: "IKEA",
  slug: "ikea",
  color: "#0058a3",
  description: "Meble IKEA",
  ...overrides,
});
