

// import React from "react";
// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div>
//       {/* Navigation Bar */}
//       <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
//         <div className="container-fluid">
//           <Link className="navbar-brand" to="/">📱 My Mobile Review App</Link>
//           <div className="collapse navbar-collapse justify-content-end">
//             <ul className="navbar-nav">
//               <li className="nav-item">
//                 <Link className="nav-link active" to="/">Home</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/about">About Us</Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <header className="bg-light text-center py-5">
//         <h1 className="display-5 fw-bold">Welcome to the Mobile Review App 📱</h1>
//         <p className="lead text-muted">
//           Discover, review, and explore mobile phones with ease.
//         </p>
//       </header>

//       {/* Card Section */}
//       <div className="container my-5">
//         <div className="row g-4">
//           {/* Card 1 */}
//           <div className="col-md-4">
//             <div className="card shadow-sm h-100">
//               <div className="card-body text-center">
//                 <h5 className="card-title">📋 Submit a Review</h5>
//                 <p className="card-text">
//                   Share your opinion on a mobile device you've used.
//                 </p>
//                 <Link to="/review-mobile" className="btn btn-primary">Start Reviewing</Link>
//               </div>
//             </div>
//           </div>

//           {/* Card 2 */}
//           <div className="col-md-4">
//             <div className="card shadow-sm h-100">
//               <div className="card-body text-center">
//                 <h5 className="card-title">📖 View Reviews</h5>
//                 <p className="card-text">
//                   Browse reviews shared by other users across different phones.
//                 </p>
//                 <Link to="/review-list" className="btn btn-success">See Reviews</Link>
//               </div>
//             </div>
//           </div>

//           {/* Card 3 */}
//           <div className="col-md-4">
//             <div className="card shadow-sm h-100">
//               <div className="card-body text-center">
//                 <h5 className="card-title">📣 Learn About Us</h5>
//                 <p className="card-text">
//                   Find out more about our mission and how this platform helps mobile buyers.
//                 </p>
//                 <Link to="/about" className="btn btn-secondary">About Us</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-primary text-white text-center py-3 mt-auto">
//         <p className="mb-0">© {new Date().getFullYear()} Mobile Review App. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";  // Import your custom CSS for animations



const Home = () => {
  return (
    <div className="container">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* <Link className="navbar-brand" to="/">MyProject</Link> */}
          <img src="public/mobile7.jpeg" className="login-img-top" alt="login" style={{ width: "70px", height: "auto" }} />
          <img src="public/mobile2.webp" className="login-img-top" alt="login" style={{ width: "60px", height: "auto" }} />
          <img src="public/mobile3.jpeg" className="login-img-top" alt="login" style={{ width: "150px", height: "auto" }} />
          <img src="public/mobile4.jpeg" className="login-img-top" alt="login" style={{ width: "50px", height: "auto" }} />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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

      {/* Hero Section */}
      <div className="hero-section text-center">
        <h1>Welcome to our Product Review Community</h1>
        <p>A TarasJulie Product Selection Scheme</p>
      </div>

      {/* Feature Cards Section */}
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
        <div className="col">
          <div className="card shadow-lg">
            <img src="public/login.jpeg" className="login-img-top" alt="login" style={{ width: "60px", height: "auto" }} />
            <div className="card-body">
              <h5 className="card-title">Login</h5>
              <p className="card-text">Gives you right to review our products</p>
              <Link to="/login" className="btn btn-primary">Login</Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-lg">
            <img src="public/register.jpeg" className="card-img-top" alt="register" style={{ width: "60px", height: "auto" }} />
            <div className="card-body">
              <h5 className="card-title">Register</h5>
              <p className="card-text">Sign up an account with us</p>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-lg">
            <img src="public/help.jpg" className="card-img-top" alt="help" style={{ width: "60px", height: "auto" }} />
            <div className="card-body">
              <h5 className="card-title">Get Help</h5>
              <p className="card-text">Get some directions on how to review our products</p>
              <Link to="/help" className="btn btn-primary">Help Me</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
