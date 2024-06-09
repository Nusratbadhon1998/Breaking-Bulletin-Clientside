import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar/Sidebar";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 bg-stone-800">
        <Sidebar />
      </div>
      <div className="flex-1  min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
