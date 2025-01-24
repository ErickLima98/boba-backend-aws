import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('foods', (t) => {
    t.bigIncrements();
    t.string('name').notNullable();
    t.string('code').notNullable().unique();
    t.float('price').notNullable();
    t.timestamps(true, true);
    t.boolean('is_inactive').notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('foods');
}
