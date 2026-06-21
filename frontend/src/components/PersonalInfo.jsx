import { TextField, Typography } from "@mui/material";
import React from "react";

const PersonalInfo = ({ resumeData, setResumeData }) => {
  const handleChange = (e) => {
    console.log(e.target.value);

    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [e.target.name]: e.target.value,
      },
    });
  };
  return (
    <div className="mb-4">
      <Typography variant="h6" gutterBottom>
        Personal Info
      </Typography>
      <div className="grid gap-4 mt-4">
        <TextField
          label="Name"
          name="fullName"
          variant="outlined"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Phone"
          name="phone"
          variant="outlined"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Location"
          name="location"
          variant="outlined"
          onChange={handleChange}
          fullWidth
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
