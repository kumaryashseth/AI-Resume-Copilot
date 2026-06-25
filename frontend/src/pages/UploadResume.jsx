import React, { useState } from "react";
import { Button, LinearProgress, Paper, Typography } from "@mui/material";
import { uploadResume } from "../services/analysisService";

const UploadResume = () => {
  const [file, setFile] = useState(null);

  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file first.");
      return;
    }
    try {
      const res = await uploadResume(file, (event) => {
        const percent = Math.round((event.loaded * 100) / event.total);
        setProgress(percent);
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Paper>
      <Typography variant="h5">UploadResume</Typography>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <Button variant="contained" className="mt-4" onClick={handleUpload}>
        Upload
      </Button>
      {progress > 0 && (
        <LinearProgress value={progress} variant="determinate" />
      )}
    </Paper>
  );
};

export default UploadResume;
