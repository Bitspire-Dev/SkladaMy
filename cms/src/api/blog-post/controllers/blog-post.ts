import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::blog-post.blog-post', ({ strapi }) => ({
  // Override find method to support better querying
  async find(ctx: any) {
    return await super.find(ctx);
  },
  
  // Override findOne to support slug-based lookup
  async findOne(ctx: any) {
    const { id } = ctx.params;
    
    // Check if id is actually a slug (contains non-numeric characters)
    if (isNaN(Number(id))) {
      const entity = await strapi.documents('api::blog-post.blog-post').findMany({
        filters: { slug: id },
        ...ctx.query,
      });
      
      if (!entity || entity.length === 0) {
        return ctx.notFound('Blog post not found');
      }
      
      const sanitizedEntity = await this.sanitizeOutput(entity[0], ctx);
      return this.transformResponse(sanitizedEntity);
    }
    
    // Default behavior for numeric IDs
    return await super.findOne(ctx);
  },
  
  // Override create to validate featured image has alt text
  async create(ctx: any) {
    const { data } = ctx.request.body;
    
    // Validate featuredImage has alternativeText for SEO
    if (data?.featuredImage) {
      // If it's an ID, fetch the image to check alt text
      if (typeof data.featuredImage === 'number') {
        const image = await strapi.plugins.upload.services.upload.findOne(data.featuredImage);
        if (image && !image.alternativeText) {
          return ctx.badRequest('Featured image must have alternative text (alt text) for SEO purposes.');
        }
      }
    }
    
    return await super.create(ctx);
  },
  
  // Override update to validate featured image has alt text
  async update(ctx: any) {
    const { data } = ctx.request.body;
    
    // Validate featuredImage has alternativeText for SEO
    if (data?.featuredImage) {
      // If it's an ID, fetch the image to check alt text
      if (typeof data.featuredImage === 'number') {
        const image = await strapi.plugins.upload.services.upload.findOne(data.featuredImage);
        if (image && !image.alternativeText) {
          return ctx.badRequest('Featured image must have alternative text (alt text) for SEO purposes.');
        }
      }
    }
    
    return await super.update(ctx);
  },
}));
