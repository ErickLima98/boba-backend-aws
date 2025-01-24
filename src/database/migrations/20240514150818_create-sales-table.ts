import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('sales', (t) => {
    t.bigIncrements();
    t.float('total').notNullable();
    t.boolean('is_cash').notNullable();
    t.bigInteger('user_id').references('id').inTable('users').notNullable();
    t.timestamps(true, true);
    t.boolean('is_inactive').notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('sales');
}
