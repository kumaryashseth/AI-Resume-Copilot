import Resume from "../models/Resume.js";

import Interview from "../models/ineterview.js";

import { generateInterviewQuestions } from "../services/geminiService.js";

export const createInterview = async (req, res) => {
  try {
    const { resumeId, position, difficulty, company } = req.body;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const result = await generateInterviewQuestions(
      resume,
      position,
      difficulty,
    );

    const parsed = JSON.parse(result);

    const questions = parsed.questions.map((q) => ({
      question: q,
    }));

    const interview = await Interview.create({
      user: req.user.id,

      resume: resume._id,

      company,

      position,

      difficulty,

      questions,
    });

    res.status(201).json({
      success: true,

      interview,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};






export const getInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    res.json(interview);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
