import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('food_pre_orders', (t) => {
    t.bigIncrements();
    t.bigInteger('food_id')
      .references('id')
      .inTable('foods')
      .notNullable()
      .onDelete('CASCADE');
    t.integer('amount').notNullable();
    t.float('total').notNullable();
    t.bigInteger('sale_id')
      .references('id')
      .inTable('sales')
      .notNullable()
      .onDelete('CASCADE');
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('food_pre_orders');
}
