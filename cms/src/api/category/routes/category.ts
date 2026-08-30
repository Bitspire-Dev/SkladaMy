/**
 * category router
 */
import { factories } from '@strapi/core';

export default factories.createCoreRouter('api::category.category', {
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
