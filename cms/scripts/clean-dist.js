/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

// Default behavior: clean dist before build to avoid stale compiled files.
// To skip cleaning:
// - Linux/macOS: SKIP_DIST_CLEAN=1 npm run build
// - PowerShell:  $env:SKIP_DIST_CLEAN='1'; npm run build
// - cmd.exe:     set SKIP_DIST_CLEAN=1&& npm run build

const shouldSkip = String(process.env.SKIP_DIST_CLEAN || '').trim() === '1';

if (shouldSkip) {
  console.log('[clean-dist] SKIP_DIST_CLEAN=1 -> leaving dist/ as-is');
  process.exit(0);
}

const distPath = path.join(__dirname, '..', 'dist');

try {
  fs.rmSync(distPath, { recursive: true, force: true });
  console.log('[clean-dist] Removed dist/');
} catch (err) {
  console.error('[clean-dist] Failed to remove dist/', err);
  // Don’t fail the whole build just because dist wasn't there or couldn't be removed.
  process.exit(0);
}
