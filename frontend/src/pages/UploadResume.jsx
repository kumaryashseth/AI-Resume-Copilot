import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  LinearProgress,
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from "@mui/icons-material/Description";

import {
  uploadResume,
  analyzeResume,
} from "../services/analysisService";

const UploadResume = () => {
  const [file, setFile] = useState(null);

  const [progress, setProgress] = useState(0);

  const [loading, setLoading] = useState(false);

  const [analysis, setAnalysis] = useState(null);

  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setMessage("Only PDF files are allowed.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setMessage("");
    setAnalysis(null);
    setProgress(0);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF resume.");
      return;
    }

    try {
      setLoading(true);
      setProgress(0);
      setAnalysis(null);

      const uploadResponse = await uploadResume(
        file,
        (event) => {
          if (event.total) {
            const percent = Math.round(
              (event.loaded * 100) / event.total
            );
            setProgress(percent);
          }
        }
      );

      const uploadedResumeId =
        uploadResponse.data.resumeId;

      const analysisResponse =
        await analyzeResume(uploadedResumeId);

      console.log(
        "ATS Analysis:",
        analysisResponse.data
      );

      setAnalysis(analysisResponse.data);

      setMessage("Resume uploaded successfully.");
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">

  <Paper
    elevation={4}
    className="rounded-2xl p-8"
  >

    <Typography
      variant="h4"
      fontWeight="bold"
    >
      AI Resume Analyzer
    </Typography>

    <Typography
      color="text.secondary"
      sx={{ mt: 1 }}
    >
      Upload your resume and receive an AI-powered ATS analysis report.
    </Typography>

    {/* Upload Area */}

    <Box
      sx={{
        mt: 5,
        border: "2px dashed #1976d2",
        borderRadius: "16px",
        p: 5,
        textAlign: "center",
        bgcolor: "#fafafa",
      }}
    >

      <CloudUploadIcon
        sx={{
          fontSize: 80,
          color: "#1976d2",
        }}
      />

      <Typography
        variant="h6"
        sx={{ mt: 2 }}
      >
        Upload Resume
      </Typography>

      <Typography
        color="text.secondary"
      >
        Only PDF files are supported
      </Typography>

      <Button
        variant="outlined"
        component="label"
        sx={{ mt: 3 }}
      >
        Choose PDF

        <input
          hidden
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />

      </Button>

    </Box>

    {/* Selected File */}

    {file && (

      <Paper
        elevation={1}
        className="mt-6 p-4 flex items-center gap-4"
      >

        <DescriptionIcon
          color="primary"
        />

        <div>

          <Typography
            fontWeight="bold"
          >
            {file.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {(file.size / 1024).toFixed(2)} KB
          </Typography>

        </div>

      </Paper>

    )}

    {/* Upload Button */}

    <Button
      fullWidth
      size="large"
      variant="contained"
      sx={{
        mt: 4,
        height: 55,
      }}
      disabled={loading}
      onClick={handleUpload}
    >

      {loading ? (

        <>
          <CircularProgress
            color="inherit"
            size={22}
          />

          <span className="ml-3">
            Uploading...
          </span>
        </>

      ) : (

        "Upload & Analyze"

      )}

    </Button>

    {/* Progress */}

    {loading && (

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          mt: 3,
          height: 8,
          borderRadius: 4,
        }}
      />

    )}

    {/* Success/Error */}

    {message && (

      <Alert
        sx={{ mt: 3 }}
        severity={
          message.includes("success")
            ? "success"
            : "error"
        }
      >
        {message}
      </Alert>

    )}    {/* ================= ATS ANALYSIS ================= */}

    {analysis && (
      <div className="mt-10">

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          ATS Analysis Report
        </Typography>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ATS SCORE */}

          <Paper
            elevation={3}
            className="rounded-xl p-6 text-center"
          >

            <Typography
              variant="h6"
              gutterBottom
            >
              ATS Score
            </Typography>

            <CircularProgress
              variant="determinate"
              value={analysis?.atsScore || 0}
              size={130}
              thickness={5}
              color={
                (analysis?.atsScore || 0) >= 80
                  ? "success"
                  : (analysis?.atsScore || 0) >= 60
                  ? "warning"
                  : "error"
              }
            />

            <Typography
              variant="h3"
              fontWeight="bold"
              mt={3}
            >
              {analysis?.atsScore || 0}%
            </Typography>

          </Paper>

          {/* STRENGTHS */}

          <Paper
            elevation={3}
            className="rounded-xl p-6"
          >

            <Typography
              variant="h6"
              color="success.main"
              gutterBottom
            >
              ✅ Strengths
            </Typography>

            <ul className="list-disc pl-5 space-y-2">

              {(analysis?.strengths || []).map(
                (item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                )
              )}

            </ul>

          </Paper>

          {/* WEAKNESSES */}

          <Paper
            elevation={3}
            className="rounded-xl p-6"
          >

            <Typography
              variant="h6"
              color="error.main"
              gutterBottom
            >
              ⚠ Weaknesses
            </Typography>

            {(analysis?.weaknesses || []).length === 0 ? (

              <Typography color="success.main">
                No major weaknesses detected 🎉
              </Typography>

            ) : (

              <ul className="list-disc pl-5 space-y-2">

                {(analysis?.weaknesses || []).map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}

              </ul>

            )}

          </Paper>

        </div>

        {/* Missing Keywords */}

        <Paper
          elevation={3}
          className="rounded-xl p-6 mt-6"
        >

          <Typography
            variant="h6"
            gutterBottom
          >
            Missing Keywords
          </Typography>

          <div className="flex flex-wrap gap-3">

            {(analysis?.missingKeywords || []).length === 0 ? (

              <Typography color="success.main">
                No missing keywords 🎉
              </Typography>

            ) : (

              (analysis?.missingKeywords || []).map(
                (item, index) => (
                  <span
                    key={index}
                    className="
                      bg-red-100
                      text-red-700
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-medium"
                  >
                    {item}
                  </span>
                )
              )

            )}

          </div>

        </Paper>

        {/* Suggestions */}

        <Paper
          elevation={3}
          className="rounded-xl p-6 mt-6"
        >

          <Typography
            variant="h6"
            gutterBottom
          >
            AI Suggestions
          </Typography>

          <div className="space-y-3">

            {(analysis?.suggestions || []).length === 0 ? (

              <Typography color="success.main">
                Great resume! No suggestions available.
              </Typography>

            ) : (

              (analysis?.suggestions || []).map(
                (item, index) => (

                  <Paper
                    key={index}
                    elevation={1}
                    className="p-3"
                  >
                    💡 {item}
                  </Paper>

                )
              )

            )}

          </div>

        </Paper>

      </div>
    )}

  </Paper>

</div>

  );
};

export default UploadResume;