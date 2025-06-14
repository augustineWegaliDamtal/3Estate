import express from 'express';
import { deposit, getDeposite } from '../controllers/tranctionsController.js';

const router = express.Router();

router.post('/deposit',deposit)
router.post('/withdraw',deposit)
router.get('/getDeposit',getDeposite)
export default router