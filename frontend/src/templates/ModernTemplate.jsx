import React from "react";

const ModernTemplate = ({ resume }) => {
  const { personalInfo, summary, skills, education, experience, projects } =
    resume;

  return (
    <div
      className="
      bg-white
      shadow-xl
      rounded-lg
      overflow-hidden
      min-h-[1123px]
      w-full
      "
    >
      <div className="grid grid-cols-3">
        {/* Left Sidebar */}

        <div
          className="
          bg-slate-800
          text-white
          p-6
          "
        >
          <h1
            className="
            text-3xl
            font-bold
            "
          >
            {personalInfo.fullName || "Your Name"}
          </h1>

          <div className="mt-8">
            <h2 className="font-bold text-lg border-b pb-2">Contact</h2>

            <p className="mt-3">{personalInfo.email}</p>

            <p>{personalInfo.phone}</p>

            <p>{personalInfo.location}</p>

            <p className="break-all">{personalInfo.linkedin}</p>

            <p className="break-all">{personalInfo.github}</p>
          </div>

          <div className="mt-10">
            <h2 className="font-bold text-lg border-b pb-2">Skills</h2>

            <div className="flex flex-wrap gap-2 mt-4">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="
                    bg-blue-500
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    "
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}

        <div className="col-span-2 p-8">
          <section>
            <h2
              className="
              text-2xl
              font-bold
              text-blue-700
              border-b
              pb-2
              "
            >
              Professional Summary
            </h2>

            <p className="mt-4 leading-7 text-gray-700">{summary}</p>
          </section>

          <section className="mt-8">
            <h2
              className="
              text-2xl
              font-bold
              text-blue-700
              border-b
              pb-2
              "
            >
              Education
            </h2>

            {education.map((edu, index) => (
              <div key={index} className="mt-5">
                <h3 className="font-bold text-lg">{edu.degree}</h3>

                <p>{edu.college}</p>

                <p className="text-gray-500">{edu.year}</p>

                <p>CGPA : {edu.cgpa}</p>
              </div>
            ))}
          </section>

          <section className="mt-8">
            <h2
              className="
              text-2xl
              font-bold
              text-blue-700
              border-b
              pb-2
              "
            >
              Experience
            </h2>

            {experience.length === 0 ? (
              <p className="mt-4 text-gray-500">No Experience Added</p>
            ) : (
              experience.map((exp, index) => (
                <div key={index} className="mt-5">
                  <h3 className="font-bold">{exp.role}</h3>

                  <p>{exp.company}</p>

                  <p className="text-gray-500">
                    {exp.startDate} -{exp.endDate}
                  </p>

                  <p className="mt-2">{exp.description}</p>
                </div>
              ))
            )}
          </section>

          <section className="mt-8">
            <h2
              className="
              text-2xl
              font-bold
              text-blue-700
              border-b
              pb-2
              "
            >
              Projects
            </h2>

            {projects.length === 0 ? (
              <p className="mt-4 text-gray-500">No Projects Added</p>
            ) : (
              projects.map((project, index) => (
                <div key={index} className="mt-5">
                  <h3 className="font-bold text-lg">{project.title}</h3>

                  <p className="text-blue-600">{project.techStack}</p>

                  <p className="mt-2">{project.description}</p>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      text-blue-700
                      underline
                      "
                  >
                    {project.github}
                  </a>
                </div>
              ))
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
