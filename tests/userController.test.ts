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

describe('User Controller', () => {
  it('should create a user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'ilori emmanuel',
        email: 'emmanuel.sw@gmail.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'ilori emmanuel');
  });
});
