import { Router } from 'express';
import { fundWallet, transferFunds, withdrawFunds } from '../controllers/walletControllers';

const router = Router();

router.post('/wallets/fund', fundWallet);
router.post('/wallets/transfer', transferFunds);
router.post('/wallets/withdraw', withdrawFunds);

export default router;
