#!/usr/bin/env node
// Wrapper to run the TypeScript seeding script using ts-node if available.
// This avoids duplicating the large TS file; install ts-node if you need to run directly:
//   npm install -D ts-node typescript

function run() {
  try {
    // Prefer the local ts-node/register if available
    require('ts-node/register');
  } catch (e) {
  console.warn('[seed] ts-node not found. Skipping TypeScript seed script.');
  console.warn('[seed] To run the seed locally, install dev deps: npm install -D ts-node typescript');
  return;
  }

  // Execute the TypeScript seeding script
  try {
    require('./seed-blog-posts.ts');
  } catch (err) {
    console.error('Error executing seed-blog-posts.ts:', err && err.stack ? err.stack : err);
    process.exit(1);
  }
}

if (require.main === module) {
  run();
}

module.exports = { run };
