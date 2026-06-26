import Resume from "../models/Resume.js";
import Coverletter from "../models/Coverletter.js";
import { generateCoverLetter } from "../services/geminiService.js";

export const createCoverLetter = async (req, res) => {
  try {
    const { resumeId, company, position } = req.body;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const aiResponse = await generateCoverLetter(resume, company, position);

    const parsed = JSON.parse(aiResponse);

    const letter = await Coverletter.create({
      user: req.user.id,

      resume: resume._id,

      company,

      position,

      content: parsed.coverLetter,
    });

    res.status(201).json({
      success: true,

      letter,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


