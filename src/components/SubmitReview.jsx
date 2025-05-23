
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SubmitReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const passedReview = location.state;
    if (passedReview) {
      setFormData(passedReview);
    } else {
      alert("No review data found. Please fill the form again.");
      navigate("/review-mobile");
    }
  }, [location.state, navigate]);

  const handleReviewMore = () => navigate("/review-more");

  const handleReviewList = () => navigate("/review-list");

  const handleLogout = () => navigate("/");

  const handleSubmit = () => setSubmitted(true);

  if (!formData) return <p>Loading review data...</p>;

  return (
    <div className="container mt-4">
      <h2>📝 Confirm Your Review</h2>
      <pre className="bg-light p-3 rounded">{JSON.stringify(formData, null, 2)}</pre>

      {!submitted ? (
        <button className="btn btn-primary mt-3" onClick={handleSubmit}>
          ✅ Save Review
        </button>
      ) : (
        <div className="mt-4 d-flex flex-wrap gap-3">
          <button className="btn btn-success" onClick={handleReviewMore}>
            ➕ Review More
          </button>
          <button className="btn btn-info" onClick={handleReviewList}>
            📋 Review List
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default SubmitReview;
