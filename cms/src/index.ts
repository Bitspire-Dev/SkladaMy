// Bootstrap module: configures public permissions and registers middleware

export default {
  register() {
    // Empty register
  },

  async bootstrap({ strapi }: { strapi: any }) {
    console.log('Bootstrap starting...');

    // Register health check middleware
    try {
      strapi.server.use(async (ctx: any, next: any) => {
        const isHealthRequest = (ctx.method === 'GET' || ctx.method === 'HEAD') && 
                                (ctx.path === '/healthz' || ctx.path === '/_health');
        if (isHealthRequest) {
          ctx.set('Content-Type', 'application/json; charset=utf-8');
          ctx.status = 200;
          if (ctx.method === 'GET') {
            ctx.body = { status: 'ok' };
          }
          return;
        }
        await next();
      });
      console.log('✅ Health check middleware registered');
    } catch (error) {
      console.log('⚠️  Health check middleware registration skipped');
    }

    // Configure public permissions
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
