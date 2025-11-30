'use strict';

/**
 * contact router
 */

import { factories } from '@strapi/strapi';

const defaultRouter = factories.createCoreRouter('api::contact.contact');

const customRouter = (innerRouter: any, extraRoutes: any[] = []) => {
  let routes: any[];
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes.concat(extraRoutes);
      return routes;
    },
  };
};

const myExtraRoutes = [
  {
    method: 'PUT',
    path: '/contacts/:id/mark-as-read',
    handler: 'api::contact.contact.markAsRead',
  },
  {
    method: 'PUT',
    path: '/contacts/:id/status',
    handler: 'api::contact.contact.updateStatus',
  },
  {
    method: 'GET',
    path: '/contacts/stats',
    handler: 'api::contact.contact.getStats',
  }
];

export default customRouter(defaultRouter, myExtraRoutes);
