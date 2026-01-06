import path from 'path';

export default ({ env }) => ({
  // Jawnie ustaw ścieżkę do buildu
  buildPath: path.join(__dirname, '..', 'build'),
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    // Session configuration for persistent login
    session: {
      keys: env.array('APP_KEYS'),
      maxAge: 86400000, // 24 hours
    },
    // Cookie configuration for production behind reverse proxy/Cloudflare
    cookie: {
      secure: env('NODE_ENV') === 'production', // true in production with HTTPS
      sameSite: env('NODE_ENV') === 'production' ? 'none' : 'lax', // 'none' for cross-origin in production
      httpOnly: true,
      maxAge: 86400000, // 24 hours
      domain: undefined, // Let browser determine domain
      // Ważne: gdy za reverse proxy, Strapi musi ufać X-Forwarded-Proto
      secureProxy: env('NODE_ENV') === 'production' && env.bool('TRUST_PROXY', false),
    },
    // Events handlers for authentication
    events: {
      onConnectionSuccess(e, provider) {
        // e = { user, provider }
        console.log('✅ Admin login successful:', e?.user?.email || 'unknown user');
      },
      onConnectionError(e, error, provider) {
        console.error('❌ Admin login failed:', error?.message || error);
      },
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
  // Rate limiting configuration (adjusted for production)
  rateLimit: {
    enabled: true,
    interval: { min: 5 }, // Time window: 5 minutes
    max: 20, // Increased from default 5 to 20 attempts
    delayAfter: 10, // Start delaying after 10 attempts (instead of 1)
    timeWait: 3000, // 3 second delay
    whitelist: [],
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
