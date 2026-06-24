import API from "../services/api.js";

const authHeader=()=>({
    headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
    }
})

export const uploadResume=(file,onUploadProgress)=>{
    const formData=new FormData();
    formData.append("file",file);
    return API.post("/api/upload/resume",formData,{
        headers:{
            ...authHeader().headers,
            onUploadProgress
        },
    });
}

export const analyzeResume=(id)=>{
    return API.post(`/api/analyze/${id}`,{},authHeader());
}

export const analyzeJD=(data)=>{
    return API.post("/api/analyze/jd",data,authHeader())
}

export const rewritePoint=(data)=>{
    return API.post("/api/analyze/rewrite",data,authHeader())
}
