import cleanJson from "../utils/cleanJson.js";
import { generateCoverLetter } from "../services/geminiService.js";

export const createCoverLetter = async (req, res) => {
  try {
    const {
      name,
      jobTitle,
      company,
      skills,
      experience,
      projects,
      jobDescription,
    } = req.body;

   
    if (!name || !jobTitle || !company || !skills || !experience || !projects) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const aiResponse = await generateCoverLetter({
      name,
      jobTitle,
      company,
      skills,
      experience,
      projects,
      jobDescription,
    });

    console.log("===== RAW GEMINI RESPONSE =====");
    console.log(aiResponse);

    
    const parsed = JSON.parse(cleanJson(aiResponse));

    return res.status(200).json({
      success: true,
      coverLetter:
        parsed.coverLetter || parsed.CoverLetter || parsed.cover_letter || "",
    });
  } catch (error) {
    console.error("Cover Letter Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
