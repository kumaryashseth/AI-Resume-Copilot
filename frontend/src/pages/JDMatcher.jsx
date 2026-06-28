import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";

import { analyzeJD } from "../services/analysisService";

const JDMatcher = () => {
  const [resumeText, setResumeText] = useState("");

  const [jobDescription, setJobDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const [message, setMessage] = useState("");

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setMessage("Resume text is required.");
      return;
    }

    if (!jobDescription.trim()) {
      setMessage("Job description is required.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setResult(null);

      const response = await analyzeJD({
        resumeText,
        jobDescription,
      });

      console.log(response.data);

      setResult(response.data);
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Analysis failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (<div className="max-w-7xl mx-auto py-10 px-4">

  <Paper
    elevation={4}
    className="rounded-2xl p-8"
  >

    <div className="flex items-center gap-3 mb-6">

      <WorkIcon
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
          AI Job Description Matcher
        </Typography>

        <Typography
          color="text.secondary"
        >
          Compare your resume with any Job Description.
        </Typography>

      </div>

    </div>

    <div className="grid lg:grid-cols-2 gap-8">

      {/* Resume */}

      <Paper
        elevation={2}
        className="p-5 rounded-xl"
      >

        <Typography
          variant="h6"
          gutterBottom
        >
          Resume Text
        </Typography>

        <TextField
          multiline
          rows={16}
          fullWidth
          placeholder="Paste Resume Text..."
          value={resumeText}
          onChange={(e) =>
            setResumeText(
              e.target.value
            )
          }
        />

      </Paper>

      {/* Job Description */}

      <Paper
        elevation={2}
        className="p-5 rounded-xl"
      >

        <Typography
          variant="h6"
          gutterBottom
        >
          Job Description
        </Typography>

        <TextField
          multiline
          rows={16}
          fullWidth
          placeholder="Paste Job Description..."
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(
              e.target.value
            )
          }
        />

      </Paper>

    </div>

    <Button
      variant="contained"
      fullWidth
      size="large"
      sx={{
        mt: 5,
        height: 55,
      }}
      disabled={loading}
      onClick={handleAnalyze}
    >

      {loading ? (

        <>

          <CircularProgress
            color="inherit"
            size={22}
          />

          <span className="ml-3">
            Analyzing...
          </span>

        </>

      ) : (

        "Analyze Match"

      )}

    </Button>

    {message && (

      <Alert
        sx={{ mt: 3 }}
        severity="error"
      >
        {message}
      </Alert>

    )}    {/* ================= RESULTS ================= */}

    {result && (
      <div className="mt-10">

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          AI Match Report
        </Typography>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Match Score */}

          <Paper
            elevation={3}
            className="rounded-xl p-6 text-center"
          >

            <Typography
              variant="h6"
              gutterBottom
            >
              Match Score
            </Typography>

            <CircularProgress
              variant="determinate"
              value={result?.matchScore || 0}
              size={130}
              thickness={5}
              color={
                (result?.matchScore || 0) >= 80
                  ? "success"
                  : (result?.matchScore || 0) >= 60
                  ? "warning"
                  : "error"
              }
            />

            <Typography
              variant="h3"
              fontWeight="bold"
              mt={3}
            >
              {result?.matchScore || 0}%
            </Typography>

          </Paper>

          {/* Matched Skills */}

          <Paper
            elevation={3}
            className="rounded-xl p-6"
          >

            <Typography
              variant="h6"
              color="success.main"
              gutterBottom
            >
              ✅ Matched Skills
            </Typography>

            <div className="flex flex-wrap gap-2">

              {(result?.matchedSkills || []).length === 0 ? (

                <Typography color="text.secondary">
                  No matched skills found
                </Typography>

              ) : (

                (result?.matchedSkills || []).map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  )
                )

              )}

            </div>

          </Paper>

          {/* Missing Skills */}

          <Paper
            elevation={3}
            className="rounded-xl p-6"
          >

            <Typography
              variant="h6"
              color="error.main"
              gutterBottom
            >
              ❌ Missing Skills
            </Typography>

            <div className="flex flex-wrap gap-2">

              {(result?.missingSkills || []).length === 0 ? (

                <Typography color="success.main">
                  No missing skills 🎉
                </Typography>

              ) : (

                (result?.missingSkills || []).map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="bg-red-100 text-red-700 px-3 py-2 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  )
                )

              )}

            </div>

          </Paper>

        </div>

        {/* Suggestions */}

        <Paper
          elevation={3}
          className="rounded-xl p-6 mt-6"
        >

          <Typography
            variant="h6"
            gutterBottom
          >
            💡 AI Suggestions
          </Typography>

          {(result?.suggestions || []).length === 0 ? (

            <Typography color="success.main">
              Your resume already matches this job quite well.
            </Typography>

          ) : (

            <div className="space-y-3">

              {(result?.suggestions || []).map(
                (item, index) => (

                  <Paper
                    key={index}
                    elevation={1}
                    className="p-3"
                  >
                    💡 {item}
                  </Paper>

                )
              )}

            </div>

          )}

        </Paper>

      </div>
    )}

  </Paper>

</div>

  );
};

export default JDMatcher;