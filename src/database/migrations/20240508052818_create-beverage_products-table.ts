import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('beverage_products', (t) => {
    t.bigIncrements();
    t.bigInteger('beverage_id')
      .references('id')
      .inTable('beverages')
      .notNullable()
      .onDelete('CASCADE');
    t.bigInteger('product_id')
      .references('id')
      .inTable('products')
      .notNullable()
      .onDelete('CASCADE');
    t.float('used_amount').notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('beverage_products');
}
