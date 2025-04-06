import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReviewMobile = () => {
  const [phones, setPhones] = useState([]);
  const [formData, setFormData] = useState({
    phone: "",
    body: "",
    author: "",
    created_at: new Date().toISOString(),
    seller: "",
    price: "",
    rate: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/mobiles/");
        setPhones(response.data);
      } catch (error) {
        console.error("Failed to fetch phones:", error);
      }
    };

    const username = localStorage.getItem("username");
    setFormData((prev) => ({
      ...prev,
      author: username || "",
    }));

    fetchPhones();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/reviews/", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      alert("Review submitted!");
      navigate("/review-more");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>📱 Review a Mobile</h2>
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

        {/* Body */}
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

        {/* Author (auto-filled) */}
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

        <button className="btn btn-success" type="submit">✅ Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewMobile;
