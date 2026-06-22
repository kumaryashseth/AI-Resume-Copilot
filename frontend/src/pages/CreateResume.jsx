import React, { useState } from "react";
import { createResume } from "../services/resumeService";
import { Button, Container, Paper, Typography } from "@mui/material";
import PersonalInfo from "../components/PersonalInfo";
import SkillsSection from "../components/SkillsSection";
import EducationSection from "../components/EducationSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectSection from "../components/ProjectSection";
import ResumePreview from "../components/ResumePreview";

const CreateResume = () => {
  const [resumeData, setResumeData] = useState({
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
    console.log(resumeData);

    try {
      await createResume(resumeData);
    } catch (error) {
      console.error(error);
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

        <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
          Save Resume{" "}
        </Button>
        <br />
        <br />
        <ResumePreview resumeData={resumeData} />
      </Paper>
    </Container>
  );
};

export default CreateResume;
