import path from 'path';

const middlewares = ({ env }) => {
  const root = path.resolve(__dirname, '..');
  const healthz = path.join(root, 'src', 'middlewares', 'healthz');
  const securityHeaders = path.join(root, 'src', 'middlewares', 'security-headers');
  const errorLogger = path.join(root, 'src', 'middlewares', 'error-logger');

  // Build CORS origin list from env. In dev default to localhost:3000 — never
  // '*' combined with credentials:true (browsers reject that combination and
  // it would break authenticated requests).
  const dev = env('NODE_ENV') === 'development';
  const corsOriginEnv = env('CORS_ORIGIN');

  if (!corsOriginEnv && !dev) {
    throw new Error('CORS_ORIGIN must be set in .env file for production!');
  }

  const corsOrigin = dev
    ? (corsOriginEnv || 'http://localhost:3000')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : corsOriginEnv
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
  return [
    // Health endpoint early so it works even if later middleware fails
    { resolve: healthz },
    // Strapi core middleware (keep typical order)
    'strapi::logger',
    // ERROR LOGGER MUST BE BEFORE strapi::errors TO CATCH EVERYTHING
    { resolve: errorLogger },
    'strapi::errors',
    {
      name: 'strapi::security',
      config: {
        ...(env('NODE_ENV') === 'development' ? { contentSecurityPolicy: false } : {}),
      },
    },
    {
      name: 'strapi::cors',
      config: {
        headers: [
          'Content-Type',
          'Authorization',
          'Origin',
          'Accept',
          'X-Requested-With',
          'Access-Control-Request-Method',
          'Access-Control-Request-Headers',
        ],
        origin: corsOrigin,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
        credentials: true,
        keepHeadersOnError: true,
        maxAge: 86400,
      },
    },
    // Custom security headers after CORS
    { resolve: securityHeaders },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    {
      name: 'strapi::session',
      config: {
        key: 'strapi.sid',
        maxAge: 86400000,
        autoCommit: true,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
        renew: false,
        secure: env('NODE_ENV') === 'production',
        sameSite: env('NODE_ENV') === 'production' ? 'none' : 'lax',
        secretKeys: env.array('APP_KEYS'),
      },
    },
    'strapi::favicon',
    'strapi::public',
  ];
};

export default middlewares;
