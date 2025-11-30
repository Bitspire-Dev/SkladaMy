"use strict";
module.exports = ({ env }) => ({
    connection: {
        client: 'sqlite',
        connection: {
            filename: env('DATABASE_FILENAME', '.tmp/data.db'),
        },
        useNullAsDefault: true,
        acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
});
