import express from "express"

const router=express.Router();

import protect from '../middleware/authMiddleware.js'

import generateCareerAnalysis  from "../controllers/careerController.js";

router.post("/analysis",protect,generateCareerAnalysis)

export default router;