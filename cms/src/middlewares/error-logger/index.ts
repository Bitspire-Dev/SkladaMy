/**
 * Error Logger Middleware
 * Logs HTTP errors (4xx, 5xx) and unhandled exceptions to Strapi's logger.
 *
 * Design notes:
 *  - No per-request logging on the hot path (was a synchronous console.log on
 *    every request). Use strapi.log.debug gated by LOG_LEVEL for verbose mode.
 *  - Request bodies are only logged when LOG_LEVEL=debug, never in production
 *    by default (PII / payload size concerns).
 *  - IPs and emails are masked to reduce PII in logs.
 */

const SENSITIVE_KEY_RE = /password|pass|secret|token|jwt|session|cookie|authorization|apikey|api_key/i;

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
        if (SENSITIVE_KEY_RE.test(key)) {
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

// Mask an IPv4/IPv6 address, keeping the first octet for rough correlation.
const maskIp = (ip: string | undefined): string => {
  if (!ip) return undefined;
  if (ip.includes('.')) {
    const parts = ip.split('.');
    return `${parts[0]}.x.x.x`;
  }
  // IPv6 — keep first group only.
  const parts = ip.split(':');
  return `${parts[0]}:x:x:x`;
};

// Mask the local part of an email address.
const maskEmail = (value: string): string => {
  if (typeof value !== 'string') return value;
  return value.replace(/([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, (_m, local, domain) => {
    const maskedLocal = local.length > 2 ? `${local.slice(0, 2)}…` : '…';
    return `${maskedLocal}@${domain}`;
  });
};

const maskEmailsDeep = (input: any): any => {
  if (typeof input === 'string') return maskEmail(input);
  if (Array.isArray(input)) return input.map(maskEmailsDeep);
  if (input && typeof input === 'object') {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(input)) out[k] = maskEmailsDeep(v);
    return out;
  }
  return input;
};

const isDebug = () => (process.env.LOG_LEVEL || '').toLowerCase() === 'debug';

const errorLogger = (_config, { strapi }) => {
  return async (ctx, next) => {
    const startTime = Date.now();

    try {
      await next();
      const duration = Date.now() - startTime;

      // Verbose per-request logging only in debug mode.
      if (isDebug()) {
        strapi.log.debug(`[HTTP ${ctx.status}] ${ctx.method} ${ctx.url} (${duration}ms)`);
      }

      // Log 4xx and 5xx responses.
      if (ctx.status >= 400) {
        const baseLogData = {
          method: ctx.method,
          url: ctx.url,
          path: ctx.path,
          status: ctx.status,
          ip: maskIp(ctx.ip),
          userAgent: ctx.headers['user-agent'],
          duration,
        };

        // Only include body/headers when explicitly debugging (PII risk).
        if (isDebug()) {
          const errorLogData = {
            ...baseLogData,
            body: maskEmailsDeep(redactDeep(ctx.request.body)),
            response: maskEmailsDeep(ctx.body),
            headers: sanitizeHeaders(ctx.headers),
          };
          if (ctx.status >= 500) {
            strapi.log.error(`[HTTP ${ctx.status}] Server Error`, errorLogData);
          } else {
            strapi.log.warn(`[HTTP ${ctx.status}] Client Error`, errorLogData);
          }
        } else {
          if (ctx.status >= 500) {
            strapi.log.error(`[HTTP ${ctx.status}] Server Error`, baseLogData);
          } else {
            strapi.log.warn(`[HTTP ${ctx.status}] Client Error`, baseLogData);
          }
        }
      }
    } catch (err: any) {
      const duration = Date.now() - startTime;

      const errorData = {
        method: ctx.method,
        url: ctx.url,
        path: ctx.path,
        status: ctx.status || 500,
        ip: maskIp(ctx.ip),
        userAgent: ctx.headers['user-agent'],
        duration,
        error: err?.message || 'Unknown error',
        stack: err?.stack,
        ...(isDebug()
          ? { body: maskEmailsDeep(redactDeep(ctx.request.body)), headers: sanitizeHeaders(ctx.headers) }
          : {}),
      };

      strapi.log.error('[HTTP Exception]', errorData);
      throw err; // Re-throw to let Strapi handle it
    }
  };
};

export = errorLogger;
