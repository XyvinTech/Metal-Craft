import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem("4ZbQwXtY8uVrN5mP7kL3JhD6");
  const superAdmin = localStorage.getItem("superAdmin");

  if (!isAuth) {
    return superAdmin === "true" ? <Navigate to="/dashboard" /> : <Navigate to="/project" />;
  }

  return children;
};
