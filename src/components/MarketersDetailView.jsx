import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // To get the `id` from the URL
import axios from 'axios';

const MarketersDetailView = () => {
  const { id } = useParams();  // Get `id` from the URL parameters
  const [marketer, setMarketers] = useState(null);

  useEffect(() => {
    // Fetch the details of a specific todo
      axios.get(`http://localhost:8000/api/marketers/${id}/`)
      .then((response) => {
        console.log(response.data);
        setMarketers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching marketer details:', error);
      });
  }, [id]);

  if (!review) return <p>Loading...</p>;

  return (
    <div>
      <h1>{marketer.author}</h1>
      <p>{marketer.phone}</p>
      <p>{marketer.company}</p>
      <p>{marketer.link}</p>
    </div>
  );
};

export default MarketersDetailView;

