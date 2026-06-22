import { useEffect, useState } from "react";

import API from "../services/api";

const MyResumes = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      const token = localStorage.getItem("token");

      const res = await API.get("/api/resume/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumes(res.data);
    };

    fetchResumes();
  }, []);

  return (
    <div className="p-8">
      <h1
        className="
        text-3xl
        mb-6"
      >
        My Resumes
      </h1>

      {resumes.map((resume) => (
        <div
          key={resume._id}
          className="
              border
              p-4
              mb-4
              rounded"
        >
          <h2>{resume.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default MyResumes;
