import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('transactions', (table) => {
        table.increments('id').primary();
        table.integer('wallet_id').unsigned().notNullable().references('id').inTable('wallets').onDelete('CASCADE');
        table.decimal('amount', 14, 2).notNullable();
        table.enum('type', ['fund', 'transfer', 'withdraw']).notNullable();
        table.integer('recipient_wallet_id').unsigned().references('id').inTable('wallets');
        table.timestamps(true, true);
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('transactions');
}

