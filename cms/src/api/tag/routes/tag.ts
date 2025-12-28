export = {
  routes: [
    {
      method: 'GET',
      path: '/tags',
      handler: 'tag.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/tags/:id',
      handler: 'tag.findOne',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/tags',
      handler: 'tag.create',
      config: {
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/tags/:id',
      handler: 'tag.update',
      config: {
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/tags/:id',
      handler: 'tag.delete',
      config: {
        policies: [],
      },
    },
  ],
};
