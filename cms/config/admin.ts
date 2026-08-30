import path from 'path';

export default ({ env }) => ({
  // Build admina trafia do dist/build — spójne z distDir: './dist' w server.js
  // i outDir: 'dist' w tsconfig.json. Po `npm run build && npm start` admin
  // jest dostępny pod /admin.
  buildPath: path.join(__dirname, '..', 'dist', 'build'),
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    // Session configuration for persistent login
    session: {
      keys: env.array('APP_KEYS'),
      maxAge: 86400000, // 24 hours
    },
    // Cookie configuration. sameSite:'none' requires secure:true (HTTPS) and
    // is only needed for cross-origin admin. Default to 'lax' which works in
    // most setups; set COOKIE_SAMESITE=none + SECURE_COOKIES=true only when the
    // admin is served from a different origin than the API over HTTPS.
    cookie: {
      secure: env.bool('SECURE_COOKIES', env('NODE_ENV') === 'production'),
      sameSite: env('COOKIE_SAMESITE', env('NODE_ENV') === 'production' ? 'lax' : 'lax'),
      httpOnly: true,
      maxAge: 86400000, // 24 hours
      domain: undefined, // Let browser determine domain
      // Ważne: gdy za reverse proxy, Strapi musi ufać X-Forwarded-Proto
      secureProxy: env.bool('TRUST_PROXY', false),
    },
    // Events handlers for authentication
    events: {
      onConnectionSuccess(e, _provider) {
        // e = { user, provider }
        console.log('✅ Admin login successful:', e?.user?.email || 'unknown user');
      },
      onConnectionError(_e, error, _provider) {
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
