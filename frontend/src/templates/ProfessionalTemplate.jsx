import React from "react";

const ProfessionalTemplate = ({ resume }) => {

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
      className="bg-white p-12 shadow-xl min-h-[1123px]"
    >

      <div className="text-center">

        <h1 className="text-5xl font-bold text-slate-800">
          {personalInfo.fullName}
        </h1>

        <p className="mt-3 text-gray-600">

          {personalInfo.email} |

          {personalInfo.phone} |

          {personalInfo.location}

        </p>

      </div>

      <hr className="my-8"/>

      <section>

        <h2 className="text-2xl font-bold text-slate-700">
          Professional Summary
        </h2>

        <p className="mt-4 leading-8">
          {summary}
        </p>

      </section>

      <section className="mt-8">

        <h2 className="text-2xl font-bold text-slate-700">
          Skills
        </h2>

        <div className="grid grid-cols-3 gap-3 mt-4">

          {skills.map((skill,index)=>(
            <div
              key={index}
              className="border rounded p-2 text-center"
            >
              {skill}
            </div>
          ))}

        </div>

      </section>

      <section className="mt-8">

        <h2 className="text-2xl font-bold text-slate-700">
          Experience
        </h2>

        {
          experience.map((exp,index)=>(
            <div
              key={index}
              className="mt-5"
            >
              <h3 className="font-bold">
                {exp.role}
              </h3>

              <p>{exp.company}</p>

              <p className="text-gray-500">
                {exp.startDate} -
                {exp.endDate}
              </p>

              <p className="mt-2">
                {exp.description}
              </p>

            </div>
          ))
        }

      </section>

      <section className="mt-8">

        <h2 className="text-2xl font-bold text-slate-700">
          Projects
        </h2>

        {
          projects.map((project,index)=>(
            <div
              key={index}
              className="mt-5"
            >
              <h3 className="font-bold">
                {project.title}
              </h3>

              <p>{project.techStack}</p>

              <p>{project.description}</p>

            </div>
          ))
        }

      </section>

      <section className="mt-8">

        <h2 className="text-2xl font-bold text-slate-700">
          Education
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

  );

};

export default ProfessionalTemplate;