import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/signUp" element={<SignUp />}/>
      <Route path="/signin" element={<SignIn />}/>
    </Routes>
  );
}

export default App;
