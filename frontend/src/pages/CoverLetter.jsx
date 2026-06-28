
import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { generateCoverLetter } from "../services/analysisService";

const CoverLetter = () => {
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    company: "",
    skills: "",
    experience: "",
    projects: "",
    jobDescription: "",
  });

  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGenerate = async () => {
    const { name, jobTitle, company, skills, experience, projects } = formData;

    if (!name || !jobTitle || !company || !skills || !experience || !projects) {
      setMessage("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setCoverLetter("");

      const res = await generateCoverLetter(formData);
      setCoverLetter(res.data.coverLetter || "");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to generate cover letter.");
    } finally {
      setLoading(false);
    }
  };

  const copyCoverLetter = async () => {
    await navigator.clipboard.writeText(coverLetter);
    alert("Cover Letter copied!");
  };

  const downloadCoverLetter = () => {
    const blob = new Blob([coverLetter], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "CoverLetter.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box className="max-w-6xl mx-auto p-6">
      <Paper elevation={4} className="p-8 rounded-2xl">
        <Box className="flex items-center gap-3 mb-6">
          <DescriptionIcon sx={{ fontSize: 40, color: "#1976d2" }} />
          <div>
            <Typography variant="h4" fontWeight="bold">
              AI Cover Letter Generator
            </Typography>
            <Typography color="text.secondary">
              Generate a professional ATS-friendly cover letter.
            </Typography>
          </div>
        </Box>

        <div className="grid md:grid-cols-2 gap-4">
          <TextField label="Full Name" name="name" value={formData.name} onChange={handleChange} fullWidth />
          <TextField label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} fullWidth />
          <TextField label="Company" name="company" value={formData.company} onChange={handleChange} fullWidth />
          <TextField label="Skills" name="skills" value={formData.skills} onChange={handleChange} fullWidth />
        </div>

        <TextField sx={{ mt: 3 }} label="Experience" name="experience" value={formData.experience} onChange={handleChange} multiline rows={3} fullWidth />
        <TextField sx={{ mt: 3 }} label="Projects" name="projects" value={formData.projects} onChange={handleChange} multiline rows={3} fullWidth />
        <TextField sx={{ mt: 3 }} label="Job Description (Optional)" name="jobDescription" value={formData.jobDescription} onChange={handleChange} multiline rows={5} fullWidth />

        <Button
          sx={{ mt: 4, height: 55 }}
          variant="contained"
          fullWidth
          disabled={loading}
          onClick={handleGenerate}
        >
          {loading ? <CircularProgress color="inherit" size={24} /> : "Generate Cover Letter"}
        </Button>

        {message && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {message}
          </Alert>
        )}

        {coverLetter && (
          <Paper elevation={3} sx={{ mt: 5, p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5">Generated Cover Letter</Typography>
              <Box display="flex" gap={2}>
                <Button variant="outlined" onClick={copyCoverLetter}>
                  Copy
                </Button>
                <Button variant="contained" color="success" onClick={downloadCoverLetter}>
                  Download
                </Button>
                <Button variant="outlined" color="error" onClick={() => setCoverLetter("")}>
                  Clear
                </Button>
              </Box>
            </Box>

            <Paper variant="outlined" sx={{ p: 3, bgcolor: "#fafafa" }}>
              <Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 2 }}>
                {coverLetter}
              </Typography>
            </Paper>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "right", mt: 2 }}
            >
              Characters: {coverLetter.length}
            </Typography>
          </Paper>
        )}
      </Paper>
    </Box>
  );
};

export default CoverLetter;
