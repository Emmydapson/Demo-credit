import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('blacklist', (table) => {
    table.increments('id').primary();
    table.string('identity').notNullable().unique();
    table.enu('identity_type', ['BVN', 'phone', 'email']).notNullable();
    table.string('reason').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('blacklist');
}
