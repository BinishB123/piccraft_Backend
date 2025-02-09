import { statusCode } from "../constants/statusCodes.js";
import jwt from "jsonwebtoken";
import CustomError from "./customErrorHandler.js";

const refreshAccessToken = async (
    refreshToken,
    type
  )=> {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESHTOKENKEY+""
      ) 
      if (!decoded) {
        return 401;
      }
      if (type !== "admin") {
        const isAllowed = await checkBlockOrNot(decoded.id, type);
        if (!isAllowed) {
          return 401;
        }
      }
  
      if (decoded.role !== type) {
        return 401;
      }
  
      return jwt.sign(
        { id: decoded.id, email: decoded.email, role: decoded.role },
        process.env.ACCESSTOKENKEY +"",
        { expiresIn: "1h" }
      );
    } catch (err) {
      return 401;
    }
  };
  
  const verification = () => {
    return async (req, res, next) => {
      try {
      
        
        console.log("o",req.cookies[`AccessToken`]);
        
        const accessToken = req.cookies?.[`AccessToken`];
        if (!accessToken) {
          const refreshToken = req.cookies?.[`RefreshToken`];
          if (refreshToken) {
            const newAccessToken = await refreshAccessToken(refreshToken, type);
            if (newAccessToken === 401) {
              throw new CustomError("Access expired", statusCode.FORBIDDEN);
            }
            if (newAccessToken) {
              res.cookie(`AccessToken`, newAccessToken, {
                httpOnly: true,
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 1000,
              });
              req.cookies[`AccessToken`] = newAccessToken;
              return next();
            }
          } else {
            throw new CustomError("Access expired", statusCode.FORBIDDEN);
          }
        }
        
  
        next();
      } catch (err) {
        res.clearCookie(`AccessToken`, {
          httpOnly: true,
          sameSite: true,
          path: "/",
        });
        res.clearCookie(`RefreshToken`, {
          httpOnly: true,
          sameSite: true,
          path: "/",
        });
        next(err);
      }
    };
  };

  export default verification