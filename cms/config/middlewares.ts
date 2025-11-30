const path = require('path');

const middlewares = ({ env }: any) => {
  const root = path.resolve(__dirname, '..');
  const healthz = path.join(root, 'src', 'middlewares', 'healthz');
  const securityHeaders = path.join(root, 'src', 'middlewares', 'security-headers');

  // Build CORS origin list from env
  const dev = env('NODE_ENV') === 'development';
  const csv = env('CORS_ORIGIN', '');
  const list = csv ? csv.split(',').map((s: string) => s.trim()).filter(Boolean) : [];
  const publicUrl = env('PUBLIC_URL', '');
  const defaults = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://skladamy.pl',
    'https://www.skladamy.pl',
  ];
  if (publicUrl) defaults.push(publicUrl);
  const corsOrigin = dev ? '*' : Array.from(new Set([...defaults, ...list]));

  return [
    // Health endpoint early so it works even if later middleware fails
    { resolve: healthz },

    // Strapi core middleware (keep typical order)
    'strapi::logger',
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
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};

export = middlewares;
