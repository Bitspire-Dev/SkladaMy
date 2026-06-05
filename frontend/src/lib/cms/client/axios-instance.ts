import axios from "axios";
import { getStrapiUrl } from "@/lib/config/environment";

const STRAPI_URL = getStrapiUrl();

// Token is optional: if you configure Strapi Public permissions for read, you can omit it.
// If your Strapi requires auth for these endpoints, set STRAPI_API_TOKEN on the server.
const API_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Axios instance configured for Strapi CMS API
 */
export const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token interceptor
api.interceptors.request.use(
  (config) => {
    if (API_TOKEN) {
      config.headers.Authorization = `Bearer ${API_TOKEN}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Get full URL for Strapi media
 * Safe for both new and legacy formats (including attributes) and returns "" on empty/falsy inputs.
 */
export const getMediaURL = (
  media?: { url?: string; attributes?: { url?: string } } | null
): string => {
  if (!media) return "";
  const url = media.url || media.attributes?.url;
  if (!url) return "";

  if (url.startsWith("http")) return url;

  // Safe fallback if env variable is missing
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "";
  return `${strapiUrl}${url}`;
};
