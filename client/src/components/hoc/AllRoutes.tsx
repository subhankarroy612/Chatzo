import { Route, Routes, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Signup from "../../Signup";
import Login from "../../Login";
import Message from "../../Message";
import React from "react";
import { AuthProvider } from "../../context/AuthContext";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthProvider>
            <Message />
          </AuthProvider>
        }
      />
      <Route path="/signup" element={<Signup />}></Route>
      <Route
        path="/login"
        element={
          <AuthProvider>
            <Login />
          </AuthProvider>
        }
      ></Route>
    </Routes>
  );
};

export default Router;
