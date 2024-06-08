import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Shared/Nav/Nav";
import Footer from "../components/Shared/Footer/Footer";
import Container from "../components/Shared/Container";
function MainLayout() {
  return (
    <div>
      <Nav />
      <Container>
        <div className="min-h-[calc(100vh-360px)]">
          <Outlet />
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default MainLayout;
