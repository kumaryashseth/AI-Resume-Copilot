import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {

  return (

    <div>

      <div className="grid lg:grid-cols-4 gap-5">

        <DashboardCard
          title="Resumes"
          value="5"
          icon="📄"
        />

        <DashboardCard
          title="ATS Score"
          value="92%"
          icon="⭐"
        />

        <DashboardCard
          title="JD Match"
          value="87%"
          icon="🎯"
        />

        <DashboardCard
          title="Cover Letters"
          value="3"
          icon="✉️"
        />

      </div>

    </div>

  );

};

export default Dashboard;