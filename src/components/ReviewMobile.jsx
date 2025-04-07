import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReviewMobile = () => {
  const [phones, setPhones] = useState([]);
  const [formData, setFormData] = useState({
    phone: "",
    body: "",
    author: "",
    created_at: new Date().toLocaleString(),
    seller: "",
    price: "",
    rate: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhones = async () => {
      // Mock data – replace with real API call if needed
      setPhones([
        { id: 1, brand: "Samsung", model: "Galaxy S21" },
        { id: 2, brand: "Apple", model: "iPhone 13" },
      ]);

      const username = localStorage.getItem("username");
      setFormData((prev) => ({
        ...prev,
        author: username || "",
      }));
    };

    fetchPhones();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = { ...formData, created_at: new Date().toISOString() };
    const savedReviews = JSON.parse(localStorage.getItem("review-mobile")) || [];
    savedReviews.push(newReview);
    localStorage.setItem("review-mobile", JSON.stringify(savedReviews));

    navigate("/submit-review", { state: newReview });
  };

  const handleLogout = () => {
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("username");
    navigate("/");
  };

  const goToReviewList = () => {
    navigate("/review-list");
  };

  return (
    <div className="container mt-4">
      {/* Header Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>📱 Review a Mobile</h2>
        <div>
          <button className="btn btn-outline-primary me-2" onClick={goToReviewList}>
            📋 Review List
          </button>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Phone Dropdown */}
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <select
            className="form-select"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          >
            <option value="">Select a Phone</option>
            {phones.map((phone) => (
              <option key={phone.id} value={phone.id}>
                {phone.brand} - {phone.model}
              </option>
            ))}
          </select>
        </div>

        {/* Review Body */}
        <div className="mb-3">
          <label className="form-label">Review</label>
          <textarea
            className="form-control"
            name="body"
            rows="4"
            value={formData.body}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Author */}
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            className="form-control"
            type="text"
            name="author"
            value={formData.author}
            readOnly
          />
        </div>

        {/* Seller */}
        <div className="mb-3">
          <label className="form-label">Seller</label>
          <input
            className="form-control"
            type="text"
            name="seller"
            value={formData.seller}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price ($)</label>
          <input
            className="form-control"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Rate */}
        <div className="mb-3">
          <label className="form-label">Rate (1–5)</label>
          <input
            className="form-control"
            type="number"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
        </div>

        {/* Submit Button */}
        <button className="btn btn-success" type="submit">
          ✅ Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewMobile;
