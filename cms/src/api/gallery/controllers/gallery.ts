import { factories } from '@strapi/strapi';

// Common populate fields reused across handlers
const POPULATE = { images: true, featuredImages: true } as const;

export default factories.createCoreController('api::gallery.gallery', ({ strapi }) => ({
  // Get gallery
  async find(ctx) {
    try {
      // Single-type gallery: find the single document (if any) and return it.
      const entities = await strapi.documents('api::gallery.gallery').findMany({
        populate: POPULATE,
        limit: 1,
      });

      if (!entities || entities.length === 0) {
        return ctx.notFound('Gallery not found');
      }

      const sanitized = await this.sanitizeOutput(entities[0], ctx);
      return this.transformResponse(sanitized);
    } catch (error) {
      ctx.throw(500, `Error fetching gallery: ${error.message}`);
    }
  },

  // Update gallery
  async update(ctx) {
    try {
      // Find the existing single document first so we can update it by id
      const entities = await strapi.documents('api::gallery.gallery').findMany({ limit: 1 });
      if (!entities || entities.length === 0) {
        return ctx.notFound('Gallery not found');
      }

      const documentId = (entities[0] as any).id;

      const entity = await strapi.documents('api::gallery.gallery').update({
        documentId,
        data: ctx.request.body.data,
        populate: POPULATE,
      });

      const sanitized = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitized);
    } catch (error) {
      ctx.throw(500, `Error updating gallery: ${error.message}`);
    }
  },
}));
