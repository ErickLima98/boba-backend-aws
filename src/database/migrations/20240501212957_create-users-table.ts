import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('users', (t) => {
    t.bigIncrements();
    t.string('full_name').notNullable();
    t.string('email').notNullable();
    t.string('password').notNullable();
    t.timestamps(true, true);
    t.timestamp('last_login_at');
    t.integer('login_count');
    t.timestamp('logged_out_at');
    t.boolean('is_inactive').notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('users');
}
