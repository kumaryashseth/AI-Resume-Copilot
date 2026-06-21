import API from "./api";

export const createResume = async (resumeData) => {

    const token = localStorage.getItem("token");
  const response = await API.post("/api/resume", resumeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
