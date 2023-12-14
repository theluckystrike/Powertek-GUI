import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
  const isAuthenticated = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      return true;
    } else {
      return false;
    }
  };

  return isAuthenticated() ? Component : <Navigate to="/login" replace />;
};

export default PrivateRoute;
