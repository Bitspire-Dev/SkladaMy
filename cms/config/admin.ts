export = ({ env }: any) => ({
  auth: { 
    secret: env('ADMIN_JWT_SECRET'),
    sessions: {
      // New Strapi v6 API (v5 compatible)
      maxSessionLifespan: env.int('ADMIN_SESSION_LIFETIME', 7 * 24 * 60 * 60 * 1000), // 7 days
      maxRefreshTokenLifespan: env.int('ADMIN_REFRESH_TOKEN_LIFETIME', 30 * 24 * 60 * 60 * 1000), // 30 days
    }
  },
  apiToken: { salt: env('API_TOKEN_SALT') },
  transfer: { token: { salt: env('TRANSFER_TOKEN_SALT') } },
  secrets: { encryptionKey: env('ENCRYPTION_KEY') },
  flags: { nps: env.bool('FLAG_NPS', true), promoteEE: env.bool('FLAG_PROMOTE_EE', true) },
  locales: ['pl', 'en'],
  telemetryDisabled: true,
});
