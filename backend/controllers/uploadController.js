import fs from "fs";
import pdfParse from "pdf-parse-fork";
import UploadedResume from "../models/UploadedResume.js";

const uploadResume = async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(dataBuffer);

    const uploadedResume = await UploadedResume.create({
      user: req.user.id,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      extractedText: pdfData.text,
    });

    res.status(201).json({
      success: true,
      uploadedResumeId: uploadedResume._id,
      fileName: uploadedResume.fileName,
      originalName: uploadedResume.originalName,
      pages: pdfData.numpages,
      text: pdfData.text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error processing PDF",
    });
  }
};

export default uploadResume;
