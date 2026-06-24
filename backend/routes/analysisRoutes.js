import express from "express";
import { healthCheck } from "../services/geminiService.js";
import protect from "../middleware/authMiddleware.js";
import analyzedUploadedResume, { analyzeJDMatch, generateResumeSummary, rewriteResumePoint } from "../controllers/analysisController.js";

const router = express.Router();

router.post("/jd", protect, analyzeJDMatch);
router.post("/rewrite",protect,rewriteResumePoint);
router.post("/summary",protect,generateResumeSummary)
router.post("/:id", protect, analyzedUploadedResume);
router.get("/health", healthCheck);

export default router;
