import User from "../models/userModel.js"
import { errorHandler } from "../utils/error.js"

export const updateUser = async(req,res,next)=>{
    if(req.user.id!==req.params.id) return next(errorHandler(500,'unauthorized'))
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            avatar:req.body.avatar,
            },{new:true});
        res.status(200).json(updatedUser)
        
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req,res,next)=>{
    if(req.user.id!==req.params.id) return next(errorHandler(500,'unauthorized'))
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json('user deleted')
        } catch (error) {
            next(error)
        }
}