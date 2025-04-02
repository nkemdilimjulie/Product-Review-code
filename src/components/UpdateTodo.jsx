import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateTodo = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/${id}/`)
      .then((response) => {
        setTitle(response.data.title);
        setBody(response.data.body);
      })
      .catch((error) => {
        console.error('Error fetching todo for update:', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/api/update/${id}/`, { title, body })
      .then((response) => {
        console.log('Todo updated:', response.data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error updating todo:', error);
      });
  };

  return (
    <div>
      <h2>Update Todo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Update todo title"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Update todo body"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateTodo;

