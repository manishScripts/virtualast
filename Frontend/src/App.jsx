import React, { useContext } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Customize from "./pages/Customize";
import { UserDatacontext } from "./assets/Context/UserContext";
function App() {
  const {user, setUser} = useContext(UserDatacontext);
  return (
    <Routes>
      <Route path="/" element={user?.assistantImage && user?.assistantName ?  <Home /> : <Navigate to= "/Customize"/>}/>
      <Route path="/signUp" element={!user?<SignUp /> : <Navigate to ="/"/>}/>
      <Route path="/signin" element={!user?<SignIn /> : <Navigate to ="/"/>}/>
      <Route path="/customize" element={user?<Customize /> : <Navigate to ="/signin"/>}/>
    </Routes>
  );
}

export default App;
