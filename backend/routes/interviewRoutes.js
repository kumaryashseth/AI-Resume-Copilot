import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createMockInterview } from "../controllers/interviewController.js";

const router = express.Router();

router.post("/generate", protect, createMockInterview);

export default router;