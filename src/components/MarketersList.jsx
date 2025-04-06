import React, { useEffect, useState } from "react";

const MarketersList = () => {
  const [marketers, setMarketers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/marketers/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setMarketers(data))
      .catch((err) => console.error("Error fetching marketers:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>📋 Marketers List</h2>
      {marketers.length === 0 ? (
        <p>No marketers found.</p>
      ) : (
        <ul className="list-group">
          {marketers.map((marketer) => (
            <li key={marketer.id} className="list-group-item">
              <strong>Company:</strong> {marketer.company} <br />
              <strong>Link:</strong> <a href={marketer.link} target="_blank" rel="noreferrer">{marketer.link}</a><br />
              <strong>Author:</strong> {marketer.author}<br />
              <strong>Phone:</strong> {marketer.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MarketersList;
