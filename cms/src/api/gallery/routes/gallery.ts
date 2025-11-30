export default {
  routes: [
    {
      method: 'GET',
      path: '/gallery',
      handler: 'gallery.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/gallery',
      handler: 'gallery.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
