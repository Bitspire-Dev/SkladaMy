// Production-ready Strapi starter for DirectAdmin Node.js App
// Requires: npm run build (locally) before deployment
// This starts Strapi in production mode (no admin panel rebuild, no file watching)
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
'use strict';

console.log('[server.js] Starting Strapi...');
console.log('[server.js] Node version:', process.version);
console.log('[server.js] Working directory:', process.cwd());

// Validate environment variables
if (!process.env.NODE_ENV || (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'development')) {
  console.error('[server.js] ERROR: NODE_ENV must be set to "production" or "development"');
  console.error('[server.js] Add NODE_ENV=production to your environment variables');
  process.exit(1);
}

console.log('[server.js] NODE_ENV:', process.env.NODE_ENV);

// Check if Strapi is installed
try {
  const resolved = require.resolve('@strapi/strapi');
  console.log('[server.js] Found @strapi/strapi at:', resolved);
} catch (err) {
  console.error('[server.js] ERROR: @strapi/strapi not found. Run: npm install');
  process.exit(1);
}

// Start Strapi
const { createStrapi } = require('@strapi/strapi');

createStrapi()
  .start()
  .then(() => {
    console.log('[server.js] ✅ Strapi started successfully');
  })
  .catch((error) => {
    console.error('[server.js] ❌ Failed to start Strapi:', error);
    process.exit(1);
  });

// Graceful shutdown on hosting restart
process.on('SIGTERM', () => {
  console.log('[server.js] Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('[server.js] Received SIGINT, shutting down gracefully...');
  process.exit(0);
});
