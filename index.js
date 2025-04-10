dotenv.config();

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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

app.use(express.json());

app.use(cookieParser());

const origins = [
  "https://firebasestorage.googleapis.com/v0/b/real-estate-4bc6b.firebasestorage.app/o?name=1737099509612Group%20270.png",
  "https://firebasestorage.googleapis.com/v0/b/real-estate-4bc6b.firebasestorage.app/o?name=1737099509612Group%20270.jep",
];

app.use(
  cors({
    origin: [
      origins,
      "https://prestigehorizonsestate-ae8u1za53-tech-masterys-projects.vercel.app/",
    ],
    credentials: true,
  })
);

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// app.use(express.static(path.join(__dirname, "/client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to the app" });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
