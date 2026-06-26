import Resume from "../models/Resume.js";

import CareerAnalysis from "../models/CareerAnalysis.js";

import { analyzeCareer } from "../services/geminiService.js";

const generateCareerAnalysis = async (req, res) => {
  try {
    const {
      resumeId,
      goal,
    } = req.body;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const result = await analyzeCareer(resume, goal);

    const parsed = JSON.parse(result);

    const analysis = await CareerAnalysis.create({
      user: req.user.id,

      resume: resume._id,

      goal,

      ...parsed,
    });

    res.status(201).json({
      success: true,

      analysis,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default generateCareerAnalysis
