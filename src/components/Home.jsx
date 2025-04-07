// import React from 'react';

// const Home = () => {
//   return (
//     <div>
//       <h1>Welcome to the Home Page</h1>
//       <p>This is where the main content of your application will go.</p>
//     </div>
//   );
// };

// export default Home;


import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">📱 My Mobile Review App</Link>
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-light text-center py-5">
        <h1 className="display-5 fw-bold">Welcome to the Mobile Review App 📱</h1>
        <p className="lead text-muted">
          Discover, review, and explore mobile phones with ease.
        </p>
      </header>

      {/* Card Section */}
      <div className="container my-5">
        <div className="row g-4">
          {/* Card 1 */}
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title">📋 Submit a Review</h5>
                <p className="card-text">
                  Share your opinion on a mobile device you've used.
                </p>
                <Link to="/review-mobile" className="btn btn-primary">Start Reviewing</Link>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title">📖 View Reviews</h5>
                <p className="card-text">
                  Browse reviews shared by other users across different phones.
                </p>
                <Link to="/review-list" className="btn btn-success">See Reviews</Link>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title">📣 Learn About Us</h5>
                <p className="card-text">
                  Find out more about our mission and how this platform helps mobile buyers.
                </p>
                <Link to="/about" className="btn btn-secondary">About Us</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3 mt-auto">
        <p className="mb-0">© {new Date().getFullYear()} Mobile Review App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
