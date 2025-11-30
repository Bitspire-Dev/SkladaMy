#!/usr/bin/env node
const crypto = require('crypto');

console.log('🔐 Generating secure keys for Strapi production...\n');

function generateKey() {
  return crypto.randomBytes(64).toString('base64');
}

function generateAppKeys() {
  return Array.from({ length: 4 }, () => crypto.randomBytes(32).toString('base64')).join(',');
}

const keys = {
  APP_KEYS: generateAppKeys(),
  API_TOKEN_SALT: generateKey(),
  ADMIN_JWT_SECRET: generateKey(),
  TRANSFER_TOKEN_SALT: generateKey(),
  JWT_SECRET: generateKey(),
  ENCRYPTION_KEY: generateKey(),
};

console.log('Copy these values to your .env file on production:\n');
console.log('# Security Keys - Generated for production');
Object.entries(keys).forEach(([key, value]) => {
  console.log(`${key}="${value}"`);
});

console.log('\n✅ Keys generated successfully!');
console.log('⚠️  Keep these keys secure and never commit them to version control.');
console.log('📝 Copy .env.production to .env on your server and replace the placeholder values.');
