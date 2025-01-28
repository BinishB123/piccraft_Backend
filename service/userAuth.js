import { statusCode } from "../constants/statusCodes.js"
import CustomError from "../middleware/customErrorHandler.js"
import authRepo from "../repository/authRepo.js"



 const addUser= async(bodyData)=>{
  try {
    if(!bodyData.name||!bodyData.mobile||!bodyData.email||!bodyData.password) throw new CustomError("Please provide Reuired Datas",statusCode.NO_CONTENT)
        const response = await authRepo.addUser(bodyData)
        return response
    
  } catch (error) {
    throw new CustomError (error.message,error.statusCode)
  }

}


const authService = {
    addUser
}

export default authService