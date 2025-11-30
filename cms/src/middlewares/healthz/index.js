"use strict";
/**
 * Health check middleware.
 * Responds to GET/HEAD /healthz or /_health with { status: 'ok' } (body only for GET).
 * Placed early in the chain so it succeeds even if later middleware breaks.
 */
const healthz = (_config, _deps) => {
    return async (ctx, next) => {
        const isHealthRequest = (ctx.method === 'GET' || ctx.method === 'HEAD') && (ctx.path === '/healthz' || ctx.path === '/_health');
        if (isHealthRequest) {
            ctx.set('Content-Type', 'application/json; charset=utf-8');
            ctx.status = 200;
            if (ctx.method === 'GET') {
                ctx.body = { status: 'ok' };
            }
            return;
        }
        await next();
    };
};
module.exports = healthz;
