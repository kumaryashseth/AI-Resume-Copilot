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

import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { rewritePoint } from "../services/analysisService";

const ResumeRewriter = () => {
  const [bulletPoint, setBulletPoint] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const handleRewrite = async () => {

    if (!bulletPoint.trim()) {

      setMessage(
        "Please enter a resume bullet point."
      );

      return;

    }

    try {

      setLoading(true);

      setMessage("");

      setResult(null);

      const response =
        await rewritePoint({

          bulletPoint,

        });

      console.log(response.data);

      setResult(response.data);

    } catch (error) {

      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Failed to rewrite."
      );

    } finally {

      setLoading(false);

    }

  };

  const copyText = async () => {

    if (!result?.improved) return;

    await navigator.clipboard.writeText(
      result.improved
    );

    alert("Copied!");

  };

  return (<div className="max-w-5xl mx-auto py-10 px-4">

  <Paper
    elevation={4}
    className="rounded-2xl p-8"
  >

    <div className="flex items-center gap-3 mb-6">

      <AutoFixHighIcon
        sx={{
          fontSize: 42,
          color: "#1976d2",
        }}
      />

      <div>

        <Typography
          variant="h4"
          fontWeight="bold"
        >
          AI Resume Bullet Rewriter
        </Typography>

        <Typography color="text.secondary">
          Improve your resume bullet points using AI and ATS best practices.
        </Typography>

      </div>

    </div>

    <TextField
      label="Resume Bullet Point"
      multiline
      rows={8}
      fullWidth
      value={bulletPoint}
      onChange={(e) =>
        setBulletPoint(e.target.value)
      }
      placeholder="Example: Built a chat application using React."
    />

    <Button
      variant="contained"
      fullWidth
      size="large"
      sx={{
        mt: 4,
        height: 55,
      }}
      disabled={loading}
      onClick={handleRewrite}
    >

      {loading ? (
        <>
          <CircularProgress
            color="inherit"
            size={22}
          />

          <span className="ml-3">
            Rewriting...
          </span>
        </>
      ) : (
        "Rewrite with AI"
      )}

    </Button>

    {message && (

      <Alert
        severity="error"
        sx={{ mt: 3 }}
      >
        {message}
      </Alert>

    )}    {/* ================= RESULT ================= */}

    {result && (
      <div className="mt-10">

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          AI Rewrite Result
        </Typography>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Original */}

          <Paper
            elevation={3}
            className="rounded-xl p-6"
          >

            <Typography
              variant="h6"
              color="text.secondary"
              gutterBottom
            >
              Original Bullet
            </Typography>

            <Typography
              sx={{
                whiteSpace: "pre-wrap",
                lineHeight: 1.8,
              }}
            >
              {result.original}
            </Typography>

          </Paper>

          {/* Improved */}

          <Paper
            elevation={3}
            className="rounded-xl p-6 border-l-4 border-green-500"
          >

            <div className="flex justify-between items-center mb-4">

              <Typography
                variant="h6"
                color="success.main"
              >
                AI Improved Bullet
              </Typography>

              <IconButton
                color="primary"
                onClick={copyText}
              >
                <ContentCopyIcon />
              </IconButton>

            </div>

            <Typography
              sx={{
                whiteSpace: "pre-wrap",
                lineHeight: 1.8,
              }}
            >
              {result.improved}
            </Typography>

          </Paper>

        </div>

      </div>
    )}

  </Paper>

</div>

  );
};

export default ResumeRewriter;