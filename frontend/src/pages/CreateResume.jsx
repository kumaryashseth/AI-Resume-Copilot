import React, { useState } from "react";
import {
  Button,
  Container,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

import { createResume } from "../services/resumeService";
import { generateSummary } from "../services/analysisService";

import PersonalInfo from "../components/PersonalInfo";
import SkillsSection from "../components/SkillsSection";
import EducationSection from "../components/EducationSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectSection from "../components/ProjectSection";
import ResumePreview from "../components/ResumePreview";

const CreateResume = () => {
  const [loading, setLoading] = useState(false);

  const [resumeData, setResumeData] = useState({
    _id: "",

    title: "",

    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
    },

    summary: "",

    skills: [""],

    education: [
      {
        degree: "",
        college: "",
        year: "",
        cgpa: "",
      },
    ],

    experience: [],

    projects: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createResume(resumeData);

      setResumeData((prev) => ({
        ...prev,
        _id: res.data.resume._id,
      }));

      alert("Resume Saved Successfully");
    } catch (error) {
      console.error(error);

      alert("Unable to save resume.");
    }
  };

  const handleGenerateSummary = async () => {
    if (!resumeData._id) {
      alert("Please save the resume first.");

      return;
    }

    try {
      setLoading(true);

      const res = await generateSummary(resumeData._id);

      setResumeData((prev) => ({
        ...prev,
        summary: res.data.summary,
      }));

      alert("Summary Generated");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper className="p-8 mt-10">
        <Typography variant="h4" gutterBottom>
          Resume Builder
        </Typography>

        <PersonalInfo resumeData={resumeData} setResumeData={setResumeData} />

        <SkillsSection resumeData={resumeData} setResumeData={setResumeData} />

        <EducationSection
          resumeData={resumeData}
          setResumeData={setResumeData}
        />

        <ExperienceSection
          resumeData={resumeData}
          setResumeData={setResumeData}
        />

        <ProjectSection resumeData={resumeData} setResumeData={setResumeData} />

        <Button
          variant="contained"
          sx={{ mt: 2, mr: 2 }}
          onClick={handleSubmit}
        >
          Save Resume
        </Button>

        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={handleGenerateSummary}
          disabled={loading}
        >
          {loading ? (
            <>
              <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
              Generating...
            </>
          ) : (
            "Generate AI Summary"
          )}
        </Button>

        <br />
        <br />

        <ResumePreview resumeData={resumeData} />
      </Paper>
    </Container>
  );
};

export default CreateResume;
