/**
 * tag router
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::tag.tag', {
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    },
    findOne: {
      auth: false,
      policies: [],
      middlewares: [],
    },
  },
});
