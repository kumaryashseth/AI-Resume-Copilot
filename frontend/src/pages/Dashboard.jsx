import React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import WorkIcon from "@mui/icons-material/Work";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

const Dashboard = () => {
  const { user } = useAuth();

  const dashboardCards = [
    {
      title: "Create Resume",
      icon: <DescriptionIcon fontSize="large" />,
      path: "/create-resume",
    },
    {
      title: "My Resumes",
      icon: <FolderIcon fontSize="large" />,
      path: "/my-resumes",
    },
    {
      title: "Upload Resume",
      icon: <UploadFileIcon fontSize="large" />,
      path: "/upload-resume",
    },
    {
      title: "JD Matcher",
      icon: <WorkIcon fontSize="large" />,
      path: "/jd-matcher",
    },
    {
      title: "ATS Analysis",
      icon: <AnalyticsIcon fontSize="large" />,
      path: "/analysis",
    },
    {
      title: "Resume Rewriter",
      icon: <AutoFixHighIcon fontSize="large" />,
      path: "/resume-rewriter",
    },
  ];

  return (
    <Box className="p-8">
      <Typography variant="h4" gutterBottom className="font-bold">
        Welcome {user?.name} 😉
      </Typography>

      <Typography variant="body1" className="text-gray-600 mb-8">
        Manage and optimize your career using AI Tools
      </Typography>

      <Grid container spacing={3}>
        {dashboardCards.map((card, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Link to={card.path} className="no_underline">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full">
                <CardContent>
                  <div className="flex flex-col items-center justify-center h-full">
                    {card.icon}
                    <Typography variant="h6" className="text-gray-800 mt-4">
                      {card.title}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
