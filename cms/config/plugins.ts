export = ({ env }: any) => ({
  upload: {
    config: {
      providerOptions: {
        localServer: {
          maxage: 300000
        },
      },
      sizeLimit: 10 * 1024 * 1024, // 10MB max file size
      breakpoints: {
        large: 1200,     // Hero images, full-width content
        medium: 800,     // Standard content images
        small: 400,      // Thumbnails in lists
        thumbnail: 150,  // Tiny preview thumbs
      },
    },
  },
});
