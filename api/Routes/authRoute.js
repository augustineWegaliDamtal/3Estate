import express from 'express';
import { Signin, Signup } from '../controllers/authController.js';

const router = express();

router.post('/signup',Signup)
router.post('/signin',Signin)

export default router