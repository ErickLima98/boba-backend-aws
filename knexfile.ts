import * as dotenv from 'dotenv';
import * as Knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';

dotenv.config();

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
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
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
