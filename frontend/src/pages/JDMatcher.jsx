import React, { useState } from "react";
import { analyzeJD } from "../services/analysisService";
import { Box, Button, TextField, Typography } from "@mui/material";

const JDMatcher = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalysis = async () => {
    const res = await analyzeJD({
      resumeText,
      jobDescription,
    });
    setResult(res.data);
  };

  return (
    <Box>
      <TextField
        multiline
        rows={6}
        fullWidth
        label="Resume Text"
        onChange={(e) => setResumeText(e.target.value)}
      />
      <TextField
        multiline
        rows={6}
        fullWidth
        label="Job Description"
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <Button variant="contained" onClick={handleAnalysis}>Analyze</Button>
    {
      result && (
        <div>
          <Typography variant="h6">Result</Typography>
          <Typography>{result.matchScore}</Typography>
        </div>
      )
    }
    
    </Box>
  );
};

export default JDMatcher;
