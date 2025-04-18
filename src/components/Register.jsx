import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // ✅ Import auth context
import { API_DOMAIN } from '../../configdomain';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isMarketer, setIsMarketer] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Reset form fields when the component loads
    setUsername("");
    setPassword1("");
    setPassword2("");
    setIsMarketer(false);
    setError("");
    setSuccess("");
  }, []);

  const { isAuthenticated, logout } = useAuth();  // ✅ Use auth context


  useEffect(() => {
    // Reset form fields when the component loads
    setUsername("");
    setPassword1("");
    setPassword2("");
    setIsMarketer(false);
    setError("");
    setSuccess("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password1 !== password2) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(`${API_DOMAIN}/api/users/registration/`, {
        username,
        password1,
        password2,
        is_marketer: isMarketer,
      });

      console.log("Registration successful:", response.data);
      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Registration failed", err.response?.data || err.message);

      const errorMessage =
        err.response?.data?.username?.[0] ||
        err.response?.data?.password1?.[0] ||
        err.response?.data?.password2?.[0] ||
        err.response?.data?.non_field_errors?.[0] ||
        "Registration failed. Please try again.";

      setError(errorMessage);
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container mt-4">
      {/* ✅ Logout button if already authenticated */}
      {isAuthenticated && (
        <div className="d-flex justify-content-end">
          <button className="btn btn-outline-danger mb-3" onClick={handleLogout}>
            🔒 Logout
          </button>
        </div>
      )}

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




// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";  // Auth context
// import { API_DOMAIN } from '../configdomain';
// import { useLocation } from "react-router-dom";

// const Register = () => {
//   const location = useLocation();
//   const [username, setUsername] = useState("");
//   const [password1, setPassword1] = useState("");
//   const [password2, setPassword2] = useState("");
//   const [isMarketer, setIsMarketer] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const navigate = useNavigate();
//   const { isAuthenticated, logout } = useAuth();

//   const hasInitialized = useRef(false);

//   // ✅ Reset form on mount
  
//   const lastPathRef = useRef(location.pathname);

//   useEffect(() => {
//     if (location.pathname === "/register" && lastPathRef.current !== "/register") {
//       setUsername("");
//       setPassword1("");
//       setPassword2("");
//       setIsMarketer(false);
//       setError("");
//       setSuccess("");
//       console.log("Resetting form on route to /register");
//     }

//     lastPathRef.current = location.pathname;
//   }, [location.pathname]);


  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (password1 !== password2) {
//       setError("Passwords do not match.");
//       return;
//     }

//     try {
//       const response = await axios.post(`${API_DOMAIN}/api/users/registration/`, {
//         username,
//         password1,
//         password2,
//         is_marketer: isMarketer,
//       });

//       console.log("Registration successful:", response.data);
//       setSuccess("Registration successful! Redirecting to login...");

//       // Reset form after successful registration
//       setUsername("");
//       setPassword1("");
//       setPassword2("");
//       setIsMarketer(false);

//       setTimeout(() => navigate("/login"), 1500);
//     } catch (err) {
//       console.error("Registration failed", err.response?.data || err.message);

//       const errorMessage =
//         err.response?.data?.username?.[0] ||
//         err.response?.data?.password1?.[0] ||
//         err.response?.data?.password2?.[0] ||
//         err.response?.data?.non_field_errors?.[0] ||
//         "Registration failed. Please try again.";

//       setError(errorMessage);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <div className="container mt-4">
//       {/* ✅ Logout button if already authenticated */}
//       {isAuthenticated && (
//         <div className="d-flex justify-content-end">
//           <button className="btn btn-outline-danger mb-3" onClick={handleLogout}>
//             🔒 Logout
//           </button>
//         </div>
//       )}

//       <h2>Register</h2>

//       {error && <div className="alert alert-danger">{error}</div>}
//       {success && <div className="alert alert-success">{success}</div>}

//       <form onSubmit={handleSubmit} autoComplete="off">
//         <div className="mb-3">
//           <label htmlFor="username" className="form-label">Username</label>
//           <input
//             type="text"
//             className="form-control"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="password1" className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password1"
//             value={password1}
//             onChange={(e) => setPassword1(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="password2" className="form-label">Confirm Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password2"
//             value={password2}
//             onChange={(e) => setPassword2(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-3 form-check">
//           <input
//             type="checkbox"
//             className="form-check-input"
//             id="marketerCheckbox"
//             checked={isMarketer}
//             onChange={(e) => setIsMarketer(e.target.checked)}
//           />
//           <label htmlFor="marketerCheckbox" className="form-check-label">
//             <small>Use this option only to create a marketer account for advertisement purposes.</small>
//           </label>
//         </div>

//         {/* <button type="submit" className="btn btn-primary">Register</button> */}
//         <button onClick={() => navigate("/register")}>Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
