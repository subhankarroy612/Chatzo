import { Route, Routes, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Signup from "../../Signup";
import Login from "../../Login";
import Message from "../../Message";
import React from "react";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Message />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};

export default Router;
