import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema({
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
    withdrawal:{
        type:Number,
        required:true,
        
    },
},{timestamps:true})
const Withdrawal = mongoose.model('Withdrawal',withdrawalSchema)
export default  Withdrawal;