"use strict";
module.exports = ({ env }) => ({
    host: env('HOST', env('NODE_ENV') === 'production' ? '0.0.0.0' : '127.0.0.1'),
    port: env.int('PORT', 1337),
    app: { keys: env.array('APP_KEYS') },
    webhooks: { populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false) },
    // Set PUBLIC_URL default to production hostname
    url: env('PUBLIC_URL', `https://cms.skladamy.com.pl`),
    proxy: env.bool('TRUST_PROXY', env('NODE_ENV') === 'production'),
    cron: { enabled: env.bool('CRON_ENABLED', false) },
    admin: { url: env('ADMIN_PATH', '/admin'), serveAdminPanel: env.bool('SERVE_ADMIN', true) },
});
