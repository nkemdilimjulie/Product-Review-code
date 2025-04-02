import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // To get the `id` from the URL
import axios from 'axios';

const DetailView = () => {
  const { id } = useParams();  // Get `id` from the URL parameters
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    // Fetch the details of a specific todo
    axios.get(`http://localhost:8000/api/${id}/`)
      .then((response) => {
        console.log(response.data);
        setTodo(response.data);
      })
      .catch((error) => {
        console.error('Error fetching todo details:', error);
      });
  }, [id]);

  if (!todo) return <p>Loading...</p>;

  return (
    <div>
      <h1>{todo.title}</h1>
      <p>{todo.body}</p>
    </div>
  );
};

export default DetailView;

