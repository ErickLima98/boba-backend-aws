import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('expenses', (t) => {
    t.bigInteger('franchise_id').alter();
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('expenses', (t) => {
    t.bigInteger('franchise_id').notNullable().alter();
  });
}
