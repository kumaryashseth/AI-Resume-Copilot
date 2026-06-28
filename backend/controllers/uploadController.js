import fs from "fs";
import pdfParse from "pdf-parse-fork";
import UploadedResume from "../models/UploadedResume.js";

const uploadResume = async (req, res) => {
  try {
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }

    
    const dataBuffer = fs.readFileSync(req.file.path);

    
    const pdfData = await pdfParse(dataBuffer);

    
    if (!pdfData.text || pdfData.text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Unable to extract text from PDF.",
      });
    }

    
    const uploadedResume = await UploadedResume.create({
      user: req.user.id,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      extractedText: pdfData.text,
    });

    return res.status(201).json({
      success: true,
      message: "Resume uploaded successfully.",

      resumeId: uploadedResume._id,

      uploadedResume: {
        id: uploadedResume._id,
        fileName: uploadedResume.fileName,
        originalName: uploadedResume.originalName,
        pages: pdfData.numpages,
      },

      extractedText: pdfData.text,
    });
  } catch (error) {
    console.error("Resume Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error processing uploaded resume.",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};

export default uploadResume;