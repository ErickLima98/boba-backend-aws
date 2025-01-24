import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('beverage_products', (t) => {
    t.dropColumn('used_amount');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('beverage_products', (t) => {
    t.float('used_amount').notNullable();
  });
}
