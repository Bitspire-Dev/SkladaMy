module.exports = ({ env }) => ({
  host: env('HOST'),
  port: env.int('PORT'),
  url: env('PUBLIC_URL'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS'),
  },
  // Enable proxy in production (Apache/NGINX), disable in development
  proxy: env.bool(env('NODE_ENV') === 'production'),
});
