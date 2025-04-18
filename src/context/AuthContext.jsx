import React, { createContext, useState, useContext, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext(undefined);
const AuthContext = createContext();
export default AuthContext;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      setIsAuthenticated(true);
      // We can't decode a DRF token, so we just store the fact that the user is logged in
    }
  }, []);
  
  const login = (token) => {
    localStorage.setItem("jwt_token", token);
    setIsAuthenticated(true);
    setUser("AuthenticatedUser"); // Placeholder, or fetch user if needed
  };
  
  const logout = () => {
    localStorage.removeItem("jwt_token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


