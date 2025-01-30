import CustomError from "../middleware/customErrorHandler"
import imageRepo from "../repository/imageRepo"



const addImages = async(userid)=>{
    try {
        const max = await imageRepo.maxPositionNumber(userid)
        console.log(max);
        
        
    } catch (error) {
      throw new CustomError(error.message,error.statusCode)
    }
} 


const imageService  = {
    addImages
    
}

export default imageService