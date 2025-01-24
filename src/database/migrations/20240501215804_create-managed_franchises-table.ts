import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('managed_franchises', (t) => {
    t.bigIncrements();
    t.string('role').notNullable();
    t.bigInteger('user_id')
      .references('id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE');
    t.text('permissions');
    t.bigInteger('franchise_id')
      .references('id')
      .inTable('franchises')
      .onDelete('CASCADE');
    t.timestamps(true, true);
    t.boolean('is_inactive').notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('managed_franchises');
}
