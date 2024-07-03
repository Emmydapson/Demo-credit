import knex from '../src/config/knex';
import request from 'supertest';
import { app, server as appServer } from '../src/index';

let server: any;

const unlockMigrations = async () => {
  await knex.raw('SELECT RELEASE_LOCK("knex_migrations_lock")');
};

beforeAll(async () => {
  await unlockMigrations();
  await knex.migrate.rollback();
  await knex.migrate.latest();
  server = app.listen(3000);
});

afterAll(async () => {
  await unlockMigrations();
  await knex.migrate.rollback();
  await knex.destroy();
  if (server) {
    server.close();
  }
});

describe('Wallet Controller', () => {
  it('should fund a wallet', async () => {
    const res = await request(app)
      .post('/wallet/fund')
      .send({
        amount: 100,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Wallet funded successfully');
  });
});
