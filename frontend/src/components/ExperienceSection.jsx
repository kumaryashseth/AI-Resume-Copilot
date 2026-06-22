import {
  Typography,
  TextField,
  Button,
} from "@mui/material";

const ExperienceSection = ({
  resumeData,
  setResumeData,
}) => {

  const addExperience = () => {

    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });

  };

  const handleChange = (
    index,
    field,
    value
  ) => {

    const updated =
      [...resumeData.experience];

    updated[index][field] =
      value;

    setResumeData({
      ...resumeData,
      experience: updated,
    });

  };

  return (
    <div className="mt-8">

      <Typography variant="h5">
        Experience
      </Typography>

      {
        resumeData.experience.map(
          (exp, index) => (

            <div
              key={index}
              className="
              grid
              md:grid-cols-2
              gap-4
              mt-4"
            >

              <TextField
                label="Company"
                value={exp.company}
                onChange={(e) =>
                  handleChange(
                    index,
                    "company",
                    e.target.value
                  )
                }
              />

              <TextField
                label="Role"
                value={exp.role}
                onChange={(e) =>
                  handleChange(
                    index,
                    "role",
                    e.target.value
                  )
                }
              />

              <TextField
                label="Start Date"
                value={exp.startDate}
                onChange={(e) =>
                  handleChange(
                    index,
                    "startDate",
                    e.target.value
                  )
                }
              />

              <TextField
                label="End Date"
                value={exp.endDate}
                onChange={(e) =>
                  handleChange(
                    index,
                    "endDate",
                    e.target.value
                  )
                }
              />

            </div>
          )
        )
      }

      <Button
        variant="outlined"
        className="mt-4"
        onClick={addExperience}
      >
        Add Experience
      </Button>

    </div>
  );
};

export default ExperienceSection;