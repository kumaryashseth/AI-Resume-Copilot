import React from "react";

const DeveloperTemplate = ({ resume }) => {
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
      className="bg-slate-900 text-white rounded-xl overflow-hidden shadow-xl min-h-[1123px]"
    >
      {/* Header */}

      <div className="bg-green-600 p-8">

        <h1 className="text-5xl font-bold">
          {personalInfo.fullName || "Your Name"}
        </h1>

        <p className="mt-2">
          Full Stack Developer
        </p>

      </div>

      <div className="grid grid-cols-3">

        {/* Sidebar */}

        <div className="bg-slate-800 p-6">

          <h2 className="text-green-400 text-xl font-bold">
            CONTACT
          </h2>

          <div className="mt-4 space-y-3">

            <p>{personalInfo.email}</p>

            <p>{personalInfo.phone}</p>

            <p>{personalInfo.location}</p>

            <p className="break-all">
              {personalInfo.github}
            </p>

            <p className="break-all">
              {personalInfo.linkedin}
            </p>

          </div>

          <h2 className="text-green-400 text-xl font-bold mt-10">
            TECH STACK
          </h2>

          <div className="flex flex-wrap gap-2 mt-4">

            {skills.map((skill,index)=>(
              <span
                key={index}
                className="bg-green-500 px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>

        {/* Content */}

        <div className="col-span-2 p-8">

          <section>

            <h2 className="text-green-400 text-2xl font-bold border-b border-green-400 pb-2">
              ABOUT
            </h2>

            <p className="mt-4 leading-8">
              {summary}
            </p>

          </section>

          <section className="mt-8">

            <h2 className="text-green-400 text-2xl font-bold border-b border-green-400 pb-2">
              EXPERIENCE
            </h2>

            {
              experience.length === 0 ? (
                <p className="mt-4 text-gray-400">
                  No Experience Added
                </p>
              ) : (
                experience.map((exp,index)=>(
                  <div
                    key={index}
                    className="mt-6"
                  >
                    <h3 className="font-bold">
                      {exp.role}
                    </h3>

                    <p>{exp.company}</p>

                    <p className="text-gray-400">
                      {exp.startDate} - {exp.endDate}
                    </p>

                    <p className="mt-2">
                      {exp.description}
                    </p>

                  </div>
                ))
              )
            }

          </section>

          <section className="mt-8">

            <h2 className="text-green-400 text-2xl font-bold border-b border-green-400 pb-2">
              PROJECTS
            </h2>

            {
              projects.map((project,index)=>(
                <div
                  key={index}
                  className="mt-6"
                >
                  <h3 className="font-bold">
                    {project.title}
                  </h3>

                  <p className="text-green-300">
                    {project.techStack}
                  </p>

                  <p className="mt-2">
                    {project.description}
                  </p>

                  <p className="text-blue-400 break-all">
                    {project.github}
                  </p>

                </div>
              ))
            }

          </section>

          <section className="mt-8">

            <h2 className="text-green-400 text-2xl font-bold border-b border-green-400 pb-2">
              EDUCATION
            </h2>

            {
              education.map((edu,index)=>(
                <div
                  key={index}
                  className="mt-5"
                >
                  <h3 className="font-bold">
                    {edu.degree}
                  </h3>

                  <p>{edu.college}</p>

                  <p>{edu.year}</p>

                </div>
              ))
            }

          </section>

        </div>

      </div>

    </div>
  );
};

export default DeveloperTemplate;