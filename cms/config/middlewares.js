"use strict";
const path = require('path');
const middlewares = ({ env }) => {
    const root = path.resolve(__dirname, '..');
    const healthz = path.join(root, 'src', 'middlewares', 'healthz');
    const securityHeaders = path.join(root, 'src', 'middlewares', 'security-headers');
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
                origin: env('NODE_ENV') === 'development' ? '*' : (env('CORS_ORIGIN', env('PUBLIC_URL', '*')) || '*'),
                methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                credentials: true,
                optionsSuccessStatus: 200,
                preflightContinue: false,
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
