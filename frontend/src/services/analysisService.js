import API from "./api";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const uploadResume = (file, onUploadProgress) => {
  const formData = new FormData();

  formData.append("resume", file);

  return API.post("/api/upload/resume", formData, {
    ...authHeader(),
    headers: {
      ...authHeader().headers,
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

export const analyzeResume = (id) => {
  return API.post(`/api/analyze/${id}`, {}, authHeader());
};

export const analyzeJD = (data) => {
  return API.post("/api/analyze/jd", data, authHeader());
};

export const rewritePoint = (data) => {
  return API.post("/api/analyze/rewrite", data, authHeader());
};

export const generateSummary = (resumeId) => {
  return API.post("/api/analyze/summary", { resumeId }, authHeader());
};

export const generateCoverLetter = (data) => {
  return API.post("/api/cover-letter/generate", data, authHeader());
};
