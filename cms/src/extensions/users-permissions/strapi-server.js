/**
 * Extension for users-permissions plugin
 * Fixes route reading issue in admin panel (#25084)
 * 
 * Problem: getRoutes() fails when route.info is undefined
 * Solution: Override getRoutes method with safe version
 */

const _ = require('lodash');
const urlJoin = require('url-join');

module.exports = (plugin) => {
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
      _.forEach(strapi.plugins, (pluginData, pluginName) => {
        const transformPrefix = (route) => {
          const prefix = route.config && route.config.prefix;
          const path = prefix !== undefined ? `${prefix}${route.path}` : `/${pluginName}${route.path}`;

          return {
            ...route,
            path,
          };
        };

        const routes = _.flatMap(pluginData.routes, (route) => {
          if (_.has(route, 'routes')) {
            return route.routes.map(transformPrefix);
          }
          return transformPrefix(route);
        }).filter((route) => {
          // FIX: Safely check if route.info exists before accessing type
          return route?.info?.type === 'content-api';
        });

        if (routes.length === 0) {
          return;
        }

        const apiPrefix = strapi.config.get('api.rest.prefix');
        routesMap[`plugin::${pluginName}`] = routes.map((route) => ({
          ...route,
          path: urlJoin(apiPrefix, route.path),
        }));
      });

      console.log('🔧 [Extension] Routes processed successfully');
      return sanitizeRoutesMapForSerialization(routesMap);
    };
    
    console.log('🔧 [Extension] users-permissions service patched');
    return service;
  };

  return plugin;
};
