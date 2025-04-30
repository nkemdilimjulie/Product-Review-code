import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles.css"; // Your custom animations or styles
import { API_DOMAIN } from '../../configdomain';

const AboutUs = () => {
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    
    
    try {
      const res = await fetch(`${API_DOMAIN}/api/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Token ${token}`,  // Include token here -- if login is required before sending message.
        },
        body: JSON.stringify({ message }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        toast.success(data.success, {
          position: "top-center",
          autoClose: 3000,
        });
        e.target.reset();
      } else {
        toast.error(data.error || "Failed to send message.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Network error. Try again.");
    }
  };
  
  return (
    <div className="container mt-4">
      <ToastContainer />
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow rounded mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            TarasJulie Product Review Scheme
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active text-light" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/about-us">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/swagger">Documentation</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* About Us Section */}
      <div className="text-center">
        <h2 className="fw-bold mb-3">About Us</h2>
        <p className="lead">
          Our company name is <strong>TarasJulie Product Review Scheme</strong>. We bring marketers and buyers together 
          by hosting product reviews.</p>
        <p>In the future, we plan to include reviews for laptops, cars, and other electronic products.</p>
         
        <h4 className="fw-semibold">Our Mission</h4>
        <p className="fst-italic">
          We have a passion to channel you to buy the <strong>correct product</strong> for your <strong>specific need</strong>. 
        </p>
      </div>

      {/* Meet the Team */}
      <h4 className="text-center fw-semibold mt-5">Meet the Team</h4>
      <div className="row justify-content-center mt-3">

        <div className="col-md-4 mb-4">
          <div className="card shadow h-100">
            <img
              src="/julie2.jpeg"
              className="card-img-top"
              alt="Julie"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title fw-bold">Nkemdilim Julie Chime</h5>
              <p className="card-text">Python Backend Developer</p>
              <p className="card-text text-muted">Handles the Frontend Operations</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow h-100">
            <img
              src="/taras.png"
              className="card-img-top"
              alt="Taras"
            />
            <div className="card-body text-center">
              <h5 className="card-title fw-bold">Taras Bilan</h5>
              <p className="card-text">Python Backend Developer</p>
              <p className="card-text text-muted">Handles the Backend Operations</p>
            </div>
          </div>
        </div>
        
      </div>

      {/* Contact Us Section */}
      <h4 className="text-center fw-semibold mt-5">Contact Us</h4>
      <form className="mx-auto mt-3 p-4 shadow rounded bg-light" style={{ maxWidth: "600px" }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Mondays to Fridays</label>
          <p>Meet us at Coffee Center</p>
          <p className="form-text">Address: CoffeeBreakStrasse 7, 80937 Munich USA</p>
          <p>Email Address: amchosen@yahoo.com</p>
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">On Weekends</label>
          <p>Meet us at World of Wine (WoW) Center</p>
          <p className="form-text">Address: WorldOfWineStrasse 77, 80937 Munich Germany</p>
          
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Feel @Home and Message Us</label>
          <textarea name="message" className="form-control" rows="4" placeholder="Type your message here..." required></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100 fw-bold">📤 Send Message</button>
      </form>
    </div>
  );
};

export default AboutUs;
