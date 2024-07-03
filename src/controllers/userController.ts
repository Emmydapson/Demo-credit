import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../models/User';
import BlacklistModel from '../models/Blacklist';

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const isBlacklisted = await BlacklistModel.isBlacklisted(email);
    if (isBlacklisted) {
      return res.status(403).json({ message: 'User is blacklisted' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password: hashedPassword });

    return res.status(201).json(user);
  } catch (error: any) {  // Cast error to any
    return res.status(500).json({ error: error.message });
  }
};
