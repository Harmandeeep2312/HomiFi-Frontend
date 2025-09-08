import { createContext, useState, useEffect } from "react";
import api from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/checkAuth");
        if (res.data.loggedIn) {
          setIsLoggedIn(true);
          setUser(res.data.user);
        }
      } catch (err) {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
