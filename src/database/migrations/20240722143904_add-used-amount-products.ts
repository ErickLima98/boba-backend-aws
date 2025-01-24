import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('products', (t) => {
    t.float('used_amount').notNullable();
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('products', (t) => {
    t.dropColumn('used_amount');
  });
}
