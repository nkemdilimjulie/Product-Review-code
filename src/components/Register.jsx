import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {  // ✅ Removed TypeScript type annotation (React.FormEvent)
    e.preventDefault();
    setError(""); // Reset error messages
    setSuccess(""); // Reset success message

    try {
      const response = await axios.post("http://localhost:8080/api/users/registration/", {
        username,
        email,
        password,
      });

      console.log("Registration successful:", response.data);
      setSuccess("Registration successful! Redirecting to login...");

      // Redirect to Login Page after 1.5 seconds
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Registration failed", err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
