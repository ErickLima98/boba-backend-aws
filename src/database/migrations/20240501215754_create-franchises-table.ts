import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('franchises', (t) => {
    t.bigIncrements();
    t.string('name').notNullable();
    t.string('franchise_address').notNullable();
    t.timestamps(true, true);
    t.boolean('is_inactive').notNullable().defaultTo(false);
    t.bigInteger('owner_id')
      .references('id')
      .inTable('owners')
      .notNullable()
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('franchises');
}
