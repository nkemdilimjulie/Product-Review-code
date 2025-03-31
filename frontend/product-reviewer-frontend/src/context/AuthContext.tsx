import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  user: object | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      setIsAuthenticated(true);
      // Optionally, decode the token to get the user info
      const decodedUser = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      setUser(decodedUser);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("jwt_token", token);
    setIsAuthenticated(true);
    const decodedUser = JSON.parse(atob(token.split(".")[1]));
    setUser(decodedUser);
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
