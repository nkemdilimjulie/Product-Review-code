import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Login - Get token
      const loginResponse = await axios.post("http://127.0.0.1:8080/api/users/login/", {
        username,
        password,
      });

      console.log("Login response:", loginResponse.data); // check if `token` exists here

      const token = loginResponse.data.key;

      console.log("Sending token:", token);

      // Step 2: Fetch user details using token
      const userDetailsResponse = await axios.get(
        "http://127.0.0.1:8080/api/users/user_details/",
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
      {/* Logout Button if Authenticated */}
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


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const { login, logout } = useAuth();

//   // ✅ Clear previous session on component mount
//   useEffect(() => {
//     localStorage.removeItem("user"); // removes old session
//     logout(); // also clears context if any
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await axios.post("http://localhost:8080/api/users/login/", {
//         username,
//         password,
//       });

//       const userData = {
//         username: response.data.username,
//         token: response.data.key,
//         user_type: response.data.user_type || "visitor",
//       };

//       // ✅ Save new session
//       localStorage.setItem("user", JSON.stringify(userData));
//       login(userData); // if using AuthContext

//       console.log("Login successful:", userData);
//       navigate("/successlogin");
//     } catch (err) {
//       console.error("Login error:", err.response?.data || err.message);
//       setError("Login failed. Check your credentials.");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Login</h2>

//       {error && <div className="alert alert-danger">{error}</div>}

//       <form onSubmit={handleLogin}>
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
//           <label htmlFor="password" className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
