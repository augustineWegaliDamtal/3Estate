import express from 'express';
import { deposit } from '../controllers/tranctionsController.js';

const router = express.Router();

router.post('/deposit',deposit)
export default router