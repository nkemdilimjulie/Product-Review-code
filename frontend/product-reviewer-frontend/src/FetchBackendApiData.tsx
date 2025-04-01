import React, { useEffect, useState } from 'react';

const FetchBackendApiData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Accessing the environment variable
    const apiUrl = import.meta.env.VITE_API_URL;

    // Log the API URL to check if it's correctly loaded
    console.log("API URL:", apiUrl); // This will print in the browser console

    // Fetching data from the backend API
    fetch(`${apiUrl}/items/`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Items</h1>
      {data ? (
        <ul>
          {data.map((item: any) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FetchBackendApiData;

