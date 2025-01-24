import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('beverage_pre_orders', (t) => {
    t.bigIncrements();
    t.bigInteger('beverage_id')
      .references('id')
      .inTable('beverages')
      .notNullable()
      .onDelete('CASCADE');
    t.integer('sugar_level').notNullable().defaultTo(0);
    t.string('beverage_size').notNullable().defaultTo('medium');
    t.integer('amount').notNullable();
    t.boolean('extra_boba');
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
  return knex.schema.dropTable('beverage_pre_orders');
}
