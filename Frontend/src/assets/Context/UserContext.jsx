import React from "react";
export const UserDatacontext = React.createContext();
const UserContext = ({ children }) => {
  const serverUrl = "http://localhost:8000"; // Replace with your server URL
  const value = {
    serverUrl,
  };
  return (
    <div>
      <UserDatacontext.Provider value={value}>
        {/* This is where you can pass down any user data or functions */}
        {children}
      </UserDatacontext.Provider>
    </div>
  );
};
export default UserContext;
