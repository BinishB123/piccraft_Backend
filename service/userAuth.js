import { statusCode } from "../constants/statusCodes.js";
import CustomError from "../middleware/customErrorHandler.js";
import authRepo from "../repository/authRepo.js";

const addUser = async (bodyData) => {
  try {
    if (
      !bodyData.name ||
      !bodyData.mobile ||
      !bodyData.email ||
      !bodyData.password
    )
      throw new CustomError(
        "Please provide Reqired Datas",
        statusCode.FORBIDDEN
      );
   const response = await authRepo.checkWhetherEmailExist(bodyData.email.trim())
   if (response.success) {
     const response = await authRepo.addUser(bodyData);
      return response;
   }
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);
  }
};

const login = async(email,password)=>{
  try {    
    if (!email||!password)   throw new CustomError('Please give required data',statusCode.Unprocessable_Entity)
    const response = await authRepo.login(email,password)
  
    return response
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);
  }
}

const authService = {
  addUser,
  login
};

export default authService;
