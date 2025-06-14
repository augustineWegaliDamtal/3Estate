import Transactions from "../models/transactionsModel.js";

export const deposit = async(req,res,next)=>{
    try {
        const  Transaction = await  Transactions.create(req.body);
    res.status(200).json(Transaction)
    } catch (error) {
        next(error)
    }
}
export const withdraw = async(req,res,next)=>{
    try {
        const  Transaction = await  Transactions.create(req.body);
    res.status(200).json(Transaction)
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