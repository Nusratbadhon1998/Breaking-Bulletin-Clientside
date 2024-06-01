import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Shared/Nav/Nav";
import Footer from "../components/Shared/Footer/Footer";
function MainLayout() {
  return (
    <div>
      <Nav />
      <div className="min-h-[calc(100vh-360px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
