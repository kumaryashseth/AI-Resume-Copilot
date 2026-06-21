import { Typography, TextField, Button } from "@mui/material";

const EducationSection = ({ resumeData, setResumeData }) => {
  const addEducation = () => {
    setResumeData({
      ...resumeData,

      education: [
        ...resumeData.education,

        {
          degree: "",
          college: "",
          year: "",
          cgpa: "",
        },
      ],
    });
  };

  const handleChange = (index, field, value) => {
    const updated = [...resumeData.education];

    updated[index][field] = value;

    setResumeData({
      ...resumeData,
      education: updated,
    });
  };

  return (
    <div>
      <Typography variant="h5">Education</Typography>

      {resumeData.education.map((edu, index) => (
          
        <div key={index} className="grid gap-4 mt-4">
          <Typography className="font-bold mt-6">Field {index + 1}</Typography>
          <TextField
            label="Degree"
            value={edu.degree}
            onChange={(e) => handleChange(index, "degree", e.target.value)}
          />

          <TextField
            label="College"
            value={edu.college}
            onChange={(e) => handleChange(index, "college", e.target.value)}
          />

          <TextField
            label="Year"
            value={edu.year}
            onChange={(e) => handleChange(index, "year", e.target.value)}
          />

          <TextField
            label="CGPA"
            value={edu.cgpa}
            onChange={(e) => handleChange(index, "cgpa", e.target.value)}
          />
        </div>
      ))}

      <Button variant="outlined" className="mt-4" onClick={addEducation}>
        Add Education
      </Button>
    </div>
  );
};

export default EducationSection;
