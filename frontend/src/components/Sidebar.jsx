import { Link } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Resume Builder",
    path: "/create-resume",
  },
  {
    name: "Upload Resume",
    path: "/upload-resume",
  },
  {
    name: "ATS Analysis",
    path: "/analysis",
  },
  {
    name: "JD Matcher",
    path: "/jd-matcher",
  },
  {
    name: "Resume Rewriter",
    path: "/resume-rewriter",
  },
  {
    name: "AI Summary",
    path: "/summary",
  },
  {
    name: "Cover Letter",
    path: "/cover-letter",
  },
  {
    name: "Mock Interview",
    path: "/mock-interview",
  },
  {
    name: "Career Analysis",
    path: "/career-analysis",
  },
];

const Sidebar = () => {
  return (
    <div className="w-72 min-h-screen bg-slate-900 text-white p-5">

      <h2 className="text-2xl font-bold mb-8">
        AI Resume Builder
      </h2>

      <div className="space-y-3">

        {menu.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className="block p-3 rounded hover:bg-slate-700"
          >
            {item.name}
          </Link>

        ))}

      </div>
    </div>
  );
};

export default Sidebar;