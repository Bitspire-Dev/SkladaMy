/**
 * gallery router
 * Gallery is a singleType - only find and update
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::gallery.gallery', {
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    },
  },
});
