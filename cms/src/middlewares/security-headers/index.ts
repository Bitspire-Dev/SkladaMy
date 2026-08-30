/**
 * Minimal security headers middleware.
 * CORS is handled by Strapi core (config/middlewares.ts). This only adds extra
 * hardening headers and conservative Cache-Control for public content endpoints.
 */

const securityHeaders = (_config, _deps) => {
  return async (ctx, next) => {
    // Basic security headers.
    // X-XSS-Protection removed: deprecated and can introduce XSS in old
    // browsers. Modern browsers ignore it; use CSP instead.
    // COEP removed `unsafe-none` (not a valid value per the spec — only
    // `require-corp` and `credentialless` are defined). We omit COEP entirely;
    // add `require-corp` only if you actually need cross-origin isolation.
    ctx.set({
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'cross-origin',
    });

    // Cache-Control headers for API endpoints.
    // Only cache safe, public GET requests — never authenticated or mutating.
    const isGetRequest = ctx.method === 'GET' || ctx.method === 'HEAD';
    const hasAuthHeader = ctx.headers.authorization || ctx.headers.cookie;

    if (isGetRequest && !hasAuthHeader) {
      // Public content endpoints — safe to cache at the CDN, but vary on
      // Origin (CORS) and Accept-Encoding so the CDN doesn't serve a
      // cross-origin / wrong-encoding variant to a different client.
      if (
        ctx.path.startsWith('/api/blog-posts') ||
        ctx.path.startsWith('/api/categories') ||
        ctx.path.startsWith('/api/tags')
      ) {
        ctx.set(
          'Cache-Control',
          'public, max-age=300, s-maxage=600, stale-while-revalidate=3600'
        );
        ctx.set('Vary', 'Origin, Accept-Encoding');
      }
      // Authenticated endpoints get no-store to avoid leaking user-specific
      // responses via a shared cache.
    } else if (ctx.path.startsWith('/api/')) {
      ctx.set('Cache-Control', 'private, no-store');
    }

    // Static files (images) can always be cached — they're immutable.
    if (ctx.path.startsWith('/uploads/')) {
      ctx.set('Cache-Control', 'public, max-age=86400, s-maxage=604800, immutable');
    }

    await next();
  };
};

export = securityHeaders;
