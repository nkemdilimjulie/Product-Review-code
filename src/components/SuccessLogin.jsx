import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessLogin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token (and any other user data)
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>✅ Successfully Logged In!</h1>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate("/marketers")}>
          📋 Marketers List
        </button>

        <button style={styles.button} onClick={() => navigate("/reviews")}>
          💬 Review Mobiles
        </button>

        <button style={styles.logoutButton} onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default SuccessLogin;

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
    backgroundColor: "#f8f8f8",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "2rem",
    color: "#2c3e50",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "300px",
    margin: "0 auto",
  },
  button: {
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  logoutButton: {
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};


// import React from "react";
// import { useNavigate } from "react-router-dom";

// const SuccessLogin = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="container mt-5 text-center">
//       <h2 className="mb-4">✅ Successfully Logged In!</h2>

//       <div className="d-grid gap-3 col-6 mx-auto">
//         <button className="btn btn-primary" onClick={() => navigate("/marketers")}>
//           📋 Marketers List
//         </button>

//         <button className="btn btn-warning" onClick={() => navigate("/reviews")}>
//           💬 Review Mobiles
//         </button>

//         <button className="btn btn-danger" onClick={handleLogout}>
//           🚪 Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SuccessLogin;
