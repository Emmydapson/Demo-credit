import knex from '../config/knex';

interface Blacklist {
  id?: number;
  email: string;
}

class BlacklistModel {
  static async isBlacklisted(email: string): Promise<boolean> {
    const user = await knex('blacklist').where({ email }).first();
    return !!user;
  }
}

export default BlacklistModel;
