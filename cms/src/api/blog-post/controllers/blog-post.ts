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
}));
