export default ({ env }) => ({
  upload: {
    config: {
      providerOptions: {
        localServer: {
          maxage: 300000,
        },
      },
      // Max upload size from env (bytes), default 10MB. Matches MAX_FILE_SIZE
      // documented in .env.example.
      sizeLimit: env.int('MAX_FILE_SIZE', 10 * 1024 * 1024),
      breakpoints: {
        large: 1200, // Hero images, full-width content
        medium: 800, // Standard content images
        small: 400, // Thumbnails in lists
        thumbnail: 150, // Tiny preview thumbs
      },
    },
  },
  'users-permissions': {
    enabled: true,
    config: {
      // Use a dedicated JWT secret from env so all nodes share the same signing
      // key in a multi-node deployment. Falls back to Strapi's default if unset.
      ...(env('JWT_SECRET') ? { jwtSecret: env('JWT_SECRET') } : {}),
      register: {
        allowedFields: ['username', 'email', 'password'],
      },
    },
  },
});
