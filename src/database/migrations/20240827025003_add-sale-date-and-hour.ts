import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('sales', (t) => {
    t.string('sale_date');
    t.string('sale_hour');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('sales', (t) => {
    t.dropColumn('sale_date');
    t.dropColumn('sale_hour');
  });
}
