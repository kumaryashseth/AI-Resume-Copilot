import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  uploadedResume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UploadedResume",
  },
  atsScore: {
    type: Number,
  },
  strengths: {
    type: [String],
  },
  weakness: {
    type: [String],
  },
  missingKeywords: {
    type: [String],
  },
  suggestions: {
    type: [String],
  },
});

export default mongoose.model("ResumeAnalysis", analysisSchema);
