import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";  // Import your custom CSS for animations

const AboutUs = () => {
  return (
    <div className="container">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">MyProject</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about-us">About Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* About Us Section */}
      <div className="text-center mt-4">
        <h2>About Us</h2>
        <p>We are a team passionate about making your experience better with technology.</p>
        <h4>Our Mission</h4>
        <p>To simplify and enhance the way you interact with technology, providing easy-to-use solutions that improve your day-to-day life.</p>

        {/* Team Section */}
        <h4>Meet the Team</h4>
        <div className="row mt-3">
          <div className="col-md-4">
            <div className="card">
              <img src="https://via.placeholder.com/150" className="card-img-top" alt="Team Member 1" />
              <div className="card-body">
                <h5 className="card-title">John Doe</h5>
                <p className="card-text">Founder & CEO</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src="https://via.placeholder.com/150" className="card-img-top" alt="Team Member 2" />
              <div className="card-body">
                <h5 className="card-title">Jane Smith</h5>
                <p className="card-text">Co-Founder & CTO</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src="https://via.placeholder.com/150" className="card-img-top" alt="Team Member 3" />
              <div className="card-body">
                <h5 className="card-title">Alice Johnson</h5>
                <p className="card-text">Lead Developer</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Us Section */}
        <h4 className="mt-4">Contact Us</h4>
        <form>
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Your Email</label>
            <input type="email" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Your Message</label>
            <textarea className="form-control" rows="4"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default AboutUs;
