import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // For routing to MarketersDetailView

const MarketersListView = () => {
  const [marketers, setMarketers] = useState([]);

  useEffect(() => {
    // Fetch the list of todos from the Django API
      axios.get('http://localhost:8080/api/marketers/')
      .then((response) => {
        setMarketers(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching Marketers List:', error);
      });
  }, []);

  return (
    <div>
      <h1>Marketers List</h1>
      <ul>
        {marketers.map((marketer, index) => (
          <li key={marketer.phone}>
              <Link to={`/marketer/${marketer.phone}`}>
              <h3>{marketer.link}</h3>
          </Link>
            <h3>{marketer.link}</h3>
            <p>{marketer.company}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarketersListView;


