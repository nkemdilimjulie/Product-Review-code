import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_DOMAIN } from '../../configdomain';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Login - Get token
      const loginResponse = await axios.post(`${API_DOMAIN}/api/users/login/`, {
        username,
        password,
      });

      console.log("Login response:", loginResponse.data); // check if `token` exists here

      const token = loginResponse.data.key;

      console.log("Sending token:", token);

      // Step 2: Fetch user details using token
      const userDetailsResponse = await axios.get(
        `${API_DOMAIN}/api/users/user_details/`,
        {
          headers: {
            Authorization: `Token ${token}`,

          },
        }
      );

      const { user_type } = userDetailsResponse.data;

      // Step 3: Store user data in localStorage
      const userData = {
        username,
        token,
        user_type,
      };
      localStorage.setItem("user", JSON.stringify(userData));

      // Step 4: Login and navigate
      login(token);
      if (user_type === "marketer") {
        navigate("/marketers");
      } else {
        navigate("/review-mobiles");
      }
    } catch (error) {
      console.error("Login or user fetch failed", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleLogout = () => {
    logout();
    
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <div style={{ textAlign: 'center' }} className="alert alert-danger alert-dismissible fade show" role="alert">
        Logout Button displays if user is Authenticated and logged in
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      {isAuthenticated && (
        <div className="d-flex justify-content-end">
          <button className="btn btn-outline-danger mb-3" onClick={handleLogout}>
            🔒 Logout
          </button>
        </div>
      )}

      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            autoComplete="current-password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
