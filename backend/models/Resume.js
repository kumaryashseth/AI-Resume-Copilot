import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    personalInfo: {
      fullName: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      github: String,
    },
    summary: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
    },

    education: [
      {
        degree: String,
        college: String,
        year: String,
        cgpa: String,
      },
    ],

    experience: [
      {
        company: String,
        role: String,
        startDate: String,
        endDate: String,
      },
    ],

    projects: [
      {
        title: String,
        techStack: String,
        github: String,
        description: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Resume", resumeSchema);
