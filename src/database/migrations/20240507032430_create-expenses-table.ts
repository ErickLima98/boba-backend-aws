import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('expenses', (t) => {
    t.bigIncrements();
    t.string('name').notNullable();
    t.text('description');
    t.integer('amount').notNullable();
    t.float('price').notNullable();
    t.bigInteger('franchise_id')
      .references('id')
      .inTable('franchises')
      .notNullable()
      .onDelete('CASCADE');
    t.boolean('is_variable').notNullable();
    t.boolean('is_inactive').notNullable().defaultTo(false);
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('expenses');
}
