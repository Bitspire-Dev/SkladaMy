export default ({ env }) => ({
  host: env('HOST'),
  port: env.int('PORT'),
  url: env('PUBLIC_URL'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS'),
  },
  // Strapi v5: `proxy.koa` controls Koa's `app.proxy`.
  proxy: {
    koa: env.bool('TRUST_PROXY', false),
  },
});
