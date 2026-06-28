import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  TextField,
} from "@mui/material";

import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

import API from "../services/api";

const MockInterview = () => {
  const [resumeId, setResumeId] = useState("");

  const [loading, setLoading] = useState(false);

  const [interview, setInterview] = useState(null);

  const [message, setMessage] = useState("");

  const handleGenerate = async () => {
    if (!resumeId.trim()) {
      setMessage("Resume ID is required.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setInterview(null);

      const token = localStorage.getItem("token");

      const response = await API.post(
        "/api/mock-interview/generate",
        { resumeId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setInterview(response.data);
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Unable to generate interview."
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

    <div className="flex items-center gap-3 mb-8">

      <RecordVoiceOverIcon
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
          AI Mock Interview
        </Typography>

        <Typography color="text.secondary">
          Generate technical, HR and behavioral interview questions.
        </Typography>

      </div>

    </div>

    <TextField
      fullWidth
      label="Uploaded Resume ID"
      value={resumeId}
      onChange={(e) =>
        setResumeId(e.target.value)
      }
    />

    <Button
      fullWidth
      variant="contained"
      size="large"
      sx={{
        mt: 4,
        height: 55,
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
        "Generate Interview"
      )}

    </Button>

    {message && (
      <Alert
        severity="error"
        sx={{ mt: 3 }}
      >
        {message}
      </Alert>
    )}    {interview && (
      <div className="mt-10">

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          Interview Questions
        </Typography>

        {[
          {
            title: "Technical Questions",
            data: interview.technical,
          },
          {
            title: "HR Questions",
            data: interview.hr,
          },
          {
            title: "Behavioral Questions",
            data: interview.behavioral,
          },
        ].map((section) => (
          <Paper
            key={section.title}
            elevation={3}
            className="p-6 rounded-xl mb-6"
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
            >
              {section.title}
            </Typography>

            {(section.data || []).map(
              (item, index) => (
                <Paper
                  key={index}
                  elevation={1}
                  className="p-4 mb-4"
                >
                  <Typography fontWeight="bold">
                    Q{index + 1}. {item.question}
                  </Typography>

                  <Typography
                    color="primary"
                    mt={1}
                  >
                    Difficulty: {item.difficulty}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    mt={1}
                  >
                    💡 {item.tip}
                  </Typography>
                </Paper>
              )
            )}
          </Paper>
        ))}

      </div>
    )}

  </Paper>

</div>

  );
};

export default MockInterview;