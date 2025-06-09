import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authRouter from './Routes/authRoute.js';
import cookieParser from 'cookie-parser'
import userRouter from './Routes/userRoute.js';
dotenv.config()

mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log('connected to db')
})
const app = express();
app.use(cookieParser())
app.use(express.json())
app.listen(3000,()=>{
    console.log('listening on port 3000')
})
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal error 1'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message

    })
})