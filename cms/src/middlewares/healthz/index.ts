import type { Context, Next } from 'koa';

/**
 * Enhanced health check middleware.
 * Responds to GET/HEAD /healthz or /_health with comprehensive health information.
 * Includes database connectivity check, uptime, and memory usage.
 * Placed early in the chain so it succeeds even if later middleware breaks.
 */
const healthz = (_config: unknown, { strapi }: any) => {
  return async (ctx: Context, next: Next) => {
    const isHealthRequest = (ctx.method === 'GET' || ctx.method === 'HEAD') && (ctx.path === '/healthz' || ctx.path === '/_health');
    
    if (isHealthRequest) {
      ctx.set('Content-Type', 'application/json; charset=utf-8');
      
      if (ctx.method === 'HEAD') {
        ctx.status = 200;
        return;
      }
      
      // Check database connection
      let dbStatus = 'unknown';
      let dbConnected = false;
      
      try {
        if (strapi?.db?.connection) {
          await strapi.db.connection.raw('SELECT 1');
          dbStatus = 'connected';
          dbConnected = true;
        } else {
          dbStatus = 'unavailable';
        }
      } catch (error) {
        dbStatus = 'disconnected';
        dbConnected = false;
      }
      
      // Get memory usage
      const memUsage = process.memoryUsage();
      const memory = {
        heapUsed: `${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
        external: `${(memUsage.external / 1024 / 1024).toFixed(2)} MB`,
        rss: `${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`,
      };
      
      // Build response
      const healthInfo = {
        status: dbConnected ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(process.uptime())} seconds`,
        database: dbStatus,
        memory,
        version: strapi?.config?.get('info.strapi') || 'unknown',
        environment: process.env.NODE_ENV || 'unknown',
      };
      
      ctx.status = dbConnected ? 200 : 503;
      ctx.body = healthInfo;
      return;
    }
    
    await next();
  };
};

export = healthz;
