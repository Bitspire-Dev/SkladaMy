const path = require('path');
const middlewares = ({ env }) => {
    const root = path.resolve(__dirname, '..');
    const healthz = path.join(root, 'src', 'middlewares', 'healthz');
    const securityHeaders = path.join(root, 'src', 'middlewares', 'security-headers');
    // Build CORS origin list from env - ONLY from CORS_ORIGIN variable
    const dev = env('NODE_ENV') === 'development';
    const corsOriginEnv = env('CORS_ORIGIN');
    
    if (!corsOriginEnv && !dev) {
        throw new Error('CORS_ORIGIN must be set in .env file for production!');
    }
    
    const corsOrigin = dev 
        ? '*' 
        : corsOriginEnv.split(',').map((s) => s.trim()).filter(Boolean);
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
module.exports = middlewares;
