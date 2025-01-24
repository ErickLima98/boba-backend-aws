import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema;
}

export async function down(knex: Knex.Knex) {
  return knex.schema;
}
