import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Marketers = () => {
  const [company, setCompany] = useState("");
  const [link, setLink] = useState("");
  const { token } = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/marketers/",
        {
          company,
          link,
        },
        {
          headers: {
            Authorization: `Token ${token}`,  // Use Token for Authentication
          },
        }
      );

      console.log("Marketer Submitted:", response.data);
      alert("Marketer data submitted successfully!");
      setCompany("");
      setLink("");
    } catch (error) {
      console.error("Error submitting marketer data:", error);
      alert("Failed to submit marketer data. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Marketers</h2>

      {/* Marketer Submission Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Company</label>
          <input
            type="text"
            className="form-control"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Link</label>
          <input
            type="url"
            className="form-control"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary">Submit Marketer</button>
      </form>

      {/* Buttons to navigate */}
      <div className="mt-3">
        <button
          className="btn btn-secondary mr-2"
          onClick={() => navigate("/marketerslist")}
        >
          Marketers List
        </button>
      </div>
    </div>
  );
};


export default Marketers;
