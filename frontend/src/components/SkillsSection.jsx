import { Button, TextField, Typography } from "@mui/material";
import React from "react";

const SkillsSection = ({ resumeData, setResumeData }) => {
  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, ""],
    });
  };
  const handleSkillChange = (index, value) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = value;
    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  return (
    <div className="mb-8">
      <Typography variant="h6">Skills</Typography>
      {resumeData?.skills?.map((skill, index) => (
        <TextField
          key={index}
          value={skill}
          fullWidth
          label={`Skill ${index + 1}`}
          onChange={(e) => handleSkillChange(index, e.target.value)}
        />
      ))}

      <Button variant="outlined" onClick={addSkill} className="mt-4">
        Add Skill
      </Button>
    </div>
  );
};

export default SkillsSection;
