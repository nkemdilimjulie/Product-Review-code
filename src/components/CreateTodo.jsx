import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTodo = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/create/', { title, body })
      .then((response) => {
        console.log('Todo created:', response.data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error creating todo:', error);
      });
  };

  return (
    <div>
      <h2>Create Todo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter todo body"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateTodo;

