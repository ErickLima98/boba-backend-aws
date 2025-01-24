import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('beverage_pre_orders', (t) => {
    t.text('description');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('beverage_pre_orders', (t) => {
    t.dropColumn('description');
  });
}
