import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();
const app = express();

// ✅ Set COOP and COEP headers to fix the window.close() issue
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use(express.json());
app.use(cookieParser());

// ✅ Fixed the CORS origin array
const allowedOrigins = [
  "https://prestigehorizonsestate.vercel.app",
  "https://prestigehorizonsestate-ae8u1za53-tech-masterys-projects.vercel.app",
  "https://prestigehorizonsestate-git-main-tech-masterys-projects.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ Define routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// ✅ Health check route
app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to the app" });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// ✅ Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
