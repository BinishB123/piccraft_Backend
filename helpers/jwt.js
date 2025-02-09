import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv()

const generateToken= (payload, options)=> {
    return jwt.sign(payload,process.env.ACCESSTOKENKEY, options);
}
const generateRefreshToken = (payload, options)=>{
    return jwt.sign(payload, process.env.REFRESHTOKENKEY, options);
}

 const verifyjwt =(refreshToken)=> {
    try {
        const user = jwt.verify(refreshToken, process.env.REFRESHTOKENKEY);
        const newAccessToken = jwt.sign(
            { username: user.username },
            process.env.ACCESSTOKENKEY,
            { expiresIn: "30m" }
        );

        return { success: true, newAccessToken };
    } catch (err) {
        return { success: false, error: "Invalid refresh token." };
    }
}

 const token = {
   generateToken,
   generateRefreshToken,
   verifyjwt 
}

export default token