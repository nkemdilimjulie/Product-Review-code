// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles.css";  // Import your custom CSS for animations

// const AboutUs = () => {
//   return (
//     <div className="container">
//       {/* Navigation Bar */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <div className="container-fluid">
//           <Link className="navbar-brand" to="/">A TarasJulie Product Selection Scheme</Link>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto">
//               <li className="nav-item">
//                 <Link className="nav-link active" aria-current="page" to="/">Home</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/about-us">About Us</Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* About Us Section */}
//       <div className="text-center mt-4">
//         <h2>About Us</h2>
//         <p>Our company name is TarasJulie Product Review. We are a fast growing company that brings both 
//             product marketers and buyers together. Currently, we handle mobiles review for our users. 
//             In the oncoming years, we shall expand to the review of other products, like Laptops, PCs, cars 
//             and other electronical and programmed devices or products.
//             We are a team passionate about making your experience better with technology.</p>
//         <h4>Our Mission</h4>
//         <p>To simplify and enhance the way you interact with technology, providing easy-to-use solutions that improve your day-to-day life.</p>

//         {/* Team Section */}
//         <h4>Meet the Team</h4>
//         <div className="row mt-3">
//           <div className="col-md-4">
//             <div className="card">
//               <img src="https://via.placeholder.com/150" className="card-img-top" alt="Taras (Mr.T)" />
//               <div className="card-body">
//                 <h5 className="card-title">Taras Bilan</h5>
//                 <p className="card-text">Python Backend Developer</p>
//                 <p className="card-text">Handles the Backend Operations</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card">
//               <img src="" className="card-img-top" alt="" style={{ width: "250px", height: "auto" }}/>
//               <div className="card-body">
//                 <h5 className="card-title"></h5>
//                 <p className="card-text"></p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card">
//               <img src="/julie.jpeg" className="card-img-top" alt="Julie" style={{ width: "250px", height: "auto" }}/>
//               <div className="card-body">
//                 <h5 className="card-title">Nkemdilim Julie Chime</h5>
//                 <p className="card-text">Python Backend Developer</p>
//                 <p className="card-text">Handles the Frontend Operations</p>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Contact Us Section */}
//         <h4 className="mt-4">Contact Us</h4>
//         <form>
//           <div className="mb-3">
//             <label className="form-label">Meet us at any Coffee Center</label>
//             <p className="form-label">Mondays to Fridays</p>
//             <input type="text" className="form-control" />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Meet us at any of the World of Wine (WoW) Centers</label>
//             <p className="form-label">On Weekends</p>
//             <input type="email" className="form-control" />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Your Message</label>
//             <textarea className="form-control" rows="4"></textarea>
//           </div>
//           <button type="submit" className="btn btn-primary">Send Message</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;



import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles.css"; // Your custom animations or styles

const AboutUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow rounded mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            TarasJulie Product Scheme
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
            </ul>
          </div>
        </div>
      </nav>

      {/* About Us Section */}
      <div className="text-center">
        <h2 className="fw-bold mb-3">About Us</h2>
        <p className="lead">
          Our company name is <strong>TarasJulie Product Scheme</strong>. We bring marketers and buyers together 
          by hosting mobile product reviews.</p>
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
              src="/julie.jpeg"
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
              src="https://via.placeholder.com/250"
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
          
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">On Weekends</label>
          <p>Meet us at World of Wine (WoW) Center</p>
          <p className="form-text">Address: WorldOfWineStrasse 77, 80937 Munich Germany</p>
          
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Feel @Home and Message Us</label>
          <textarea className="form-control" rows="4" placeholder="Type your message here..." required></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100 fw-bold">📤 Send Message</button>
      </form>
    </div>
  );
};

export default AboutUs;
