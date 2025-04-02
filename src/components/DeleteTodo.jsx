import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/api/delete/${id}/`)
      .then((response) => {
        console.log('Todo deleted:', response.data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error deleting todo:', error);
      });
  };

  return (
    <div>
      <h2>Are you sure you want to delete this todo?</h2>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => navigate('/')}>Cancel</button>
    </div>
  );
};

export default DeleteTodo;

