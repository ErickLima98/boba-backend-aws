import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('products', (t) => {
    t.float('amount').notNullable().alter();
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('products', (t) => {
    t.integer('amount').notNullable().alter();
  });
}
