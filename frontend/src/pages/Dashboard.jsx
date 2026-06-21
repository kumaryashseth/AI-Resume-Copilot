import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@mui/material";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="p-10">
      <h1 className="text-3xl">Welcome {user?.name}</h1>
      <Button component={Link} to="/create-resume" variant="contained">
        Create Resume
      </Button>
    </div>
  );
};

export default Dashboard;
