import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeResume = async (resumeText) => {
  console.log("Analyzing resume...");
  console.log(resumeText);

  const prompt = `
    You are an ATS Resume Analyzer.
    Analyze the following resume.
    Return Only valid JSON.

    {
        "atsScore":0,
        "strengths":[],
        "weaknesses":[],
        "missingKeywords":[],
        "suggestions":[]
    }

    Resume: ${resumeText}
    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });
    console.log(response.text);

    return response.text;
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw error;
  }
};

export const healthCheck = async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: "Say Gemini is working",
    });

    res.json({
      status: "OK",
      result: response.text,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const matchResumeWithJD= async (resumeText, jobDescription)=>{
  const prompt= `
    You are an expert  ATS Resume Matcher.

    Analyze the resume and job description and provide a match score.

    Rules:

    1. Calculate match score from 0-100.
    2. Extract matched skills.
    3. Extract missing skills.
    4. Provide actionable recommendation.
    5. Return ONLY JSON

    Return Only valid JSON.

    {
        "matchScore":0,
        "matcheSkills":[],
        "missingSkills":[],
        "recommendations":[]
    }

    Resume: ${resumeText}
    Job Description: ${jobDescription}
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });
    console.log(response.text);

    return response.text;
    
  } catch (error) {
    console.error("Error matching resume with job description:", error);
    throw error;
  }
}

export const rewriteBulletPoints=async(bulletPoint)=>{

  const prompt=`
  You are an expert writer.
  Rewrite the following resume bullet point.

  Rules:
  1. Make it more impactful and specific.
  2. Make it ATS friendly.
  3. Make it professional and keep it concise.
  4. Return ONLY the rewritten bullet point.
  5. Return ONLY JSON.

  {
  "Improved"
  }

  Bullet Point: ${bulletPoint}
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });
    console.log(response.text);

    return response.text;
  } catch (error) {
    console.error("Error rewriting bullet points:", error);
    throw error;
  }
} 


export const generateSummary= async(resume)=>{

  const prompt=`
  You are an expert ATS resume writer.
  Create a professional  summary for this candidate.



  Return ONLY valid JSON.

  {
  "summary":""
  }

  Candidate Data:

  Name: ${resume.personalInfo.name}
  Experience: ${JSON.stringify(resume.experience)}
  Skills: ${JSON.stringify(resume.skills)}
  Education: ${JSON.stringify(resume.education)}
  Projects: ${JSON.stringify(resume.projects)}
  `

 try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });
    console.log(response.text);

    return response.text;
  } catch (error) {
    console.error("Error generating summary:", error);
    throw error;
  }
}



export default analyzeResume;
