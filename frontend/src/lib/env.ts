// ============================================
// ENVIRONMENT HELPERS
// ============================================
// Centralized environment variable access with validation

/**
 * Get required NEXT_PUBLIC_SITE_URL
 * Throws error if not set - NO FALLBACK!
 */
export function getSiteUrl(): string {
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    throw new Error('NEXT_PUBLIC_SITE_URL must be set in .env file!');
  }
  return process.env.NEXT_PUBLIC_SITE_URL;
}

/**
 * Get required NEXT_PUBLIC_STRAPI_URL
 * Throws error if not set - NO FALLBACK!
 */
export function getStrapiUrl(): string {
  if (!process.env.NEXT_PUBLIC_STRAPI_URL) {
    throw new Error('NEXT_PUBLIC_STRAPI_URL must be set in .env file!');
  }
  return process.env.NEXT_PUBLIC_STRAPI_URL;
}

/**
 * Check if we're in browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Get current full URL (browser only)
 * Falls back to site URL + path if on server
 */
export function getCurrentUrl(path: string = ''): string {
  if (isBrowser()) {
    return window.location.href;
  }
  return `${getSiteUrl()}${path}`;
}
