import knex from '../config/knex';

interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

class UserModel {
  static async create(user: User): Promise<User> {
    const [createdUser] = await knex('users').insert(user).returning('*');
    return createdUser;
  }

  static async findByEmail(email: string): Promise<User | undefined> {
    return await knex('users').where({ email }).first();
  }
}

export default UserModel;
