import mongoose from "mongoose";

const careerAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    goal: {
      type: String,
      required: true,
    },

    currentSkills: [String],

    missingSkills: [String],

    roadmap: [
      {
        week: Number,
        topic: String,
      },
    ],

    portfolio: {
      about: String,
      headline: String,
      projects: [String],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("CareerAnalysis", careerAnalysisSchema);
