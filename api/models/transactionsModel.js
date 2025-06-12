import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema({
    agent:{
        type:Number,
        required:true,
        
    },
    customerId:{
        type:Number,
        required:true,
    },
    day:{
        type:Number,
        required:true,
    },
    month:{
        type:Number,
        required:true,
    },
    year:{
        type:Number,
        required:true,
    },
    deposit:{
        type:Number,
        required:true,
        
    },
},{timestamps:true})
const Transactions = mongoose.model('Transactons',transactionsSchema)
export default Transactions;