import mongoose from "mongoose";
import { config as dotenvConfig } from "dotenv";
import express from "express";
import cors from "cors";
import authRouter from "./router/auth.js";
import errorHandler from "./middleware/errorHandling.js";
import imageRouter from "./router/image.js";
import cookieParser from "cookie-parser";

dotenvConfig(); // Load environment variables

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MOGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongoose connection error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
app.use(
  cors({
    origin:"https://piccraft-frontend.vercel.app/",
    methods: "GET, PUT, POST, PATCH, OPTIONS, DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
    credentials: true,
  })
);

// Routes
app.use("/", authRouter);
app.use("/images", imageRouter);

// Error Handling Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}, Origin: ${process.env.ORIGIN}`);
});
