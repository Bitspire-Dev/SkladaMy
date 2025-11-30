export default {
  routes: [
    {
      method: 'GET',
      path: '/blog-posts',
      handler: 'blog-post.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/blog-posts',
      handler: 'blog-post.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/blog-posts/:id',
      handler: 'blog-post.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    // Additional route for slug-based access (alternative approach)
    {
      method: 'GET', 
      path: '/blog-posts/slug/:slug',
      handler: 'blog-post.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
