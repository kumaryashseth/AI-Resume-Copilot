import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api.js";

const Home = () => {

   useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await API.get("/");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="text-5xl font-bold mb-4 ">AI Resume Copilot</div>

        <p className="text-xl text-gray-600">
          Build, Analyze, and Optimize Your Resume with AI
        </p>
      </div>
    </>
  );
};

export default Home;
