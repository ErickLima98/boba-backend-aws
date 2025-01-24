import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('beverages', (t) => {
    t.json('recipe');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('beverages', (t) => {
    t.dropColumn('recipe');
  });
}
