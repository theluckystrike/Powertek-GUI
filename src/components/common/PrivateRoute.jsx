import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ Component }) => {
  const isAuthenticated = () => {
    return !!Cookies.get("isAuthenticated");
  };

  return isAuthenticated() ? Component : <Navigate to="/login" replace />;
};

export default PrivateRoute;
