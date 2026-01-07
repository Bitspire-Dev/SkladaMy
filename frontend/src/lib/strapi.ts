// Client-safe Strapi helpers.
// IMPORTANT: Do not access STRAPI_API_TOKEN here.

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

// Helper function for building query strings
export const buildQueryString = (params?: Record<string, string | number | boolean | string[]>): string => {
  if (!params) return '';
  
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(`${key}[]`, item.toString()));
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

// Media URL helper
export const getMediaURL = (media: { url?: string; attributes?: { url?: string } } | null | undefined): string => {
  if (!media) return '';
  
  const url = media.url || media.attributes?.url;
  if (!url) return '';
  
  // If URL is relative, prepend Strapi URL
  if (url.startsWith('/')) {
    if (!STRAPI_URL) return url;
    return `${STRAPI_URL}${url}`;
  }
  
  return url;
};

