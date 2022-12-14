import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (input) => {
    const res = await axios.post("http://localhost:8000/auth/login", input, {
      withCredentials: true
    });

    setCurrentUser(res.data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const logOut = async () => {
    const res = await axios.get("http://localhost:8000/auth/logout", {
      withCredentials: true
    })
    setCurrentUser({})
    localStorage.removeItem("user")
}

  return (
    <AuthContext.Provider value={{ currentUser, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
