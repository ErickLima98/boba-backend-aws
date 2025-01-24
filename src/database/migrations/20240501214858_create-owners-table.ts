import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('owners', (t) => {
    t.bigIncrements();
    t.string('full_name').notNullable();
    t.string('address');
    t.string('phone_number');
    t.string('email');
    t.string('password').notNullable();
    t.timestamps(true, true);
    t.boolean('is_inactive').notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('owners');
}
