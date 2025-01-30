import { statusCode } from "../constants/statusCodes.js";
import CustomError from "../middleware/customErrorHandler.js";
import userModel from "../Models/userSchema.js";
import bcrypt from "bcrypt";

const addUser = async (bodyData) => {
  try {
    const hashedPassword = await bcrypt.hash(bodyData.password, 10);
    const userCreated = await userModel.create({
      name: bodyData.name,
      mobile: parseInt(bodyData.mobile),
      email: bodyData.email.trim(),
      password: hashedPassword,
    });
    if (userCreated) {
      return { sucess: true };
    }
    throw new CustomError("SignUp Failed Try again", statusCode.NO_CONTENT);
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);
  }
};

const checkWhetherEmailExist = async (email) => {
  try {
    const emailExist = await userModel.findOne({ email: email.trim() });
    if (!emailExist) {
      return { success: true };
    }
    throw new CustomError(
      "Email already exist use another email ",
      statusCode.CONFLICT
    );
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);
  }
};

const login = async (email, password) => {
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      throw new CustomError("No user with this email id", statusCode.FORBIDDEN);
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new CustomError("Incorrect password", statusCode.UNAUTHORIZED);
    }
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);
  }
};

const authRepo = {
  addUser,
  checkWhetherEmailExist,
  login,
};

export default authRepo;
