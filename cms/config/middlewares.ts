export = ({ env }: any) => {
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
    'strapi::logger',
    'strapi::errors',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: dev ? false : {
          useDefaults: true,
          directives: {
            'connect-src': ["'self'", 'https:'],
            'img-src': ["'self'", 'data:', 'blob:', 'https:'],
            'media-src': ["'self'", 'data:', 'blob:', 'https:'],
            upgradeInsecureRequests: null,
          },
        },
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

    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};
