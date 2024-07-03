import { Request, Response } from 'express';
import knex from '../config/knex';

// Function to create a wallet
export const createWallet = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    
    if (typeof userId === 'undefined') {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const wallet = await knex('wallets').insert({ userId, balance: 0 }).returning('*');
    return res.status(201).json(wallet);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Function to fund a wallet
export const fundWallet = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;

  try {
    if (typeof userId === 'undefined' || typeof amount === 'undefined') {
      return res.status(400).json({ message: 'User ID and amount are required' });
    }

    const wallet = await knex('wallets').where({ userId }).increment('balance', amount).returning('*');
    return res.status(200).json(wallet);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Function to transfer funds
export const transferFunds = async (req: Request, res: Response) => {
  const { fromUserId, toUserId, amount } = req.body;

  try {
    // Ensure fromUserId, toUserId, and amount are not undefined
    if (typeof fromUserId === 'undefined' || typeof toUserId === 'undefined' || typeof amount === 'undefined') {
      return res.status(400).json({ message: 'From User ID, To User ID, and amount are required' });
    }

    await knex.transaction(async trx => {
      await trx('wallets').where({ userId: fromUserId }).decrement('balance', amount);
      await trx('wallets').where({ userId: toUserId }).increment('balance', amount);
    });

    return res.status(200).json({ message: 'Transfer successful' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Function to withdraw funds
export const withdrawFunds = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;

  try {
    
    if (typeof userId === 'undefined' || typeof amount === 'undefined') {
      return res.status(400).json({ message: 'User ID and amount are required' });
    }

    const wallet = await knex('wallets').where({ userId }).decrement('balance', amount).returning('*');
    return res.status(200).json(wallet);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
