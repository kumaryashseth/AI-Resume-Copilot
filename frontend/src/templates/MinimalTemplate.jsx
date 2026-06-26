import React from "react";

const MinimalTemplate = ({ resume }) => {
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
      id="resume-preview"
      className="bg-white p-10 shadow-lg rounded-lg min-h-[1123px]"
    >
      <h1 className="text-5xl font-light">
        {personalInfo.fullName}
      </h1>

      <p className="mt-2 text-gray-600">
        {personalInfo.email}
      </p>

      <p className="text-gray-600">
        {personalInfo.phone}
      </p>

      <hr className="my-8"/>

      <section>

        <h2 className="text-xl font-semibold">
          About
        </h2>

        <p className="mt-3 leading-8">
          {summary}
        </p>

      </section>

      <section className="mt-8">

        <h2 className="text-xl font-semibold">
          Skills
        </h2>

        <div className="flex flex-wrap gap-2 mt-4">

          {skills.map((skill,index)=>(

            <span
              key={index}
              className="border rounded-full px-3 py-1"
            >
              {skill}
            </span>

          ))}

        </div>

      </section>

      <section className="mt-8">

        <h2 className="text-xl font-semibold">
          Education
        </h2>

        {education.map((edu,index)=>(

          <div
            key={index}
            className="mt-4"
          >

            <h3 className="font-semibold">
              {edu.degree}
            </h3>

            <p>{edu.college}</p>

            <p className="text-gray-500">
              {edu.year}
            </p>

          </div>

        ))}

      </section>

      <section className="mt-8">

        <h2 className="text-xl font-semibold">
          Experience
        </h2>

        {experience.map((exp,index)=>(

          <div
            key={index}
            className="mt-4"
          >

            <h3 className="font-semibold">
              {exp.role}
            </h3>

            <p>{exp.company}</p>

            <p className="text-gray-500">
              {exp.startDate} -
              {exp.endDate}
            </p>

            <p>{exp.description}</p>

          </div>

        ))}

      </section>

      <section className="mt-8">

        <h2 className="text-xl font-semibold">
          Projects
        </h2>

        {projects.map((project,index)=>(

          <div
            key={index}
            className="mt-4"
          >

            <h3 className="font-semibold">
              {project.title}
            </h3>

            <p>{project.techStack}</p>

            <p>{project.description}</p>

          </div>

        ))}

      </section>

    </div>
  );
};

export default MinimalTemplate;