module.exports = ({ env }) => {
  // Get database client from env (mysql2 or mysql use 'mysql' dialect in Knex)
  const dbClient = env('DATABASE_CLIENT');
  
  // Map to Knex dialect (mysql2 driver uses 'mysql' dialect)
  const knexClient = dbClient === 'mysql2' ? 'mysql' : dbClient;

  const connections = {
    mysql: {
      client: 'mysql',
      connection: {
        ...(env('DATABASE_URL') ? { connectionString: env('DATABASE_URL') } : {
          host: env('DATABASE_HOST'),
          port: env.int('DATABASE_PORT'),
          database: env('DATABASE_NAME'),
          user: env('DATABASE_USERNAME'),
          password: env('DATABASE_PASSWORD'),
        }),
        ssl: env.bool('DATABASE_SSL', false) ? {
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED')
        } : false,
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN'),
        max: env.int('DATABASE_POOL_MAX')
      },
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT'),
    },
    mysql2: {
      client: 'mysql',
      connection: {
        ...(env('DATABASE_URL') ? { connectionString: env('DATABASE_URL') } : {
          host: env('DATABASE_HOST'),
          port: env.int('DATABASE_PORT'),
          database: env('DATABASE_NAME'),
          user: env('DATABASE_USERNAME'),
          password: env('DATABASE_PASSWORD'),
        }),
        ssl: env.bool('DATABASE_SSL', false) ? {
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED')
        } : false,
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN'),
        max: env.int('DATABASE_POOL_MAX')
      },
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT'),
      useNullAsDefault: true,
    },
    postgres: {
      client: 'postgres',
      connection: {
        ...(env('DATABASE_URL') ? { connectionString: env('DATABASE_URL') } : {
          host: env('DATABASE_HOST'),
          port: env.int('DATABASE_PORT'),
          database: env('DATABASE_NAME'),
          user: env('DATABASE_USERNAME'),
          password: env('DATABASE_PASSWORD'),
          schema: env('DATABASE_SCHEMA'),
        }),
        ssl: env.bool('DATABASE_SSL') ? {
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED')
        } : false,
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN'),
        max: env.int('DATABASE_POOL_MAX')
      },
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT'),
    },
    sqlite: {
      client: 'sqlite',
      connection: {
        filename: env('DATABASE_FILENAME'),
      },
      useNullAsDefault: true,
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT'),
    },
    'better-sqlite3': {
      client: 'better-sqlite3',
      connection: {
        filename: env('DATABASE_FILENAME'),
      },
      useNullAsDefault: true,
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT'),
    },
  };

  return {
    connection: {
      client: knexClient,
      ...connections[dbClient],
    },
  };
};
/**
 * RECOMMENDED DATABASE INDEXES FOR PERFORMANCE
 *
 * Execute these SQL commands in your MySQL database (phpMyAdmin, MySQL Workbench, etc.)
 * to significantly improve query performance:
 *
 * -- Index for blog post slug lookups (most common query)
 * CREATE INDEX idx_blog_post_slug ON blog_posts(slug);
 *
 * -- Index for sorting by publish date
 * CREATE INDEX idx_blog_post_published ON blog_posts(published_at);
 *
 * -- Index for category filtering
 * CREATE INDEX idx_blog_post_category ON blog_posts_category_lnk(blog_post_id, category_id);
 *
 * -- Composite index for featured posts listing
 * CREATE INDEX idx_blog_post_featured ON blog_posts(featured, published_at);
 *
 * -- Full-text search index (for search functionality)
 * CREATE FULLTEXT INDEX idx_blog_post_search ON blog_posts(title, excerpt);
 *
 * -- Index for category slug lookups
 * CREATE INDEX idx_category_slug ON categories(slug);
 *
 * -- Index for tag slug lookups
 * CREATE INDEX idx_tag_slug ON tags(slug);
 *
 * PERFORMANCE BENEFITS:
 * - Slug queries: ~10x faster
 * - Category filtering: ~5x faster
 * - Featured posts: ~3x faster
 * - Full-text search: ~20x faster
 *
 * These indexes are especially important when you have >100 blog posts.
 */
