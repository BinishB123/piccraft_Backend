import { statusCode } from "../constants/statusCodes.js"
import CustomError from "../middleware/customErrorHandler.js"
import userModel from "../Models/userSchema.js"

 const addUser = async (bodyData)=>{
    try {
        const userCreated = await userModel.create({
            name:bodyData.name,
            mobile:bodyData.mobile,
            email:bodyData.email.trim(),
            password:bodyData.password

        })
        if(userCreated){
            return {sucess:true}
        }
        throw new CustomError("SignUp Failed Try again",statusCode.NO_CONTENT)
        
    } catch (error) {
        throw new CustomError(error.message,error.statusCode)
    }
}

const authRepo = {
    addUser
}

export default authRepo