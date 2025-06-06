import bcryptjs from 'bcryptjs';
import User from '../models/userModel.js';

export const Signup = async(req,res,next)=>{
    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPassword});
    try {
        await newUser.save();
        res.status(200).json('user created')
    } catch (error) {
        
    }
}