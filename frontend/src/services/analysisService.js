import API from "./api";

const authHeader =()=>({
    headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
})

export const uploadResume=(file,onUploadProgress)=>{
    
    const formData= new FormData();
    formData.append("resume",file);
    
    return API.post("/api/upload/resume",formData,{
        ...authHeader(),
        onUploadProgress
    });
}

export const analyzeResume=(id)=>{
    return API.post(`/api/analyze/${id}`,{},authHeader())
}

export const analyzeJD=(data)=>{
    return API.post("/api/analyze/jd",data,authHeader())
}

export const rewritePoint=(data)=>{
    return API.post("/api/analyze/rewrite",data,authHeader())
}

export const generateSummary =(resumeId)=>{
    const token=localStorage.getItem("token");
    return API.post('/api/analyze/summary',resumeId,authHeader())
}