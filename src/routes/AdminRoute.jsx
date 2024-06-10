import React from "react";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";

function AdminRoute({ children }) {
  const [loggedUser, isLoading] = useUser();
  if (isLoading) return <LoadingSpinner />;
  if (loggedUser.role === "admin") return children;
  return <Navigate to="/" />;
}

export default AdminRoute;
