import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ redirectTo, condition, Component }) => {
  return condition ? <Navigate to={redirectTo} /> : <Component />;
};

export default AuthRoute;
