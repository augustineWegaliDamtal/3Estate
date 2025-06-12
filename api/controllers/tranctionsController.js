import Transactions from "../models/transactionsModel.js";

export const deposit = async(req,res,next)=>{
    try {
        const  Transaction = await  Transactions.create(req.body);
    res.status(200).json(Transaction)
    } catch (error) {
        next(error)
    }
}