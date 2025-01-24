import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('expenses', (t) => {
    t.string('expense_date');
    t.string('expense_hour');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('expenses', (t) => {
    t.dropColumn('expense_date');
    t.dropColumn('expense_hour');
  });
}
