
import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Home = () => {
  // localStorage.removeItem("user");
  // logout(); // if using AuthContext
  // // navigate("/login");

  return (
    <div className="container">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
        <div className="container-fluid">
          <img src="/mobile7.jpeg" className="login-img-top" alt="login" style={{ width: "70px", height: "auto" }} />
          <img src="/mobile2.webp" className="login-img-top" alt="login" style={{ width: "60px", height: "auto" }} />
          <img src="/mobile3.jpeg" className="login-img-top" alt="login" style={{ width: "150px", height: "auto" }} />
          <img src="/mobile4.jpeg" className="login-img-top" alt="login" style={{ width: "50px", height: "auto" }} />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/aboutus">About Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 🔥 New Social Platform Navbar */}
      <nav className="navbar navbar-dark bg-dark rounded px-3 mb-4">
        <span className="navbar-brand mb-0 h5 text-white">🌐 Social Platform</span>
        <Link to="/social-platform" className="btn btn-outline-light btn-sm">Visit Community</Link>
      </nav>

      {/* Hero Section */}
      <div className="hero-section text-center">
        <h1>Welcome to our Product Review Community</h1>
        <p className="text-muted">A TarasJulie Product Selection Scheme</p>
      </div>

      {/* Feature Cards Section */}
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
        <div className="col">
          <div className="card shadow-lg">
            <img src="/login.jpeg" className="login-img-top" alt="login" style={{ width: "60px", height: "auto" }} />
            <div className="card-body">
              <h5 className="card-title">Login</h5>
              <p className="card-text">Gives you right to review our products</p>
              <Link to="/login" className="btn btn-primary">Login</Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-lg">
            <img src="/register.jpeg" className="card-img-top" alt="register" style={{ width: "60px", height: "auto" }} />
            <div className="card-body">
              <h5 className="card-title">Register</h5>
              <p className="card-text">Sign up an account with us</p>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-lg">
            <img src="/help.jpg" className="card-img-top" alt="help" style={{ width: "60px", height: "auto" }} />
            <div className="card-body">
              <h5 className="card-title">Get Help</h5>
              <p className="card-text">Get some directions on how to review our products or market your products</p>
              <Link to="/help" className="btn btn-primary">Help Me</Link>
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 Social Platform Feature Card */}
      <div className="card mt-5 border-success shadow">
        <div className="card-body text-center">
          <h4 className="card-title text-success">Join the Conversation</h4>
          <p className="card-text">No login needed — just share your thoughts, comment on posts, and connect freely!</p>
          <Link to="/social-platform" className="btn btn-success">Enter Social Platform</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
