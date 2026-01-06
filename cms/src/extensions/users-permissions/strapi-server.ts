/**
 * Extension for users-permissions plugin
 * Fixes route reading issue in admin panel (#25084)
 * 
 * Problem: getRoutes() fails when route.info is undefined
 * Solution: Override getRoutes method with safe version
 */

import _ from 'lodash';
import urlJoin from 'url-join';

export default (plugin) => {
  console.log('🔧 [Extension] users-permissions extension loading...');
  
  // Store original service factory
  const originalServiceFactory = plugin.services['users-permissions'];
  
  // Replace service factory with wrapper that patches getRoutes
  plugin.services['users-permissions'] = ({ strapi }) => {
    // Call original factory to get service instance
    const service = originalServiceFactory({ strapi });
    
    // Store original getRoutes
    const originalGetRoutes = service.getRoutes;
    
    // Override getRoutes with safe version
    service.getRoutes = async function() {
      console.log('🔧 [Extension] Custom getRoutes called!');
      const routesMap = {};
      const { sanitizeRoutesMapForSerialization } = require('@strapi/utils');

      // Process API routes
      _.forEach(strapi.apis, (api, apiName) => {
        const routes = _.flatMap(api.routes, (route) => {
          if (_.has(route, 'routes')) {
            return route.routes;
          }
          return route;
        }).filter((route) => {
          // FIX: Safely check if route.info and route.info.type exist
          return route?.info?.type === 'content-api';
        });

        if (routes.length === 0) {
          return;
        }

        const apiPrefix = strapi.config.get('api.rest.prefix');
        routesMap[`api::${apiName}`] = routes.map((route) => ({
          ...route,
          path: urlJoin(apiPrefix, route.path),
        }));
      });

      // Process plugin routes
      _.forEach(strapi.plugins, (plugin, pluginName) => {
        const routes = _.flatMap(plugin.routes, (route) => {
          if (_.has(route, 'routes')) {
            return route.routes;
          }
          return route;
        }).filter((route) => {
          // FIX: Safely check if route.info and route.info.type exist
          return route?.info?.type === 'content-api';
        });

        if (routes.length === 0) {
          return;
        }

        const apiPrefix = strapi.config.get('api.rest.prefix');
        routesMap[`plugin::${pluginName}`] = routes.map((route) => ({
          ...route,
          path: urlJoin(apiPrefix, plugin.config('routes.prefix') || '', route.path),
        }));
      });

      const sanitizedRoutesMap = sanitizeRoutesMapForSerialization(routesMap);
      console.log('✅ [Extension] getRoutes completed successfully');
      return sanitizedRoutesMap;
    };
    
    return service;
  };

  console.log('✅ [Extension] users-permissions service patched');
  return plugin;
};
