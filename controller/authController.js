import { statusCode } from "../constants/statusCodes.js";
import token from "../helpers/jwt.js";
import authService from "../service/userAuth.js";

const addUser = async (req, res, next) => {
  try {
    const bodyData = req.body;
    const response = await authService.addUser(bodyData);
    const refTok = token.generateRefreshToken(
      { ...response },
      { expiresIn: "1h" }
    );
    const tok = token.generateToken({ ...response }, { expiresIn: "1d" });
    res.cookie("RefreshToken", refTok, {
      httpOnly: true,
      sameSite: true,
      secure: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("AccessToken", tok, {
      httpOnly: true,
      sameSite: true,
      maxAge: 30 * 60 * 1000,
      secure: true,
    });
    return res.status(statusCode.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("okk",email, password );
    
    const response = await authService.login(email, password);

    const refTok = token.generateRefreshToken(
      { ...response },
      { expiresIn: "1h" }
    );
    const tok = token.generateToken({ ...response }, { expiresIn: "1d" });

    res.cookie("RefreshToken", refTok, {
      httpOnly: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true // Change to true in production
    });
    
    res.cookie("AccessToken", tok, {
      httpOnly: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true // Change to true in production
    });
    

    return res.status(statusCode.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  res.clearCookie("RefreshToken", {
    httpOnly: true,
    sameSite: true,
    path: "/",
  });
  res.clearCookie("AccessToken", {
    httpOnly: true,
    sameSite: true,
    path: "/",
  });
  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

const authController = {
  addUser,
  login,
  logout,
};

export default authController;
