// Test database config
require('dotenv').config();

// Variant A: source config is TS-only; use the compiled JS from dist/
const dbConfig = require('./dist/config/database');

// Mock Strapi's env helper
const env = (key, defaultValue) => {
  const methods = {
    int: (k, def) => parseInt(process.env[k] || def || 0, 10),
    bool: (k, def) => process.env[k] === 'true' || def === true,
    array: (k) => (process.env[k] || '').split(',').map(s => s.trim()),
  };
  
  const value = process.env[key] || defaultValue;
  return Object.assign((k, d) => process.env[k] || d, methods, { [key]: value });
};

const envHelper = Object.assign(
  (key, defaultValue) => process.env[key] || defaultValue,
  {
    int: (key, defaultValue) => parseInt(process.env[key] || defaultValue || 0, 10),
    bool: (key, defaultValue) => process.env[key] === 'true' || defaultValue === true,
    array: (key) => (process.env[key] || '').split(',').map(s => s.trim()).filter(Boolean),
  }
);

console.log('Environment variables:');
console.log('- DATABASE_CLIENT:', process.env.DATABASE_CLIENT);
console.log('- DATABASE_HOST:', process.env.DATABASE_HOST);
console.log('\nCalling database config...\n');

try {
  const result = dbConfig({ env: envHelper });
  console.log('\n✅ Database config returned:');
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error('\n❌ Error:', error.message);
  console.error(error.stack);
}
