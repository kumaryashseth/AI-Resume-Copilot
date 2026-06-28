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

export const matchResumeWithJD = async (resumeText, jobDescription) => {
  const prompt = `
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
};

export const rewriteBulletPoints = async (bulletPoint) => {
  const prompt = `
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
};

export const generateSummary = async (resume) => {
  const prompt = `
  You are an expert ATS resume writer.
  Create a professional  summary for this candidate.

  Rules:
  - 60-80 words
  - ATS friendly
  - Professional
  - Mention strongest technical skills
  - Mention projects if relevant
  - Mention career objective

  Return ONLY valid JSON.

  {
  "summary":""
  }

  Candidate Data:

  Resume:
  ${JSON.stringify(resume)}
  `;

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
};

export const generateCoverLetter = async (data) => {
  const prompt = `

You are an expert HR recruiter.

Write a professional ATS-friendly Cover Letter.

Candidate Information:

Name:
${data.name}

Job Title:
${data.jobTitle}

Company:
${data.company}

Skills:
${data.skills}

Experience:
${data.experience}

Projects:
${data.projects}

Job Description:
${data.jobDescription}

Rules:

1. Professional tone

2. Around 300 words

3. ATS Friendly

4. No Markdown

5. Return ONLY valid JSON

{
"coverLetter":""
}

`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",

    contents: prompt,
  });

  return response.text;
};

export const generateMockInterview = async (resumeText) => {
  const prompt = `
You are a Senior Software Engineering Interviewer.

Generate interview questions based on this resume.

Resume:
${resumeText}

Return ONLY valid JSON.

{
  "technical":[
    {
      "question":"",
      "difficulty":"",
      "tip":""
    }
  ],

  "hr":[
    {
      "question":"",
      "difficulty":"",
      "tip":""
    }
  ],

  "behavioral":[
    {
      "question":"",
      "difficulty":"",
      "tip":""
    }
  ]
}

Rules:

- 5 Technical Questions
- 3 HR Questions
- 2 Behavioral Questions
- Difficulty should be Easy, Medium or Hard
- Tips should help answer the question
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
  });

  return response.text;
};

export const analyzeCareer = async (resume, goal) => {
  const prompt = `

You are an AI Career Mentor.

Analyze the resume.

Career Goal:

${goal}

Resume:

${JSON.stringify(resume)}

Return ONLY JSON.

{
 "currentSkills":[],
 "missingSkills":[],
 "roadmap":[
   {
     "week":1,
     "topic":"Docker"
   }
 ],
 "portfolio":{
    "headline":"",
    "about":"",
    "projects":[]
 }
}

`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",

    contents: prompt,
  });

  return response.text;
};

export default analyzeResume;
