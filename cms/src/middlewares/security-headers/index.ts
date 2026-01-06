/**
 * Minimal security headers middleware.
 * CORS is handled by Strapi core (config/middlewares.ts). This only adds extra hardening headers.
 */

const securityHeaders = (_config, _deps) => {
  return async (ctx, next) => {
    // Basic security headers
    ctx.set({
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'cross-origin',
    });

    // Cache-Control headers for API endpoints
    // Blog posts can be cached longer as they don't change frequently
    if (ctx.path.startsWith('/api/blog-posts') || ctx.path.startsWith('/api/categories') || ctx.path.startsWith('/api/tags')) {
      // 5 minutes browser cache, 10 minutes CDN cache
      ctx.set('Cache-Control', 'public, max-age=300, s-maxage=600, stale-while-revalidate=3600');
    } else if (ctx.path.startsWith('/api/')) {
      // Default API cache: 1 hour
      ctx.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    } else if (ctx.path.startsWith('/uploads/')) {
      // Static files (images): 1 day browser, 7 days CDN
      ctx.set('Cache-Control', 'public, max-age=86400, s-maxage=604800, immutable');
    }

    await next();
  };
};

export = securityHeaders;
