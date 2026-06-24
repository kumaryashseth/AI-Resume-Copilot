import mongoose from "mongoose";

const jdAnalysisSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    },
    matchScore: {
        type: Number,
        
    },
    matchedSkills: {
        type: [String],
       
    },
    missingSkills: {
        type: [String],
        
    },
    recommendations: {
        type: [String],
        
    },
    jobDescription: {
        type: String,
        
    },
    
    
},{
    timestamps:true,
});

const JDAnalysis = mongoose.model("JDAnalysis", jdAnalysisSchema);

export default JDAnalysis;