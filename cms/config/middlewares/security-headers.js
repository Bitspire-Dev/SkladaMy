// Converted from config/middlewares/security-headers.ts to CommonJS
// If you use this path, point to it from config/middlewares.js via { resolve: '../config/middlewares/security-headers' }

const parseAllowed = (env) =>
  (env || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

module.exports = (config, { strapi }) => {
  const allowedOrigins = parseAllowed(process.env.CORS_ORIGIN || process.env.PUBLIC_URL);

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
      'Cross-Origin-Resource-Policy': 'same-origin',
      'Content-Security-Policy': "default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self'",
    });

    const origin = ctx.get('Origin') || '';

    if (ctx.method === 'OPTIONS') {
      let allowOrigin = '';
      let allowCredentials = 'false';

      if (allowedOrigins.length > 0) {
        if (allowedOrigins.includes(origin)) {
          allowOrigin = origin;
          allowCredentials = 'true';
        } else {
          ctx.status = 204;
          return;
        }
      } else if (process.env.PUBLIC_URL) {
        allowOrigin = process.env.PUBLIC_URL;
        allowCredentials = origin === process.env.PUBLIC_URL ? 'true' : 'false';
      } else {
        allowOrigin = origin || '*';
        allowCredentials = 'false';
      }

      ctx.set({
        'Access-Control-Allow-Origin': allowOrigin,
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Origin, Accept, X-Requested-With',
        'Access-Control-Allow-Credentials': allowCredentials,
        'Access-Control-Max-Age': '86400',
      });
      ctx.status = 200;
      return;
    }

    if (origin) {
      if (allowedOrigins.length > 0) {
        if (allowedOrigins.includes(origin)) {
          ctx.set('Access-Control-Allow-Origin', origin);
          ctx.set('Access-Control-Allow-Credentials', 'true');
        }
      } else if (process.env.PUBLIC_URL) {
        if (origin === process.env.PUBLIC_URL) {
          ctx.set('Access-Control-Allow-Origin', origin);
          ctx.set('Access-Control-Allow-Credentials', 'true');
        }
      } else {
        ctx.set('Access-Control-Allow-Origin', origin);
        ctx.set('Access-Control-Allow-Credentials', 'false');
      }
    }

    await next();
  };
};
