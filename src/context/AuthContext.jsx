import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(undefined);

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
      try {
        const decodedUser = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        setUser(decodedUser);
      } catch (error) {
        console.error("Failed to decode token", error);
        logout();
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("jwt_token", token);
    setIsAuthenticated(true);
    try {
      const decodedUser = JSON.parse(atob(token.split(".")[1]));
      setUser(decodedUser);
    } catch (error) {
      console.error("Failed to decode token", error);
      logout();
    }
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
