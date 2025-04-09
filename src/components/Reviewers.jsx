import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reviewers = () => {
  const navigate = useNavigate();
  const [phones, setPhones] = useState([]);
  const [formData, setFormData] = useState({
    author: localStorage.getItem("username") || "",
    phone: "",
    body: "",
    seller: "",
    price: "",
    rate: ""
  });

  useEffect(() => {
    axios.get("http://localhost:8080/api/mobiles/")
      .then(res => setPhones(res.data))
      .catch(err => console.error("Failed to load phones", err));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    // Post data to backend here
  };

  return (
    <div className="container mt-4">
      <h2>📝 Reviewer Submission</h2>
      <form onSubmit={handleSubmit}>
        <input name="author" className="form-control mb-2" value={formData.author} readOnly />
        <select name="phone" className="form-control mb-2" onChange={handleChange} required>
          <option value="">Select Phone</option>
          {phones.map(phone => (
            <option key={phone.id} value={phone.id}>
              {phone.brand} {phone.model}
            </option>
          ))}
        </select>
        <textarea name="body" className="form-control mb-2" placeholder="Review body" onChange={handleChange} required />
        <input type="text" name="seller" className="form-control mb-2" placeholder="Seller" onChange={handleChange} required />
        <input type="number" name="price" className="form-control mb-2" placeholder="Price" onChange={handleChange} required />
        <select name="rate" className="form-control mb-2" onChange={handleChange} required>
          <option value="">Select Rating</option>
          {[1, 2, 3, 4, 5].map(rate => (
            <option key={rate} value={rate}>{rate}</option>
          ))}
        </select>
        <button className="btn btn-primary">Submit</button>
      </form>

      <div className="mt-4 d-flex flex-wrap gap-3">
        <button className="btn btn-info" onClick={() => navigate("/review-list")}>
          📃 Reviewers List
        </button>
        <button className="btn btn-info" onClick={() => navigate("/marketers-list")}>
          📃 Marketers List
        </button>
        <button className="btn btn-danger" onClick={() => navigate("/")}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Reviewers;
