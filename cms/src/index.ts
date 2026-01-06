export default {
  register(/* { strapi } */) {},
  async bootstrap({ strapi }) {
    // Set up permissions for both public and authenticated roles
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    const authenticatedRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'authenticated' } });

    if (!publicRole || !authenticatedRole) {
      console.warn('⚠️  Roles not found');
      return;
    }

    // Define permissions for each content type
    const permissions = {
      'api::blog-post.blog-post': ['find', 'findOne'],
      'api::category.category': ['find', 'findOne'],
      'api::tag.tag': ['find', 'findOne'],
      'api::gallery.gallery': ['find'],
    };

    console.log('🔧 Setting up permissions...');

    // Set up permissions for both roles
    for (const role of [publicRole, authenticatedRole]) {
      const roleName = role.type === 'public' ? 'Public' : 'Authenticated';
      console.log(`\n📝 Configuring ${roleName} role...`);

      for (const [contentType, actions] of Object.entries(permissions)) {
        for (const action of actions) {
          // Check if permission already exists
          const existingPermission = await strapi
            .query('plugin::users-permissions.permission')
            .findOne({
              where: {
                action: `${contentType}.${action}`,
                role: role.id,
              },
            });

          if (existingPermission && !existingPermission.enabled) {
            // Enable existing permission
            await strapi
              .query('plugin::users-permissions.permission')
              .update({
                where: { id: existingPermission.id },
                data: { enabled: true },
              });
            console.log(`✅ Enabled: ${contentType}.${action}`);
          } else if (!existingPermission) {
            // Create new permission
            await strapi.query('plugin::users-permissions.permission').create({
              data: {
                action: `${contentType}.${action}`,
                role: role.id,
                enabled: true,
              },
            });
            console.log(`✅ Created: ${contentType}.${action}`);
          } else {
            console.log(`ℹ️  Already enabled: ${contentType}.${action}`);
          }
        }
      }
    }

    console.log('\n✅ Permissions configured for Public and Authenticated roles');
  },
};


