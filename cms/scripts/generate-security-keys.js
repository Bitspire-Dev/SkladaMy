#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Generate security keys for Strapi CMS
 * Run: node scripts/generate-security-keys.js
 *
 * Generates all required security keys:
 * - APP_KEYS (4 keys for session encryption)
 * - API_TOKEN_SALT (for API token hashing)
 * - ADMIN_JWT_SECRET (for admin JWT signing)
 * - TRANSFER_TOKEN_SALT (for data transfer tokens)
 * - JWT_SECRET (for general JWT signing)
 * - ENCRYPTION_KEY (for encrypting sensitive data in database)
 * - SESSION_SECRET (for session cookie signing)
 */

const crypto = require('crypto');

/**
 * Generate a random base64 key
 * @param {number} bytes - Number of random bytes to generate
 * @returns {string} Base64 encoded key
 */
function generateKey(bytes = 32) {
  return crypto.randomBytes(bytes).toString('base64');
}

console.log('\n╔═══════════════════════════════════════════════════════════════╗');
console.log('║        STRAPI SECURITY KEYS GENERATOR                         ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

console.log('📋 Copy these values to your .env file:\n');
console.log('─────────────────────────────────────────────────────────────────\n');

// Generate APP_KEYS (4 keys for session rotation)
const appKeys = [generateKey(), generateKey(), generateKey(), generateKey()].join(',');

console.log('# Security Keys - Generated on', new Date().toISOString());
console.log(`APP_KEYS="${appKeys}"`);
console.log(`API_TOKEN_SALT="${generateKey(64)}"`);
console.log(`ADMIN_JWT_SECRET="${generateKey(64)}"`);
console.log(`TRANSFER_TOKEN_SALT="${generateKey(64)}"`);
console.log(`JWT_SECRET="${generateKey(64)}"`);
console.log(`ENCRYPTION_KEY="${generateKey(64)}"`);
console.log(`SESSION_SECRET="${generateKey()}"`);

console.log('\n─────────────────────────────────────────────────────────────────\n');
console.log('✅ Keys generated successfully!');
console.log('\n⚠️  IMPORTANT:');
console.log('   • Keep these keys SECRET - never commit to git');
console.log('   • Use different keys for production');
console.log('   • Store production keys securely (environment variables)');
console.log('   • Changing keys will log out all users\n');
