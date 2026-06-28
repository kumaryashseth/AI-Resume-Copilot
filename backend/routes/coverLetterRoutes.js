import express from "express";
import { createCoverLetter } from "../controllers/coverLetterController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", protect, createCoverLetter);

export default router;