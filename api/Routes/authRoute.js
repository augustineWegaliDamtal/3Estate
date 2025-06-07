import express from 'express';
import { Google, Signin, Signup } from '../controllers/authController.js';

const router = express();

router.post('/signup',Signup)
router.post('/signin',Signin)
router.post('/google',Google)
export default router