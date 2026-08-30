/**
 * Health check middleware.
 * Responds to GET/HEAD /healthZ or /_health.
 *
 * Default (no token): returns only {"status":"healthy"|"unhealthy"} — no
 * version/memory/uptime leakage to unauthenticated callers.
 * Detailed info (memory, uptime, version) is returned only when the request
 * includes a matching HEALTHZ_TOKEN query parameter or Authorization header.
 *
 * The DB probe is cached for 5s to avoid hammering the database on every
 * health check (e.g. from a load balancer polling every 2-5s).
 */

const DB_CACHE_TTL_MS = 5000;
let dbCache: { connected: boolean; at: number } | null = null;

const healthz = (_config, { strapi }) => {
  return async (ctx, next) => {
    const isHealthRequest =
      (ctx.method === 'GET' || ctx.method === 'HEAD') &&
      (ctx.path === '/healthz' || ctx.path === '/_health');

    if (!isHealthRequest) {
      await next();
      return;
    }

    ctx.set('Content-Type', 'application/json; charset=utf-8');

    // Check DB connectivity (cached for DB_CACHE_TTL_MS).
    const now = Date.now();
    let dbConnected = false;
    if (dbCache && now - dbCache.at < DB_CACHE_TTL_MS) {
      dbConnected = dbCache.connected;
    } else {
      try {
        if (strapi?.db?.connection) {
          await strapi.db.connection.raw('SELECT 1');
          dbConnected = true;
        }
      } catch {
        dbConnected = false;
      }
      dbCache = { connected: dbConnected, at: now };
    }

    if (ctx.method === 'HEAD') {
      ctx.status = dbConnected ? 200 : 503;
      return;
    }

    // Determine if the caller is authorized for detailed info.
    const expectedToken = process.env.HEALTHZ_TOKEN;
    const providedTokenQuery = ctx.query?.token;
    const authHeader = ctx.headers.authorization || '';
    const providedTokenHeader = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7).trim()
      : null;
    const isAuthorized =
      !!expectedToken &&
      (providedTokenQuery === expectedToken || providedTokenHeader === expectedToken);

    if (isAuthorized) {
      const memUsage = process.memoryUsage();
      ctx.status = dbConnected ? 200 : 503;
      ctx.body = {
        status: dbConnected ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(process.uptime())} seconds`,
        database: dbConnected ? 'connected' : 'disconnected',
        memory: {
          heapUsed: `${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
          heapTotal: `${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
          external: `${(memUsage.external / 1024 / 1024).toFixed(2)} MB`,
          rss: `${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`,
        },
        version: strapi?.config?.get('info.strapi') || 'unknown',
      };
    } else {
      // Minimal response — no version/memory/uptime leakage.
      ctx.status = dbConnected ? 200 : 503;
      ctx.body = { status: dbConnected ? 'healthy' : 'unhealthy' };
    }
  };
};

export = healthz;
