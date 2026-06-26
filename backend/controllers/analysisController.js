import ResumeAnalysis from "../models/ResumeAnlysis.js";
import UploadedResume from "../models/UploadedResume.js";
import JDAnalysis from "../models/JDAnalysis.js";
import Resume from "../models/Resume.js";

import analyzeResume,{generateSummary, matchResumeWithJD, rewriteBulletPoints} from "../services/geminiService.js";

const analyzedUploadedResume = async (req, res) => {
  try {

    console.log("Resume ID:", req.params.id);
    console.log("User:", req.user?._id);


    const uploadedResume = await UploadedResume.findById(req.params.id);
    if (!uploadedResume) {
      return res.status(404).json({ message: "Uploaded resume not found" });
    }
    const result = await analyzeResume(uploadedResume.extractedText);
    

    const parsed = JSON.parse(result);
    console.log("Parsed:", parsed);

    const report = await ResumeAnalysis.create({
      user: req.user.id,
      uploadedResume: uploadedResume._id,
      ...parsed,
    });
    console.log("Report:", report);

    res.json(report);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const analyzeJDMatch = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is missing"
      });
    }
    console.log(req.body);
    
    const { resumeText, jobDescription } = req.body;

    if(!resumeText || !jobDescription) {
      return res.status(400).json({ message: "Resume text and job description are required" });
    }

    const result = await matchResumeWithJD(resumeText, jobDescription);
    const parsed = JSON.parse(result);

    await JDAnalysis.create({
      user: req.user.id,
      ...parsed,
      jobDescription
    });


    console.log("Parsed:", parsed);
    res.json(parsed);

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const rewriteResumePoint= async(req,res)=>{
  try {
    const {bulletPoint}= req.body;

    if(!bulletPoint){
      return res.status(400).json({
        message: "Bullet Points are Required"
      })
    }

    const result= await rewriteBulletPoints(bulletPoint);
    const parsed=JSON.parse(result);
 
    res.json({
      original: bulletPoint,
      ...parsed
    });
 
 
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export const generateResumeSummary= async(req,res)=>{

  try {
   const {resumeId} = req.body;

   if(!resumeId){
    return res.status(400).json({
      message: "Resume ID is required"
    })
   }
   
   const resume = await Resume.findById(resumeId);
   if(!resume){
    return res.status(404).json({
      message: "Resume not found"
    })
   }

   if(resume.user.toString() !== req.user.id){
    return res.status(403).json({
      message: "Unauthorized"
    })
   }
   
   const result = await generateSummary(resume);
   const parsed=JSON.parse(result);
   
   resume.summary=parsed.summary;
   

   await resume.save();

   res.json({
    success:true,
    summary: parsed.summary
   });
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default analyzedUploadedResume;
