import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import coverLetterRoutes from "./routes/coverLetterRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import careerRoutes from "./routes/careerRoutes.js"

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extendedd: false }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Resume Copilot API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/analyze", analysisRoutes);
app.use("/api/cover-letter", coverLetterRoutes);

app.use("/api/mock-interview", interviewRoutes);
app.use("/api/career", careerRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
