import mongoose from "mongoose"
import CustomError from "../middleware/customErrorHandler"
import imageModel from "../Models/imageSchema"

const maxPositionNumber = async(userid)=>{
    try {
        const [max] = await imageModel.aggregate([
            {$match:{userid:new mongoose.Types.ObjectId(userid)}},
            {$group:{_id:"$userid",maxPositionNumber:{$max:"$postion"}}}
        ])
        return max ? max : null
        
    } catch (error) {
        throw new CustomError(error.message,error.statusCode)

    }
}



const addImage = async(urls,maxPositionNumber,userid)=>{
    try {
        
        
    } catch (error) {
        throw new CustomError(error.message,error.statusCode)
    }
}

const imageRepo =  {
    maxPositionNumber
}

export default imageRepo