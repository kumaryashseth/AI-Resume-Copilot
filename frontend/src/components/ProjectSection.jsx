import {
  Typography,
  TextField,
  Button,
} from "@mui/material";

const ProjectsSection = ({
  resumeData,
  setResumeData,
}) => {

  const addProject = () => {

    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          title: "",
          techStack: "",
          github: "",
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
      [...resumeData.projects];

    updated[index][field] =
      value;

    setResumeData({
      ...resumeData,
      projects: updated,
    });

  };

  return (
    <div className="mt-8">

      <Typography variant="h5">
        Projects
      </Typography>

      {
        resumeData.projects.map(
          (project, index) => (

            <div
              key={index}
              className="
              grid
              md:grid-cols-2
              gap-4
              mt-4"
            >

              <TextField
                label="Project Title"
                value={project.title}
                onChange={(e) =>
                  handleChange(
                    index,
                    "title",
                    e.target.value
                  )
                }
              />

              <TextField
                label="Tech Stack"
                value={project.techStack}
                onChange={(e) =>
                  handleChange(
                    index,
                    "techStack",
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
        onClick={addProject}
      >
        Add Project
      </Button>

    </div>
  );
};

export default ProjectsSection;