export default ({ env }) => {
  // Supported clients in Strapi v5: mysql2, postgres, better-sqlite3.
  // Legacy `mysql`/`sqlite` clients were removed — they may not work in v5.
  const dbClient = env('DATABASE_CLIENT');

  // Sensible defaults so the app starts even if optional pool env vars are
  // missing. Without these, env.int() returns undefined → NaN → startup crash.
  const POOL_MIN = env.int('DATABASE_POOL_MIN', 2);
  const POOL_MAX = env.int('DATABASE_POOL_MAX', 10);
  const CONN_TIMEOUT = env.int('DATABASE_CONNECTION_TIMEOUT', 60000);
  const SSL_REJECT_UNAUTHORIZED = env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false);

  const connections = {
    mysql2: {
      client: 'mysql',
      connection: {
        ...(env('DATABASE_URL')
          ? { connectionString: env('DATABASE_URL') }
          : {
              host: env('DATABASE_HOST'),
              port: env.int('DATABASE_PORT'),
              database: env('DATABASE_NAME'),
              user: env('DATABASE_USERNAME'),
              password: env('DATABASE_PASSWORD'),
            }),
        ssl: env.bool('DATABASE_SSL', false)
          ? {
              rejectUnauthorized: SSL_REJECT_UNAUTHORIZED,
            }
          : false,
      },
      pool: {
        min: POOL_MIN,
        max: POOL_MAX,
      },
      acquireConnectionTimeout: CONN_TIMEOUT,
      useNullAsDefault: true,
    },
    postgres: {
      client: 'postgres',
      connection: {
        ...(env('DATABASE_URL')
          ? { connectionString: env('DATABASE_URL') }
          : {
              host: env('DATABASE_HOST'),
              port: env.int('DATABASE_PORT'),
              database: env('DATABASE_NAME'),
              user: env('DATABASE_USERNAME'),
              password: env('DATABASE_PASSWORD'),
              schema: env('DATABASE_SCHEMA'),
            }),
        ssl: env.bool('DATABASE_SSL', false)
          ? {
              rejectUnauthorized: SSL_REJECT_UNAUTHORIZED,
            }
          : false,
      },
      pool: {
        min: POOL_MIN,
        max: POOL_MAX,
      },
      acquireConnectionTimeout: CONN_TIMEOUT,
    },
    'better-sqlite3': {
      client: 'better-sqlite3',
      connection: {
        filename: env('DATABASE_FILENAME'),
      },
      useNullAsDefault: true,
      acquireConnectionTimeout: CONN_TIMEOUT,
    },
  };

  const selectedConfig = connections[dbClient];

  if (!selectedConfig) {
    throw new Error(
      `Unknown database client: ${dbClient}. Supported in Strapi v5: mysql2, postgres, better-sqlite3`,
    );
  }

  return {
    connection: selectedConfig,
  };
};
