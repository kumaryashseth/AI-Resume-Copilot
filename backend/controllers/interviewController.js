import UploadedResume from "../models/UploadedResume.js";
import cleanJson from "../utils/cleanJson.js";
import { generateMockInterview } from "../services/geminiService.js";

export const createMockInterview = async (req, res) => {
  try {
    const { resumeId } = req.body;

    if (!resumeId) {
      return res.status(400).json({
        success: false,
        message: "Resume ID is required",
      });
    }

    const resume = await UploadedResume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const aiResponse = await generateMockInterview(
      resume.extractedText
    );

    const parsed = JSON.parse(cleanJson(aiResponse));

    return res.json({
      success: true,
      ...parsed,
    });
  } catch (error) {
    console.error("Mock Interview Error:", error);

    return res.status(500).json({
      success: false,
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
