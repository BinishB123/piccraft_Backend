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

const allowedOrigins = [
  "https://piccraft-frontend.vercel.app",
  "https://piccraft-frontend.vercel.app/",
  "http://localhost:3000", // Allow local testing
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET, PUT, POST, PATCH, OPTIONS, DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
    credentials: true, // Allow cookies
  })
);

app.use("/", authRouter);
app.use("/images", imageRouter);

// Error Handling Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}, Origin: ${process.env.ORIGIN}`);
});
