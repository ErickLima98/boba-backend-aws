import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.table('users', (t) => {
    t.string('role').nullable();
    t.string('token', 512).nullable();
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.table('users', (t) => {
    t.dropColumn('role');
    t.dropColumn('token');
  });
}
