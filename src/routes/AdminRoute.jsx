import React from "react";
import useAdmin from "../hooks/useAdmin";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const [isAdmin, isLoading] = useAdmin();
  if (isLoading) return <LoadingSpinner />;
  if (isAdmin === "admin") return children;
  return <Navigate to="/" />;
}

export default AdminRoute;
