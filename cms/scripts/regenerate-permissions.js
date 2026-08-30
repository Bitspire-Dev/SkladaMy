/**
 * Script to regenerate Users & Permissions plugin permissions for all content types
 * This should be run if content types don't appear in the Users & Permissions panel
 *
 * Usage:
 * 1. Make sure Strapi is running (npm run develop)
 * 2. Generate an API token with Full Access in Admin Panel
 * 3. Add it to .env: STRAPI_ADMIN_TOKEN=your-token-here
 * 4. Run: node scripts/regenerate-permissions.js
 */

const axios = require('axios');
require('dotenv').config();

const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_ADMIN_TOKEN;

if (!API_TOKEN) {
  console.error('❌ Error: STRAPI_ADMIN_TOKEN not set!');
  console.error('Generate a Full Access token in: Admin Panel → Settings → API Tokens');
  console.error('Add to .env: STRAPI_ADMIN_TOKEN=your-token-here');
  process.exit(1);
}

async function regeneratePermissions() {
  try {
    console.info('🔄 Regenerating Users & Permissions...');
    console.info(`📡 Connecting to: ${PUBLIC_URL}`);

    // Get all roles
    const rolesResponse = await axios.get(`${PUBLIC_URL}/api/users-permissions/roles`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });

    const roles = rolesResponse.data.roles;
    console.info(`✅ Found ${roles.length} roles:`, roles.map((r) => r.name).join(', '));

    // Force Strapi to regenerate permissions by updating each role
    for (const role of roles) {
      console.info(`🔧 Regenerating permissions for role: ${role.name}...`);

      // Get current role permissions
      const roleResponse = await axios.get(`${PUBLIC_URL}/api/users-permissions/roles/${role.id}`, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });

      // Update role (this triggers permission sync)
      await axios.put(`${PUBLIC_URL}/api/users-permissions/roles/${role.id}`, roleResponse.data, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });

      console.info(`✅ Role ${role.name} updated`);
    }

    console.info('\n✅ Success! Check your admin panel - content types should now appear.');
    console.info("💡 Refresh the admin panel page if you still don't see them.");
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

regeneratePermissions();
