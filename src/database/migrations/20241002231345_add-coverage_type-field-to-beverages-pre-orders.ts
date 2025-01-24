import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('beverage_pre_orders', (t) => {
    t.string('coverage_type');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('beverage_pre_orders', (t) => {
    t.dropColumn('coverage_type');
  });
}
