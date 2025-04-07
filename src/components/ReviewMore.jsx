import React from "react";
import { useNavigate } from "react-router-dom";

const ReviewMore = () => {
  const navigate = useNavigate();

  const handleReviewMore = () => {
    // Navigate to the page where users can review more phones
    navigate("/review-mobile");
  };

  const handleViewReviews = () => {
    // Navigate to the page where users can view existing reviews
    navigate("/review-list");
  };

  const handleLogout = () => {
    // Clear the user's session (localStorage) and navigate to login page
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <h2>📱 Thank you for your review!</h2>
      <p>Want to do more?</p>

      <div className="mt-3 d-flex flex-column gap-3">
        {/* Button to review more phones */}
        <button className="btn btn-primary" onClick={handleReviewMore}>
          ➕ Review More Phones
        </button>

        {/* Button to view existing reviews */}
        <button className="btn btn-secondary" onClick={handleViewReviews}>
          📜 View Existing Reviews
        </button>

        {/* Button to logout */}
        <button className="btn btn-danger" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default ReviewMore;
