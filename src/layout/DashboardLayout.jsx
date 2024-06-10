import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar/Sidebar";
import ResponsiveNav from "../components/Shared/Nav/ResponsiveNav";
import MenuItem from "../components/Dashboard/Sidebar/Menu/MenuItem";
import { VscGraph } from "react-icons/vsc";
import { FaUsers } from "react-icons/fa6";
import { IoNewspaperOutline } from "react-icons/io5";
import { PiArticleNyTimes } from "react-icons/pi";

function DashboardLayout() {
  const navItem = (
    <div className="flex flex-col flex-1 ">
      <MenuItem icon={VscGraph} label="Statistics" address="/dashboard" />
      <MenuItem icon={FaUsers} label="All Users" address="all-users" />
      <MenuItem
        icon={PiArticleNyTimes}
        label="All Articles"
        address="all-articles"
      />
      <MenuItem
        icon={IoNewspaperOutline}
        label="Add Publisher"
        address="add-publisher"
      />
    </div>
  );
  return (
    <div>
      <ResponsiveNav navItem={navItem} />
      <div className="flex min-h-screen">
        <div className="hidden lg:block w-1/4 bg-stone-800">
          <Sidebar />
        </div>

        <div className="flex-1 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
