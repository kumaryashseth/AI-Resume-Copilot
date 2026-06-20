import React from "react";

import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="p-10">
      <h1 className="text-3xl">Welcome {user?.name}</h1>
    </div>
  );
};

export default Dashboard;
