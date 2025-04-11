// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const ReviewList = () => {
//   const [reviews, setReviews] = useState([]);
//   const navigate = useNavigate();

//   // Load reviews from localStorage when the component is mounted
//   useEffect(() => {
//     const savedReviews = JSON.parse(localStorage.getItem("review-mobile")) || [];
//     setReviews(savedReviews);
//   }, []);

//   // Navigate to ReviewMobile to submit more reviews
//   const handleReviewMore = () => {
//     navigate("/review-mobile");
//   };

//   // Clear the session and navigate to the login page
//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("username");
//     navigate("/login");
//   };

//   return (
//     <div className="container mt-4">
//       <h2>📜 Your Reviews</h2>

//       {/* Displaying reviews */}
//       {reviews.length === 0 ? (
//         <p>No reviews submitted yet. Please submit a review!</p>
//       ) : (
//         <ul className="list-group">
//           {reviews.map((review, index) => (
//             <li key={index} className="list-group-item">
//               <h5>{review.phone}</h5>
//               <p><strong>Body:</strong> {review.body}</p>
//               <p><strong>Seller:</strong> {review.seller}</p>
//               <p><strong>Price:</strong> ${review.price}</p>
//               <p><strong>Rate:</strong> {review.rate}</p>
//               <p><strong>Author:</strong> {review.author}</p>
//               <p><strong>Created At:</strong> {new Date(review.created_at).toLocaleString()}</p>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Buttons for Review More and Logout */}
//       <div className="mt-4 d-flex flex-column gap-3">
//         <button className="btn btn-primary" onClick={handleReviewMore}>
//           ➕ Review More Phones
//         </button>
//         <button className="btn btn-danger" onClick={handleLogout}>
//           🚪 Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReviewList;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const phoneLookup = {
//   1: "Samsung - Galaxy S21",
//   2: "Apple - iPhone 13",
//   // Add more mappings as needed
// };

// const ReviewList = () => {
//   const [reviews, setReviews] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedReviews = JSON.parse(localStorage.getItem("review-mobile")) || [];
//     setReviews(savedReviews);
//   }, []);

//   const handleReviewMore = () => {
//     navigate("/review-more");
//   };

//   const handleLogout = () => {
//     // localStorage.removeItem("accessToken");
//     // localStorage.removeItem("username");
//     navigate("/");
//   };

//   return (
//     <div className="container mt-4">
//       <h2>📱 Mobile Reviews</h2>
//       {reviews.length === 0 ? (
//         <p>No reviews yet. Be the first to review!</p>
//       ) : (
//         <ul className="list-group">
//           {reviews.map((review, index) => (
//             <li key={index} className="list-group-item mb-3">
//               <h5>
//                 <strong>#{index + 1}</strong> – {phoneLookup[review.phone] || "Unknown Phone"}
//               </h5>
//               <p>{review.body}</p>
//               <p><strong>Author:</strong> {review.author}</p>
//               <p><strong>Seller:</strong> {review.seller}</p>
//               <p><strong>Price:</strong> ${review.price}</p>
//               <p><strong>Rating:</strong> {review.rate} / 5</p>
//               <p><strong>Reviewed On:</strong> {new Date(review.created_at).toLocaleString()}</p>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Action Buttons */}
//       <div className="mt-4 d-flex gap-3">
//         <button className="btn btn-success" onClick={handleReviewMore}>
//           ➕ Review More
//         </button>
//         <button className="btn btn-danger" onClick={handleLogout}>
//           🚪 Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReviewList;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTopButton from './ScrollToTopButton';
import { FaArrowUp } from 'react-icons/fa';

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/reviews/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('jwt_token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          console.error("Expected an array of reviews, got:", data);
        }
      })
      .catch((err) => console.error('Error fetching reviews:', err));
  }, []);

  const buttonStyle = {
    margin: '8px',
    padding: '10px 20px',
    borderRadius: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>All Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} style={{ marginBottom: '1.5rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
              <p><strong>Author:</strong> {review.author}</p>
              <p><strong>Phone:</strong> {review.phone}</p>
              <p><strong>Body:</strong> {review.body || 'N/A'}</p>
              <p><strong>Seller:</strong> {review.seller}</p>
              <p><strong>Price:</strong> {review.price ? `$${review.price}` : 'N/A'}</p>
              <p><strong>Rating:</strong> {review.rate}/5</p>
              <p><strong>Created:</strong> {new Date(review.created_at).toLocaleString()}</p>
              <p><strong>Updated:</strong> {new Date(review.updated_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      
      )}
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/review-mobiles')} style={buttonStyle}>Review Mobiles</button>
        <button onClick={() => navigate('/')} style={{ ...buttonStyle, backgroundColor: 'crimson' }}>Logout</button>
      </div>
      <ScrollToTopButton />
      <ToastContainer />
      <FaArrowUp />

    </div>
    
  );
 
  
}

export default ReviewList;
