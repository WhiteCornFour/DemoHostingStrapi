import path from 'path';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'mysql'); // bắt buộc mysql nếu dùng Railway

  const connections = {
    mysql: {
      connection: {
        host: env('DATABASE_HOST'),       // từ .env
        port: env.int('DATABASE_PORT'),   // từ .env, ví dụ 35579
        database: env('DATABASE_NAME'),
        user: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        ssl: {
          rejectUnauthorized: false,     // cho phép self-signed certificate
        },
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
    },

    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          '..',
          '..',
          env('DATABASE_FILENAME', '.tmp/data.db')
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
