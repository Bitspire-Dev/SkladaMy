export default ({ env }) => {
  // Get database client from env (mysql2 or mysql use 'mysql' dialect in Knex)
  const dbClient = env('DATABASE_CLIENT');
  
  console.log('🔧 [DATABASE] Client:', dbClient);
  
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

  // Return proper database configuration for Strapi
  // Strapi expects: { connection: { client, connection: {...}, pool: {...} } }
  const selectedConfig = connections[dbClient];
  
  if (!selectedConfig) {
    console.error('❌ [DATABASE] Unknown client:', dbClient);
    throw new Error(`Unknown database client: ${dbClient}. Supported: mysql, mysql2, postgres, sqlite`);
  }

  console.log('✅ [DATABASE] Config selected:', dbClient);

  return {
    connection: selectedConfig,
  };
};
