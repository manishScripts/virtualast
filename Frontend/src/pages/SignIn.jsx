import React from 'react'
import  { useContext } from "react";
import bg from "../assets/authBg.png";
import "../App.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDatacontext } from "../assets/Context/UserContext";


const SignIn = () => {
  const [showpass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPass((prev) => !prev);
  };

  const { serverUrl } = useContext(UserDatacontext);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log(result);
      setLoading(false);
    } catch (error) {
      console.error("Error during Login:", error);
      setLoading(false);  
      setError(error.response.data.message);
    }
  };
  return (
    <div
      className="w-full h-[100vh] bg-cover flex justify-center items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        className="w-[90%] h-[500px] max-w-[500px] bg-[#00000083] backdrop-blur-md shadow-lg shadow-blue-950 rounded-lg "
        onClick={handleSubmit}
        
      >
        <div className="flex flex-col items-center justify-center h-full w-[90%] mx-auto p-6">
          <h1 className="text-3xl font-bold text-white mb-6">
            LOGIN to <span className="text-blue-400">Virtual Assistant</span>{" "}
          </h1>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 rounded-full bg-transparent border-white border-2 text-white outline-none "
            required
            onChange={(e) => setemail(e.target.value)}
            value={email}
          />
          <div className="relative w-full mb-4">
            <input
              type={showpass ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 rounded-full bg-transparent border-white border-2 text-white outline-none placeholder-gray-300"
              required
              onChange={(e) => setpassword(e.target.value)}
              value={password}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-[14px] right-[20px] text-white hover:text-gray-300 transition-colors"
            >
              {showpass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          {error.length > 0 && <p className="text-red-500 text-sm">*{error}</p>}
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 font-bold text-18px cursor-pointer" disabled={loading}
          > 
            {loading ? "Loading..." : "SignIn"}
          </button>
          <p
            className="text-white mt-4 text-18px cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Not have an account ?{" "}
            <span className="text-black">Sign Up</span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignIn