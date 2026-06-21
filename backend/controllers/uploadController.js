import fs from "fs";
import pdfParse from "pdf-parse-fork";
import UploadedResume from "../models/UploadedResume.js";

const uploadResume = async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(dataBuffer);

    await UploadedResume.create({
      user: req.user.id,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      extractedText: pdfData.text,
    });


    res.json({
      success: true,
      fileName: req.file.filename,
      text: pdfData.text,
      pages: pdfData.numpages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error processing PDF",
    });
  }
};

export default uploadResume;