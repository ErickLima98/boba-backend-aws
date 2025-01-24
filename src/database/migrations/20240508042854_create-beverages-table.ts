import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('beverages', (t) => {
    t.bigIncrements();
    t.string('name').notNullable();
    t.string('code').notNullable().unique();
    t.float('medium_price').notNullable();
    t.float('large_price').notNullable();
    t.timestamps(true, true);
    t.boolean('is_inactive').notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('beverages');
}
