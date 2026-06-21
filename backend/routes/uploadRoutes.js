import express from "express";
import uploadResume from "../controllers/uploadController.js";
import  upload  from "../middleware/uploadMiddleware.js";
import protect from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/resume", protect, upload.single("resume"), uploadResume);

export default router;
