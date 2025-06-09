import express from 'express';
import { Google, Signin, signOut, Signup } from '../controllers/authController.js';

const router = express();

router.post('/signup',Signup)
router.post('/signin',Signin)
router.post('/google',Google)
router.post('/signout',signOut)
export default router