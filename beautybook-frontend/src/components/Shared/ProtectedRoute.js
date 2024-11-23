import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  return token ? (
    // children
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location?.pathname }} replace={true} />
  );
};

export default ProtectedRoute;
