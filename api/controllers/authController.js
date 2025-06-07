import bcryptjs from 'bcryptjs';
import User from '../models/userModel.js';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'
export const Signup = async(req,res,next)=>{
    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPassword});
    try {
        await newUser.save();
        res.status(200).json('user created')
    } catch (error) {
        next(error)
    }
}
export const Signin = async(req,res,next)=>{
    const {email,password} = req.body;
    const validUser = await User.findOne({email});
    if(!validUser) return next(errorHandler(500,'wrong credentials'))
        const validPassword = bcryptjs.compareSync(password,validUser.password);
    if(!validPassword) return next(errorHandler(500,'wrong password'));
    const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
    const {password:pass,...rest} = validUser._doc;
    res
    .cookie('access_token',token,{httpOnly:true})
    .status(200)
    .json(rest)
}