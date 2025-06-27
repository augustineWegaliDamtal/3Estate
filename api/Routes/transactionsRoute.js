import express from 'express';
import { deleteTransactions,  deposit, getDeposite, getWithdrawals, withdrawals,  } from '../controllers/tranctionsController.js';

const router = express.Router();

router.post('/deposit',deposit)
router.get('/getDeposit',getDeposite)
router.post('/withdrawal',withdrawals)
router.get('/getwithdrawal',getWithdrawals)
router.delete('/deleteTransactions/:id',deleteTransactions)


export default router