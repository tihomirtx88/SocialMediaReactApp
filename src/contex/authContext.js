import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {

  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const login = async (input) => {
    const res = await axios.post("http://localhost:8000/auth/login", input, {
      withCredentials: true,
    });

    setCurrentUser(res.data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  // -----Logout

  const logOut = async () => {
    const res = await axios.get("http://localhost:8000/auth/logout", {
      withCredentials: true,
    });

    setCurrentUser({});
    localStorage.removeItem("user");
  };
  // -------Socket--------

  useEffect(() => {  
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", currentUser.name);
  }, [socket, currentUser.name]);
  //sent event newUser to server 

  return (
    <AuthContext.Provider value={{ currentUser, socket, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
