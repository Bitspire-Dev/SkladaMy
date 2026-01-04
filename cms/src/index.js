"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    register( /* { strapi } */) { },
    async bootstrap({ strapi }) {
        // Set up public permissions for API endpoints
        const publicRole = await strapi
            .query('plugin::users-permissions.role')
            .findOne({ where: { type: 'public' } });
        if (!publicRole) {
            console.warn('⚠️  Public role not found');
            return;
        }
        // Define public permissions for each content type
        const publicPermissions = {
            'api::blog-post.blog-post': ['find', 'findOne'],
            'api::category.category': ['find', 'findOne'],
            'api::tag.tag': ['find', 'findOne'],
            'api::gallery.gallery': ['find'],
        };
        console.log('🔧 Setting up public permissions...');
        for (const [contentType, actions] of Object.entries(publicPermissions)) {
            for (const action of actions) {
                // Check if permission already exists
                const existingPermission = await strapi
                    .query('plugin::users-permissions.permission')
                    .findOne({
                    where: {
                        action: `${contentType}.${action}`,
                        role: publicRole.id,
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
                }
                else if (!existingPermission) {
                    // Create new permission
                    await strapi.query('plugin::users-permissions.permission').create({
                        data: {
                            action: `${contentType}.${action}`,
                            role: publicRole.id,
                            enabled: true,
                        },
                    });
                    console.log(`✅ Created: ${contentType}.${action}`);
                }
                else {
                    console.log(`ℹ️  Already enabled: ${contentType}.${action}`);
                }
            }
        }
        console.log('✅ Public permissions configured');
    },
};
