import {  Routes, Route } from "react-router-dom";

import Home from "../pages/Home";

import Login from "../pages/Login";

import Register from "../pages/Register";

import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "../pages/Dashboard";
import CreateResume from "../pages/CreateResume";


const AppRoutes = () => {
  return (
    <>
     
      
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/create-resume" element={<ProtectedRoute><CreateResume /></ProtectedRoute>} />
        </Routes>
      
    </>
  );
};

export default AppRoutes;
