import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const Dashboard = () => {
  const { user } = useAuth();

  const cards = [
    {
      title: "Create Resume",
      description: "Build a professional ATS-friendly resume.",
      icon: <AddCircleIcon fontSize="large" />,
      link: "/create-resume",
    },
    {
      title: "My Resumes",
      description: "View and manage all saved resumes.",
      icon: <DescriptionIcon fontSize="large" />,
      link: "/my-resumes",
    },
    {
      title: "Upload Resume",
      description: "Upload an existing resume for analysis.",
      icon: <UploadFileIcon fontSize="large" />,
      link: "/upload-resume",
    },
    {
      title: "ATS Analysis",
      description: "Check ATS score and improvement suggestions.",
      icon: <AnalyticsIcon fontSize="large" />,
      link: "/ats-analysis",
    },
  ];

  return (
    <Container maxWidth="xl" className="py-10">
      {/* Header */}
      <Box className="mb-8">
        <Typography variant="h4" fontWeight="bold">
          Welcome, {user?.name || "User"} 👋
        </Typography>

        <Typography variant="body1" color="text.secondary" className="mt-2">
          Manage resumes, analyze ATS scores and improve your career profile.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} className="mb-8">
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">Total Resumes</Typography>

              <Typography variant="h3" fontWeight="bold">
                0
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">ATS Reports</Typography>

              <Typography variant="h3" fontWeight="bold">
                0
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">Uploaded Files</Typography>

              <Typography variant="h3" fontWeight="bold">
                0
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">Profile Score</Typography>

              <Typography variant="h3" fontWeight="bold">
                85%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Cards */}
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              elevation={4}
              className="hover:shadow-xl transition-all duration-300"
            >
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  {card.icon}

                  <Typography variant="h5" fontWeight="bold">
                    {card.title}
                  </Typography>
                </div>

                <Typography color="text.secondary" className="mb-4">
                  {card.description}
                </Typography>

                <Button
                  component={Link}
                  to={card.link}
                  variant="contained"
                  fullWidth
                >
                  Open
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
