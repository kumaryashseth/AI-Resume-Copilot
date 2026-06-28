import React, { useState } from "react";

import {
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { generateSummary } from "../services/analysisService";

const SummaryGenerator = () => {

  const [resumeId, setResumeId] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [summary, setSummary] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleGenerate = async () => {

    if (!resumeId.trim()) {

      setMessage("Resume ID is required.");

      return;

    }

    try {

      setLoading(true);

      setMessage("");

      setSummary("");

      const response =
        await generateSummary(
          resumeId
        );

      console.log(response.data);

      setSummary(
        response.data.summary
      );

    } catch (error) {

      console.error(error);

      setMessage(
        error.response?.data?.message ||
        "Generation failed."
      );

    } finally {

      setLoading(false);

    }

  };

  const copySummary = async () => {

    if (!summary) return;

    await navigator.clipboard.writeText(
      summary
    );

    alert("Summary copied!");

  };

  return (<div className="max-w-5xl mx-auto py-10 px-4">

  <Paper
    elevation={4}
    className="rounded-2xl p-8"
  >

    <div className="flex items-center gap-3 mb-6">

      <AutoAwesomeIcon
        sx={{
          fontSize: 40,
          color: "#1976d2",
        }}
      />

      <div>

        <Typography
          variant="h4"
          fontWeight="bold"
        >
          AI Summary Generator
        </Typography>

        <Typography color="text.secondary">
          Generate a professional resume summary using AI.
        </Typography>

      </div>

    </div>

    <TextField
      label="Resume ID"
      placeholder="Enter Resume ID"
      fullWidth
      value={resumeId}
      onChange={(e)=>
        setResumeId(
          e.target.value
        )
      }
    />

    <Button
      fullWidth
      variant="contained"
      size="large"
      sx={{
        mt:4,
        height:55
      }}
      disabled={loading}
      onClick={handleGenerate}
    >

      {loading ? (

        <>

          <CircularProgress
            color="inherit"
            size={22}
          />

          <span className="ml-3">
            Generating...
          </span>

        </>

      ) : (

        "Generate AI Summary"

      )}

    </Button>

    {message && (

      <Alert
        severity="error"
        sx={{ mt:3 }}
      >
        {message}
      </Alert>

    )}    {/* ================= AI SUMMARY ================= */}

    {summary && (
      <div className="mt-10">

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          AI Generated Summary
        </Typography>

        <Paper
          elevation={3}
          className="rounded-xl p-6"
        >

          <div className="flex justify-between items-center mb-4">

            <Typography
              variant="h6"
              color="primary"
            >
              Professional Summary
            </Typography>

            <IconButton
              color="primary"
              onClick={copySummary}
            >
              <ContentCopyIcon />
            </IconButton>

          </div>

          <Typography
            sx={{
              whiteSpace: "pre-wrap",
              lineHeight: 2,
              fontSize: "1rem",
            }}
          >
            {summary}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 3,
              textAlign: "right",
            }}
          >
            Characters: {summary.length}
          </Typography>

        </Paper>

      </div>
    )}

  </Paper>

</div>

  );
};

export default SummaryGenerator;