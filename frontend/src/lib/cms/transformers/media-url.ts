// ============================================
// MEDIA URL TRANSFORMER - Client-safe helper
// ============================================

export const getMediaURL = (
  media: { url?: string; attributes?: { url?: string } } | null | undefined
): string => {
  if (!media) return "";

  const url = media.url || media.attributes?.url;
  if (!url) return "";

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  if (url.startsWith("/")) {
    if (!strapiUrl) return url;
    return `${strapiUrl}${url}`;
  }

  return url;
};
