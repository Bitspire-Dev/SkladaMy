/**
 * DEBUG: Check what routes and permissions users-permissions sees
 * 
 * Run Strapi in develop mode, then run: node scripts/debug-permissions.js
 */

const axios = require('axios');
require('dotenv').config();

const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:1337';

async function debugPermissions() {
  try {
    console.log('🔍 Debugging users-permissions...\n');
    
    // Try to get routes (might be public)
    try {
      const routesResponse = await axios.get(`${PUBLIC_URL}/api/users-permissions/routes`);
      console.log('📍 Routes visible to users-permissions:');
      console.log(JSON.stringify(routesResponse.data, null, 2));
    } catch (error) {
      console.log('⚠️  Routes endpoint requires authentication');
    }
    
    // Try to get permissions structure
    try {
      const permissionsResponse = await axios.get(`${PUBLIC_URL}/api/users-permissions/permissions`);
      console.log('\n🔐 Permissions structure:');
      console.log(JSON.stringify(permissionsResponse.data, null, 2));
    } catch (error) {
      console.log('⚠️  Permissions endpoint requires authentication');
    }
    
    // Get public role
    try {
      const rolesResponse = await axios.get(`${PUBLIC_URL}/api/users-permissions/roles`);
      console.log('\n👥 Available roles:');
      rolesResponse.data.roles.forEach(role => {
        console.log(`  - ${role.name} (ID: ${role.id})`);
      });
    } catch (error) {
      console.log('⚠️  Roles endpoint requires authentication');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugPermissions();
