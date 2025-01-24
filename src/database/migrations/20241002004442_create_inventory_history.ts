import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('inventory_history', (t) => {
    t.bigIncrements();
    t.bigInteger('product_id')
      .references('id')
      .inTable('products')
      .notNullable();
    t.bigInteger('user_id').references('id').inTable('users').notNullable();
    t.float('product_amount');
    t.float('current_product_amount');
    t.string('ingresed_product_date');
    t.float('current_cash');
    t.timestamps(true, true);
    t.boolean('is_inactive').notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('inventory_history');
}
