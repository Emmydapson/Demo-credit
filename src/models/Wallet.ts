import knex from '../config/knex';

interface Wallet {
  id?: number;
  user_id: number;
  balance: number;
}

class WalletModel {
  static async create(wallet: Wallet): Promise<Wallet> {
    const [createdWallet] = await knex('wallets').insert(wallet).returning('*');
    return createdWallet;
  }

  static async findByUserId(user_id: number): Promise<Wallet | undefined> {
    return await knex('wallets').where({ user_id }).first();
  }

  static async updateBalance(id: number, amount: number): Promise<void> {
    await knex('wallets').where({ id }).increment('balance', amount);
  }
}

export default WalletModel;
