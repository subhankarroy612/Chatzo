import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: any) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext && !authContext.isAuthenticated!) {
      navigate("/login");
    }
  }, []);
  return children;
};
