import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");  // password1 state
  const [password2, setPassword2] = useState("");  // password2 state
  const [isMarketer, setIsMarketer] = useState(false);  // Marketer checkbox state
  const [error, setError] = useState("");  // Error state
  const [success, setSuccess] = useState("");  // Success state
  const navigate = useNavigate();  // Used for navigation after registration

  const handleSubmit = async (e) => {  
    e.preventDefault();  // Prevents default form submission
    setError("");  // Reset error messages
    setSuccess("");  // Reset success message

    // Check if passwords match before submitting
    if (password1 !== password2) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/users/registration/", {
        username,
        password1,  // Send password1
        password2,  // Send password2
        is_marketer: isMarketer,  // Send marketer flag
      });

      console.log("Registration successful:", response.data);
      setSuccess("Registration successful! Redirecting to login...");

      // Redirect to Login Page after 1.5 seconds
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Registration failed", err.response?.data || err.message);

      // Handle errors and set them to display
      const errorMessage =
        err.response?.data?.username?.[0] ||
        err.response?.data?.password1?.[0] ||
        err.response?.data?.password2?.[0] ||
        err.response?.data?.non_field_errors?.[0] ||
        "Registration failed. Please try again.";

      setError(errorMessage);  // Display error message
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
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password1" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password1"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password2" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>

        {/* Checkbox for Marketer Account */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="marketerCheckbox"
            checked={isMarketer}
            onChange={(e) => setIsMarketer(e.target.checked)}
          />
          <label htmlFor="marketerCheckbox" className="form-check-label">
            <small>Use this option only to create a marketer account for advertisement purposes.</small>
          </label>
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
