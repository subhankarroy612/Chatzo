import { Route, Routes } from "react-router-dom";
import Signup from "../../Signup";
import Login from "../../Login";
import Message from "../../Message";
import React from "react";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Message />} />
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};

export default Router;
