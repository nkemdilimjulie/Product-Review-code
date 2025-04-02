import React, { useEffect, useState } from 'react';

const Users = () => {
  const [data, setData] = useState<any[]>([]);  // Explicitly set data as an array

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    console.log("Fetching from:", `${apiUrl}/accounts/userlist/`);

    fetch(`${apiUrl}/accounts/userlist/`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>User List</h1>
      {data.length > 0 ? (
        <ul>
          {data.map((user) => (
            <li key={user.id}>{user.username}</li>  // Change `name` to `username` based on Django user model
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Users;
