import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


const analyzeResume=async (resumeText)=>{

    const prompt = `
    You are an ATS Resume Analyzer.
    Analyze the following resume.
    Return Only valid JSON.

    {
        "atsScore":0,
        "strenghts":[],
        "weaknesses":[],
        "missingKeywords":[],
        "suggestion":[]
    }

    Resume: ${resumeText}
    `;

    const response= await ai.models.generateContent({
        model:"models/gemini-2.0-flash",
        contents: prompt
    })
    
    return response.text;
}





export default analyzeResume;