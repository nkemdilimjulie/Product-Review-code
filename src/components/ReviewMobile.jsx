import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewMobile = () => {
  const [formData, setFormData] = useState({
    phone: "",
    body: "",
    author: "",
    created_at: "",
    seller: "",
    price: "",
    rate: "",
  });

  const [phones, setPhones] = useState([]); // Assume phones come from backend

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/mobiles/");
        setPhones(response.data);
      } catch (error) {
        console.error("Failed to fetch phones:", error);
      }
    };
    fetchPhones();
  }, []);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/reviews/", formData);
      alert("Review submitted successfully!");
      setFormData({
        phone: "",
        body: "",
        author: "",
        created_at: "",
        seller: "",
        price: "",
        rate: "",
      });
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📱 Review a Mobile</h2>
      <form onSubmit={handleSubmit}>
        {/* Phone Dropdown */}
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
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
                {phone.name}
              </option>
            ))}
          </select>
        </div>

        {/* Body Text */}
        <div className="mb-3">
          <label htmlFor="body" className="form-label">Review</label>
          <textarea 
            className="form-control"
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        {/* Author */}
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input 
            type="text" 
            className="form-control" 
            name="author" 
            value={formData.author}
            onChange={handleChange}
            required 
          />
        </div>

        {/* Created At */}
        <div className="mb-3">
          <label htmlFor="created_at" className="form-label">Date</label>
          <input 
            type="date" 
            className="form-control" 
            name="created_at" 
            value={formData.created_at}
            onChange={handleChange}
            required 
          />
        </div>

        {/* Seller */}
        <div className="mb-3">
          <label htmlFor="seller" className="form-label">Seller</label>
          <input 
            type="text" 
            className="form-control" 
            name="seller" 
            value={formData.seller}
            onChange={handleChange}
            required 
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price ($)</label>
          <input 
            type="number" 
            className="form-control" 
            name="price" 
            value={formData.price}
            onChange={handleChange}
            required 
          />
        </div>

        {/* Rate */}
        <div className="mb-3">
          <label htmlFor="rate" className="form-label">Rate (1–5)</label>
          <input 
            type="number" 
            className="form-control" 
            name="rate" 
            value={formData.rate}
            onChange={handleChange}
            min="1"
            max="5"
            required 
          />
        </div>

        <button type="submit" className="btn btn-success">
          ✅ Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewMobile;
