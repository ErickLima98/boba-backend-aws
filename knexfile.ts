import * as dotenv from 'dotenv';
import * as Knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';

dotenv.config();

const connectionString = process.env.DB_STRING;
const commonConfig = {
  client: process.env.DB_PROVIDER,
  migrations: {
    directory: './src/database/migrations',
    stub: './src/database/stubs/migrations.stub.ts',
    extension: 'ts',
  },
  seeds: {
    directory: './src/database/seeds',
    stub: './src/database/stubs/seed.stub.ts',
    extension: 'ts',
  },
  connection: {
    connectionString: connectionString,
    ssl: {
      ca: process.env.DB_SSL_CA,
      rejectUnauthorized: false,
    },
  },
  ...knexSnakeCaseMappers(),
};

module.exports = {
  development: {
    ...commonConfig,
  },
  production: {
    ...commonConfig,
  },
} as Knex.Knex.Config;
