import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary();
    table.integer('from_wallet_id').unsigned().references('id').inTable('wallets').onDelete('SET NULL');
    table.integer('to_wallet_id').unsigned().references('id').inTable('wallets').onDelete('SET NULL');
    table.decimal('amount', 14, 2).notNullable();
    table.enu('type', ['fund', 'transfer', 'withdrawal']).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('transactions');
}
