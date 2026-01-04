"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * gallery router
 * Gallery is a singleType - only find and update
 */
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreRouter('api::gallery.gallery', {
    config: {
        find: {
            auth: false,
            policies: [],
            middlewares: [],
        },
    },
});
