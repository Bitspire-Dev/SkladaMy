// ============================================
// MEDIA URL TRANSFORMER - Client-safe helper
// ============================================
// TinaCMS stores media as paths rooted at `public/` (e.g. `/uploads/x.avif`)
// or as absolute URLs — both are returned unchanged.

import type { CmsImage } from "@/types/cms";

type MediaLike = CmsImage | { src?: string; url?: string } | string | null | undefined;

export const getMediaURL = (media: MediaLike): string => {
  if (!media) return "";
  if (typeof media === "string") return media;
  if ("src" in media && media.src) return media.src;
  return "url" in media ? (media.url ?? "") : "";
};
