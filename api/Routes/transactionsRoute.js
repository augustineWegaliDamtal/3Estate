import express from 'express';
import { deposit, getDeposite, getWithdrawals, withdrawals,  } from '../controllers/tranctionsController.js';

const router = express.Router();

router.post('/deposit',deposit)
router.get('/getDeposit',getDeposite)
router.post('/withdrawal',withdrawals)
router.get('/getwithdrawal',getWithdrawals)

export default router