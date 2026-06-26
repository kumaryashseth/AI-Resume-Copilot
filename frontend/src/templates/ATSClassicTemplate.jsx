import React from "react";

const ATSClassicTemplate = ({ resume }) => {
  const {
    personalInfo,
    summary,
    skills,
    education,
    experience,
    projects,
  } = resume;

  return (
    <div
      className="bg-white text-black p-10 shadow-xl min-h-[1123px]"
      id="resume-preview"
    >
      {/* Header */}

      <div className="text-center border-b-2 pb-5">

        <h1 className="text-4xl font-bold">
          {personalInfo.fullName || "Your Name"}
        </h1>

        <p className="mt-2">
          {personalInfo.email} |
          {personalInfo.phone}
        </p>

        <p>
          {personalInfo.location}
        </p>

        <p>
          {personalInfo.linkedin}
        </p>

        <p>
          {personalInfo.github}
        </p>

      </div>

      {/* Summary */}

      <section className="mt-8">

        <h2 className="font-bold text-xl uppercase border-b">
          Professional Summary
        </h2>

        <p className="mt-3 leading-7">
          {summary}
        </p>

      </section>

      {/* Skills */}

      <section className="mt-8">

        <h2 className="font-bold text-xl uppercase border-b">
          Skills
        </h2>

        <ul className="list-disc ml-6 mt-3">

          {skills.map((skill, index) => (

            <li key={index}>
              {skill}
            </li>

          ))}

        </ul>

      </section>

      {/* Education */}

      <section className="mt-8">

        <h2 className="font-bold text-xl uppercase border-b">
          Education
        </h2>

        {education.map((edu, index) => (

          <div
            key={index}
            className="mt-4"
          >

            <h3 className="font-semibold">
              {edu.degree}
            </h3>

            <p>{edu.college}</p>

            <p>
              {edu.year}
            </p>

            <p>
              CGPA : {edu.cgpa}
            </p>

          </div>

        ))}

      </section>

      {/* Experience */}

      <section className="mt-8">

        <h2 className="font-bold text-xl uppercase border-b">
          Experience
        </h2>

        {
          experience.length === 0 ? (

            <p className="mt-3 text-gray-500">
              No Experience Added
            </p>

          ) : (

            experience.map((exp, index) => (

              <div
                key={index}
                className="mt-5"
              >

                <h3 className="font-semibold">
                  {exp.role}
                </h3>

                <p>{exp.company}</p>

                <p>
                  {exp.startDate} -
                  {exp.endDate}
                </p>

                <p className="mt-2">
                  {exp.description}
                </p>

              </div>

            ))

          )
        }

      </section>

      {/* Projects */}

      <section className="mt-8">

        <h2 className="font-bold text-xl uppercase border-b">
          Projects
        </h2>

        {
          projects.length === 0 ? (

            <p className="mt-3 text-gray-500">
              No Projects Added
            </p>

          ) : (

            projects.map((project, index) => (

              <div
                key={index}
                className="mt-5"
              >

                <h3 className="font-semibold">
                  {project.title}
                </h3>

                <p>
                  {project.techStack}
                </p>

                <p>
                  {project.description}
                </p>

                <p className="text-blue-600 break-all">
                  {project.github}
                </p>

              </div>

            ))

          )
        }

      </section>

    </div>
  );
};

export default ATSClassicTemplate;