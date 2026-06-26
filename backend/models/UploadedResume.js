import mongoose from "mongoose";

const uploadedResumeSchema = new mongoose.Schema({
  
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  
  fileName: String,
  originalName : String,
  extractedText: String,
},{
  timestamps:true,
});

export default mongoose.model("UploadedResume", uploadedResumeSchema);
