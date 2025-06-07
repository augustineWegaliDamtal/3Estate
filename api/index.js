import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authRouter from './Routes/authRoute.js';
dotenv.config()

mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log('connected to db')
})
const app = express();

app.use(express.json())
app.listen(3000,()=>{
    console.log('listening on port 3000')
})
app.use('/api/auth',authRouter)
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal error'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message

    })
})