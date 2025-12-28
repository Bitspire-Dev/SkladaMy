export = {
  routes: [
    {
      method: 'GET',
      path: '/categories',
      handler: 'category.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/categories/:id',
      handler: 'category.findOne',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/categories',
      handler: 'category.create',
      config: {
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/categories/:id',
      handler: 'category.update',
      config: {
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/categories/:id',
      handler: 'category.delete',
      config: {
        policies: [],
      },
    },
  ],
};
