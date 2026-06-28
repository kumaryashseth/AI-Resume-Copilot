import ResumeAnalysis from "../models/ResumeAnlysis.js";
import UploadedResume from "../models/UploadedResume.js";
import JDAnalysis from "../models/JDAnalysis.js";
import Resume from "../models/Resume.js";

import cleanJson from "../utils/cleanJson.js";

import analyzeResume, {
  generateSummary,
  matchResumeWithJD,
  rewriteBulletPoints,
} from "../services/geminiService.js";

const analyzedUploadedResume = async (req, res) => {
  try {
    console.log("========== ATS ANALYSIS ==========");
    console.log("Resume ID:", req.params.id);
    console.log("User:", req.user?.id);

    const uploadedResume = await UploadedResume.findById(req.params.id);

    if (!uploadedResume) {
      return res.status(404).json({
        success: false,
        message: "Uploaded resume not found",
      });
    }

    const aiResponse = await analyzeResume(uploadedResume.extractedText);

    const parsed = JSON.parse(cleanJson(aiResponse));

    console.log("Gemini Response");
    console.log(parsed);
    const reportData = {
      user: req.user.id,
      uploadedResume: uploadedResume._id,

      atsScore: parsed.atsScore || 0,

      strengths: parsed.strengths || [],

      weaknesses: parsed.weaknesses || parsed.weakness || [],

      missingKeywords: parsed.missingKeywords || parsed.missingKeyword || [],

      suggestions: parsed.suggestions || [],
    };

    const report = await ResumeAnalysis.create(reportData);
    console.log("Report Saved");

    return res.status(200).json({
      success: true,

      user: report.user,

      uploadedResume: report.uploadedResume,

      atsScore: report.atsScore,

      strengths: report.strengths,

      weaknesses: report.weaknesses,

      missingKeywords: report.missingKeywords,

      suggestions: report.suggestions,

      createdAt: report.createdAt,
    });
  } catch (error) {
    console.error("ATS Analysis Error:", error);

    return res.status(500).json({
      success: false,

      message: error.message,

      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const analyzeJDMatch = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Resume text and job description are required",
      });
    }

    const aiResponse = await matchResumeWithJD(resumeText, jobDescription);

    const parsed = JSON.parse(cleanJson(aiResponse));

    const report = await JDAnalysis.create({
      user: req.user.id,

      jobDescription,

      matchScore: parsed.matchScore || 0,

      matchedSkills: parsed.matchedSkills || [],

      missingSkills: parsed.missingSkills || [],

      suggestions: parsed.suggestions || [],
    });

    return res.status(200).json({
      success: true,

      matchScore: report.matchScore,

      matchedSkills: report.matchedSkills,

      missingSkills: report.missingSkills,

      suggestions: report.suggestions,
    });
  } catch (error) {
    console.error("JD Match Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const rewriteResumePoint = async (req, res) => {
  try {
    const { bulletPoint } = req.body;

    if (!bulletPoint) {
      return res.status(400).json({
        success: false,
        message: "Bullet point is required",
      });
    }

    const aiResponse = await rewriteBulletPoints(bulletPoint);
    
    const parsed = JSON.parse(cleanJson(aiResponse));
    
    return res.status(200).json({
      success: true,

      original: bulletPoint,

      improved:
        parsed.improved ||
        parsed.Improved ||
        parsed.rewritten ||
        parsed.bulletPoint ||
        "",
    });
  } catch (error) {
    console.error("Rewrite Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const generateResumeSummary = async (req, res) => {
  try {
    const { resumeId } = req.body;

    if (!resumeId) {
      return res.status(400).json({
        success: false,
        message: "Resume ID is required",
      });
    }

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const aiResponse = await generateSummary(resume);

    const parsed = JSON.parse(cleanJson(aiResponse));

    resume.summary = parsed.summary || "";

    await resume.save();

    return res.status(200).json({
      success: true,

      summary: resume.summary,
    });
  } catch (error) {
    console.error("Summary Error:", error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export default analyzedUploadedResume;
