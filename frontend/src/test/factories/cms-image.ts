import type { CmsImage } from "@/types/cms";

export const createMockCmsImage = (overrides?: Partial<CmsImage>): CmsImage => ({
  src: "/uploads/test-image.avif",
  alt: "Test image",
  caption: "Test caption",
  ...overrides,
});
