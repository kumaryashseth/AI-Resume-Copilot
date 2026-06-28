import { Avatar } from "@mui/material";

const Topbar = () => {

  return (

    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      <Avatar>
        Y
      </Avatar>

    </div>

  );

};

export default Topbar;