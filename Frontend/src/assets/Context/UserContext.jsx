import React, { useEffect ,useState } from "react";
import axios from "axios";
export const UserDatacontext = React.createContext();
const UserContext = ({ children }) => {
  const serverUrl = "http://localhost:8000"; // Replace with your server URL
  const [user, setUser] = useState(null);
  const handleCurrUser = async() =>{
    try{
      const result = await axios.get(`${serverUrl}/api/user/currentUser`,{withCredentials:true })
      setUser(result.data.user);
      console.log(result.data.user);
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    handleCurrUser();
  },[])
  const value = {
    serverUrl,user, setUser
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
