import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('products', (t) => {
    t.bigIncrements();
    t.string('name').notNullable();
    t.text('description');
    t.integer('amount').notNullable();
    t.integer('minimal_amount').notNullable();
    t.bigInteger('franchise_id')
      .references('id')
      .inTable('franchises')
      .notNullable()
      .onDelete('CASCADE');
    t.float('price').notNullable();
    t.timestamps(true, true);
    t.boolean('is_inactive').notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('products');
}
