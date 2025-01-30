import { statusCode } from "../constants/statusCodes.js";
import authService from "../service/userAuth.js";

const addUser = async (req, res,next) => {
  try {
    const bodyData = req.body;
    const response = await authService.addUser(bodyData);
    return res.status(statusCode.OK).json(response);
  } catch (error) {
    next(error);
  } 
};

const login = async(req,res,next)=>{
  try {
    const {email,password} = req.body
    const response = await authService.login(email,password)
    return res.status(statusCode.OK).json(response)
  } catch (error) {
    next(error)
  }
}


const authController = {
    addUser,
    login
}

export default authController