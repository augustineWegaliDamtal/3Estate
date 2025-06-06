import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log('connected to db')
})
const app = express();

app.use(express.json())
app.listen(3000,()=>{
    console.log('listening on port 3000')
})