/* eslint-disable @typescript-eslint/no-require-imports */
// Production-ready Next.js starter for DirectAdmin Node.js App
// Requires: npm run build (locally or on server) before starting
// This starts Next.js in production mode (optimized, SSR/SSG ready)
'use strict';

console.log('[server.js] Starting Next.js...');
console.log('[server.js] Node version:', process.version);
console.log('[server.js] Working directory:', process.cwd());
console.log('[server.js] NODE_ENV:', process.env.NODE_ENV || 'production');

// Validate environment
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
  console.log('[server.js] Setting NODE_ENV=production');
}

// Check if Next.js is installed
try {
  const resolved = require.resolve('next');
  console.log('[server.js] Found Next.js at:', resolved);
} catch {
  console.error('[server.js] ERROR: Next.js not found. Run: npm install');
  process.exit(1);
}

// Check if build exists
const fs = require('fs');
const path = require('path');
const buildDir = path.join(process.cwd(), '.next');

if (!fs.existsSync(buildDir)) {
  console.error('[server.js] ERROR: .next build directory not found.');
  console.error('[server.js] Please run: npm run build');
  process.exit(1);
}

// Start Next.js server
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

console.log('[server.js] Initializing Next.js app...');
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    console.log('[server.js] Next.js app prepared successfully');
    
    const server = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('[server.js] Error handling request:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });

    server.listen(port, hostname, (err) => {
      if (err) {
        console.error('[server.js] ❌ Failed to start server:', err);
        process.exit(1);
      }
      console.log('[server.js] ✅ Next.js server listening on http://' + hostname + ':' + port);
      console.log('[server.js] Ready to handle requests');
    });

    // Graceful shutdown on hosting restart
    process.on('SIGTERM', () => {
      console.log('[server.js] Received SIGTERM, shutting down gracefully...');
      server.close(() => {
        console.log('[server.js] HTTP server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('[server.js] Received SIGINT, shutting down gracefully...');
      server.close(() => {
        console.log('[server.js] HTTP server closed');
        process.exit(0);
      });
    });
  })
  .catch((error) => {
    console.error('[server.js] ❌ Failed to prepare Next.js app:', error);
    process.exit(1);
  });
