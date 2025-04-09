import React, { useEffect, useState } from "react";
import axios from "axios";

const MarketersList = () => {
  const [marketers, setMarketers] = useState([]);
  const { token } = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    const fetchMarketers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8080/api/marketers/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setMarketers(response.data);
      } catch (error) {
        console.error("Error fetching marketers:", error);
      }
    };

    fetchMarketers();
  }, [token]);

  return (
    <div className="container mt-4">
      <h2>Marketers List</h2>
      <ul className="list-group">
        {marketers.map((marketer) => (
          <li key={marketer.id} className="list-group-item">
            <strong>{marketer.company}</strong>
            <p>{marketer.link}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarketersList;

