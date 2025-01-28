import { statusCode } from "../constants/statusCodes.js";
import authService from "../service/userAuth.js";

const addUser = async (req, res) => {
  try {
    const bodyData = req.body;
    console.log(bodyData);
    
    const response = await authService.addUser(bodyData);
    return res.status(statusCode.OK).json(response);
  } catch (error) {
    next(error);
  }
};


const authController = {
    addUser
}

export default authController