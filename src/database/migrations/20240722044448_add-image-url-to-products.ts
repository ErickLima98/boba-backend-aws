import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('products', (t) => {
    t.text('url');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('products', (t) => {
    t.dropColumn('url');
  });
}
