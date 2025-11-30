// Bootstrap module: only configures public permissions. Sample seeding removed.

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
    console.log('Bootstrap starting...');

    try {
      // Get the Public role
      const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (!publicRole) {
        console.log('Public role not found');
        return;
      }

      console.log('Found Public role:', publicRole.id);

      // Define permissions for Content Types (only existing APIs)
      const contentTypePermissions = [
        { action: 'api::blog-post.blog-post.find', enabled: true },
        { action: 'api::blog-post.blog-post.findOne', enabled: true },
  { action: 'api::blog-post.blog-post.create', enabled: true },
      ];

      // Update permissions safely
      for (const permission of contentTypePermissions) {
        try {
          const existingPermission = await strapi.query('plugin::users-permissions.permission').findOne({
            where: {
              action: permission.action,
              role: publicRole.id,
            },
          });

          if (existingPermission) {
            await strapi.query('plugin::users-permissions.permission').update({
              where: { id: existingPermission.id },
              data: { enabled: permission.enabled },
            });
            console.log('Updated permission:', permission.action);
          } else {
            await strapi.query('plugin::users-permissions.permission').create({
              data: {
                action: permission.action,
                enabled: permission.enabled,
                role: publicRole.id,
              },
            });
            console.log('Created permission:', permission.action);
          }
        } catch (error) {
          console.log('Permission error for', permission.action, ':', (error as Error).message);
        }
      }

      console.log('Bootstrap completed (sample seeding disabled).');
    } catch (error) {
      console.error('Bootstrap error:', error);
    }
  },
};
