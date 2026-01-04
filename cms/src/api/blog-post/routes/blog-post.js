"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * blog-post router
 */
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreRouter('api::blog-post.blog-post', {
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
