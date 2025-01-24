import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('users', (t) => {
    t.integer('login_count').defaultTo(0).alter();
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('users', (t) => {
    t.integer('login_count').alter();
  });
}
