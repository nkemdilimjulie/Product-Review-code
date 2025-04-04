import React, { useEffect, useState } from 'react';

const MarketersList = () => {
  const [marketers, setMarketers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/marketers/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // assuming token stored here
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch marketers.");
        return res.json();
      })
      .then((data) => setMarketers(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div>
      <h2>Marketers List</h2>
      {marketers.length === 0 ? (
        <p>No marketers found.</p>
      ) : (
        <ul>
          {marketers.map((marketer) => (
            <li key={marketer.id}>
              <strong>Company:</strong> {marketer.company}<br />
              <strong>Link:</strong> <a href={marketer.link} target="_blank">{marketer.link}</a><br />
              <strong>Author:</strong> {marketer.author}<br />
              <strong>Phone:</strong> {marketer.phone}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MarketersList;

