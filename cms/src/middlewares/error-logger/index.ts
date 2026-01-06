/**
 * Error Logger Middleware
 * Logs all HTTP errors (4xx, 5xx) to Winston logger and files
 */

const redactDeep = (input: any) => {
  const visited = new WeakSet<object>();

  const redact = (value: any, depth: number): any => {
    if (depth > 6) return '[REDACTED:DEPTH]';
    if (value === null || value === undefined) return value;

    const valueType = typeof value;
    if (valueType === 'string' || valueType === 'number' || valueType === 'boolean') return value;

    if (Array.isArray(value)) {
      return value.slice(0, 200).map((v) => redact(v, depth + 1));
    }

    if (valueType === 'object') {
      if (visited.has(value)) return '[REDACTED:CIRCULAR]';
      visited.add(value);

      const out: Record<string, any> = {};
      for (const [key, v] of Object.entries(value)) {
        if (/password|pass|secret|token|jwt|session|cookie|authorization/i.test(key)) {
          out[key] = '[REDACTED]';
        } else {
          out[key] = redact(v, depth + 1);
        }
      }
      return out;
    }

    return String(value);
  };

  return redact(input, 0);
};

const sanitizeHeaders = (headers: any) => {
  const safe = { ...(headers || {}) };
  if (safe.authorization) safe.authorization = '[REDACTED]';
  if (safe.cookie) safe.cookie = '[REDACTED]';
  if (safe['set-cookie']) safe['set-cookie'] = '[REDACTED]';
  return safe;
};

const errorLogger = (_config, { strapi }) => {
  console.log('🔍🔍🔍 [ERROR-LOGGER] Middleware loaded!');
  
  return async (ctx, next) => {
    const startTime = Date.now();
    console.log(`🔍 [ERROR-LOGGER] Request: ${ctx.method} ${ctx.url}`);
    console.log(`🔍 [ERROR-LOGGER] Path: ${ctx.path}, Query: ${JSON.stringify(ctx.query)}`);
    console.log(
      `🔍 [ERROR-LOGGER] Proxy/HTTPS: protocol=${ctx.protocol} secure=${ctx.secure} request.secure=${ctx.request?.secure} app.proxy=${ctx.app?.proxy}`
    );
    console.log(
      `🔍 [ERROR-LOGGER] Forwarded: x-forwarded-proto=${ctx.headers?.['x-forwarded-proto']} x-forwarded-host=${ctx.headers?.['x-forwarded-host']} x-forwarded-for=${ctx.headers?.['x-forwarded-for']}`
    );
    
    try {
      await next();

      const duration = Date.now() - startTime;
      
      // Log response status
      console.log(`🔍 [ERROR-LOGGER] Response: ${ctx.status} for ${ctx.method} ${ctx.url} (${duration}ms)`);

      // Log ALL requests in production for debugging
      const logData = {
        method: ctx.method,
        url: ctx.url,
        path: ctx.path,
        status: ctx.status,
        ip: ctx.ip,
        userAgent: ctx.headers['user-agent'],
        duration,
        nodeEnv: process.env.NODE_ENV,
        trustProxyEnv: process.env.TRUST_PROXY,
        protocol: ctx.protocol,
        secure: ctx.secure,
        requestSecure: ctx.request?.secure,
        appProxy: ctx.app?.proxy,
        forwardedProto: ctx.headers?.['x-forwarded-proto'],
        forwardedHost: ctx.headers?.['x-forwarded-host'],
        forwardedFor: ctx.headers?.['x-forwarded-for'],
      };

      // Always log in production
      if (process.env.NODE_ENV === 'production') {
        strapi.log.info(`[HTTP ${ctx.status}] ${ctx.method} ${ctx.url}`, logData);
      }

      // Log 4xx and 5xx responses
      if (ctx.status >= 400) {
        const errorLogData = {
          ...logData,
          body: redactDeep(ctx.request.body),
          response: ctx.body,
          headers: sanitizeHeaders(ctx.headers),
        };

        console.error(`❌❌❌ [ERROR-LOGGER] HTTP ${ctx.status}:`, JSON.stringify(errorLogData, null, 2));

        if (ctx.status >= 500) {
          strapi.log.error('[HTTP 500] Server Error', errorLogData);
        } else {
          strapi.log.warn(`[HTTP ${ctx.status}] Client Error`, errorLogData);
        }
      }
    } catch (err: any) {
      const duration = Date.now() - startTime;
      
      const errorData = {
        method: ctx.method,
        url: ctx.url,
        path: ctx.path,
        status: ctx.status || 500,
        ip: ctx.ip,
        userAgent: ctx.headers['user-agent'],
        duration,
        nodeEnv: process.env.NODE_ENV,
        trustProxyEnv: process.env.TRUST_PROXY,
        protocol: ctx.protocol,
        secure: ctx.secure,
        requestSecure: ctx.request?.secure,
        appProxy: ctx.app?.proxy,
        forwardedProto: ctx.headers?.['x-forwarded-proto'],
        forwardedHost: ctx.headers?.['x-forwarded-host'],
        forwardedFor: ctx.headers?.['x-forwarded-for'],
        error: err?.message || 'Unknown error',
        stack: err?.stack,
        body: redactDeep(ctx.request.body),
        headers: sanitizeHeaders(ctx.headers),
      };

      console.error('❌❌❌ [ERROR-LOGGER] EXCEPTION:', JSON.stringify(errorData, null, 2));
      strapi.log.error('[HTTP Exception]', errorData);
      
      throw err; // Re-throw to let Strapi handle it
    }
  };
};

export = errorLogger;
