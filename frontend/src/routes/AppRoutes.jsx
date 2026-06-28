import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import CreateResume from "../pages/CreateResume";
import MyResumes from "../pages/MyResume";
import UploadResume from "../pages/UploadResume";
import AnalysisDashboard from "../pages/AnalysisDashboard";
import JDMatcher from "../pages/JDMatcher";
import ResumeRewriter from "../pages/ResumeRewriter";

import SummaryGenerator from "../pages/SummaryGenerator";
import CoverLetter from "../pages/CoverLetter";
import MockInterview from "../pages/MockInterview";
import CareerAnalysis from "../pages/CareerAnalysis";

const AppRoutes = () => {
  return (
    <Routes>


      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/create-resume"
          element={<CreateResume />}
        />

        <Route
          path="/my-resumes"
          element={<MyResumes />}
        />

        <Route
          path="/upload-resume"
          element={<UploadResume />}
        />

        <Route
          path="/analysis"
          element={<AnalysisDashboard />}
        />

        <Route
          path="/jd-matcher"
          element={<JDMatcher />}
        />

        <Route
          path="/resume-rewriter"
          element={<ResumeRewriter />}
        />


        <Route
          path="/summary"
          element={<SummaryGenerator />}
        />


        <Route
          path="/cover-letter"
          element={<CoverLetter />}
        />

        <Route
          path="/mock-interview"
          element={<MockInterview />}
        />

        <Route
          path="/career-analysis"
          element={<CareerAnalysis />}
        />

      </Route>

    </Routes>
  );
};

export default AppRoutes;