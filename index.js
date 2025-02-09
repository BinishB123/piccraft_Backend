import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import express from "express";
import cors from 'cors'
import authRouter from "../backend/router/auth.js";
import errorHandler from "./middleware/errorHandling.js";
import imageRouter from "./router/image.js";
import verification from "./middleware/auth.js";
import cookieParser from "cookie-parser";



const app = express()
configDotenv()
mongoose.connect(process.env.MOGO_URL).then(()=>{
   console.log("mongoo connected")
    
}).catch(()=>{
    console.log("mongoose connection error occured");
    
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use(
    cors({
      origin: process.env.ORGIN,
      methods: "GET,PUT,POST,PATCH,OPTIONS,DELETE",
      allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
      credentials: true,
    })
  );
app.use('/auth',authRouter)
app.use('/images',imageRouter)

app.use(errorHandler)
app.listen(process.env.PORT+"",()=>{
 console.log(`server listening on ${process.env.port},${process.env.ORGIN}`)
},)

       
 