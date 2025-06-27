import Transactions from "../models/transactionsModel.js";
import Withdrawal from "../models/withdrawalModel.js";
import { errorHandler } from "../utils/error.js";

export const deposit = async(req,res,next)=>{
    try {
        const  Transaction = await  Transactions.create(req.body);
    res.status(200).json(Transaction)
    } catch (error) {
        next(error)
    }
}
export const withdrawals = async(req,res,next)=>{
    try {
        const  Withdrawals = await  Withdrawal.create(req.body);
    res.status(200).json(Withdrawals)
    } catch (error) {
        next(error)
    }
}

export const getDeposite = async(req,res,next)=>{
    const {agent,customerId,day,month,year,deposit} = req.query;
  try {
      let filter = {};
    if(agent) filter.agent = Number(agent) ;
    if(customerId) filter.customerId =Number(customerId)  ;
    if(day) filter.day =Number (day);
    if(month) filter.month =Number (month);
    if(year) filter.year =Number (year) ;
    if(deposit) filter.deposit = Number(deposit);
const transact = await Transactions.find(filter);
res.status(200).json(transact)
  } catch (error) {
    next(error)
  }
}
export const getWithdrawals = async(req,res,next)=>{
        const {agent,customerId,day,month,year,withdrawal} = req.query;
  try {
      let filter = {};
    if(agent) filter.agent = Number(agent) ;
    if(customerId) filter.customerId =Number(customerId);
    if(day) filter.day =Number (day);
    if(month) filter.month =Number (month)
    if(year) filter.year =Number (year) ;
    if(withdrawal) filter.withdrawal = Number (withdrawal);
const withdrawals = await Withdrawal.find(filter);
res.status(200).json(withdrawals)
  } catch (error) {
    next(error)
  }
}
export const deleteTransactions = async(req,res,next)=>{
  const {id }= req.params
  console.log('backend id',id)
  try {
    let deleted =await Transactions.findByIdAndDelete(id);
    if(!deleted) {
      deleted = await Withdrawal.findByIdAndDelete(id);
    }
    if(!deleted) return next(errorHandler('transactions not found'))
  res.status(200).json('transaction deleted')
  } catch (error) {
    next(error)
  }
}
