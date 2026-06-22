import { Paper } from "@mui/material";

const ResumePreview = ({
  resumeData,
}) => {

  return (

    <Paper
      elevation={3}
      className="p-6 min-h-screen"
    >

      <h1 className="text-3xl font-bold">

        {
          resumeData.personalInfo
            .fullName
        }

      </h1>

      <p>
        {
          resumeData.personalInfo
            .email
        }
      </p>

      <hr className="my-4" />

      <h2 className="font-bold text-xl">
        Skills
      </h2>

      <ul>

        {
          resumeData.skills.map(
            (
              skill,
              index
            ) => (
              <li key={index}>
                • {skill}
              </li>
            )
          )
        }

      </ul>

      <h2
        className="
        font-bold
        text-xl
        mt-6"
      >
        Education
      </h2>

      {
        resumeData.education.map(
          (edu, index) => (

            <div key={index}>

              <p>
                {edu.degree}
              </p>

              <p>
                {edu.college}
              </p>

            </div>
          )
        )
      }

    </Paper>

  );
};

export default ResumePreview;