/**
 * blog-post router
 */
import { factories } from '@strapi/core';

export default factories.createCoreRouter('api::blog-post.blog-post', {
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
