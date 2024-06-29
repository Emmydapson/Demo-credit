import knex from '../config/knex';

interface Transaction {
  id?: number;
  wallet_id: number;
  amount: number;
  type: 'fund' | 'transfer' | 'withdraw';
  recipient_wallet_id?: number;
}

class TransactionModel {
  static async create(transaction: Transaction): Promise<Transaction> {
    const [createdTransaction] = await knex('transactions').insert(transaction).returning('*');
    return createdTransaction;
  }

  static async findByWalletId(wallet_id: number): Promise<Transaction[]> {
    return await knex('transactions').where({ wallet_id });
  }
}

export default TransactionModel;
