"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * tag router
 */
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreRouter('api::tag.tag', {
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
