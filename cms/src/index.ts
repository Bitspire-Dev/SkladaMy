export default {
  register(/* { strapi } */) {},
  async bootstrap({ strapi }) {
    // Set up permissions for both public and authenticated roles.
    // strapi.query('plugin::...') is deprecated in v5 — use strapi.db.query.
    const publicRole = await strapi
      .db.query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    const authenticatedRole = await strapi
      .db.query('plugin::users-permissions.role')
      .findOne({ where: { type: 'authenticated' } });

    if (!publicRole || !authenticatedRole) {
      strapi.log.warn('Roles not found during bootstrap — skipping permission setup');
      return;
    }

    // Define permissions for each content type
    const permissions = {
      'api::blog-post.blog-post': ['find', 'findOne'],
      'api::category.category': ['find', 'findOne'],
      'api::tag.tag': ['find', 'findOne'],
      'api::gallery.gallery': ['find'],
    };

    strapi.log.info('Setting up permissions...');

    for (const role of [publicRole, authenticatedRole]) {
      const roleName = role.type === 'public' ? 'Public' : 'Authenticated';
      strapi.log.debug(`Configuring ${roleName} role...`);

      for (const [contentType, actions] of Object.entries(permissions)) {
        for (const action of actions) {
          const existingPermission = await strapi
            .db.query('plugin::users-permissions.permission')
            .findOne({
              where: {
                action: `${contentType}.${action}`,
                role: role.id,
              },
            });

          if (existingPermission && !existingPermission.enabled) {
            await strapi.db.query('plugin::users-permissions.permission').update({
              where: { id: existingPermission.id },
              data: { enabled: true },
            });
            strapi.log.debug(`Enabled: ${contentType}.${action}`);
          } else if (!existingPermission) {
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: {
                action: `${contentType}.${action}`,
                role: role.id,
                enabled: true,
              },
            });
            strapi.log.debug(`Created: ${contentType}.${action}`);
          }
        }
      }
    }

    strapi.log.info('Permissions configured for Public and Authenticated roles');
  },
};
