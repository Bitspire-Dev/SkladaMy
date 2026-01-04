module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    // Cookie configuration for production behind reverse proxy
    cookie: {
      secure: env('NODE_ENV') === 'production', // true in production with HTTPS
      sameSite: 'lax', // or 'none' if CORS issues persist
    },
  },
  // url removed - Strapi uses default /admin for both UI and API
  // If you need custom admin path, set it here (e.g., url: '/dashboard')
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
});
