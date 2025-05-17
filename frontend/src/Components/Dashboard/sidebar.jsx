import React from "react";
import { useNavigate } from "react-router-dom";

import Icon from "./assests/main icon.png";
import DashboardIcon from "./assests/Frame.png";
import CalenderIcon from "./assests/Frame2.png";
import PersonIcon from "./assests/person-outline.png";
import ActivityIcon from "./assests/Activity.svg";
import SettingIcon from "./assests/Frame5.svg";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="bg-white h-screen w-20 flex flex-col items-center py-6 shadow-md">
      <div className="flex flex-col items-center space-y-8 mt-4">
        <button onClick={() => navigate("/")} className="bg-white border-0 focus:outline-none">
          <img src={Icon} alt="Main Icon" className="w-8 h-8" />
        </button>

        <button onClick={() => navigate("/Dashboard")} className="bg-white border-0 focus:outline-none">
          <img src={DashboardIcon} alt="Dashboard" className="w-6 h-6" />
        </button>

        <button onClick={() => navigate("/profile")} className="bg-white border-0 focus:outline-none">
          <img src={PersonIcon} alt="Profile" className="w-6 h-6" />
        </button>

        <button onClick={() => navigate("/gamepage")} className="bg-white border-0 focus:outline-none">
          <img src={ActivityIcon} alt="Activity" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
