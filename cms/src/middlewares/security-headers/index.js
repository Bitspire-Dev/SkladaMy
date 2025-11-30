"use strict";
/**
 * Minimal security headers middleware.
 * CORS is handled by Strapi core (config/middlewares.ts). This only adds extra hardening headers.
 */
const securityHeaders = (_config, _deps) => {
    return async (ctx, next) => {
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
        await next();
    };
};
module.exports = securityHeaders;
