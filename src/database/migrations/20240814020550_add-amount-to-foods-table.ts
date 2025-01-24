import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('foods', (t) => {
    t.integer('amount');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('foods', (t) => {
    t.dropColumn('amount');
  });
}
