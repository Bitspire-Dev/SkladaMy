// Ultra-minimal Strapi starter for 2GB RAM hosting.
// Assumes admin already built locally into dist/build (never build on host).
'use strict';
console.log('[server.js] Node', process.version, 'cwd=', process.cwd());
try {
  const resolved = require.resolve('@strapi/strapi');
  console.log('[server.js] Resolved @strapi/strapi at:', resolved);
} catch {}
const { createStrapi } = require('@strapi/strapi');
const strapi = createStrapi();
strapi.start().catch(err => {
  console.error('[server.js] Failed to start Strapi:', err);
  process.exit(1);
});
