import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // For routing to DetailView

const ListView = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch the list of todos from the Django API
    axios.get('http://localhost:8000/api/')
      .then((response) => {
        setTodos(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
      });
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <Link to={`/${todo.id}`}>
              <h3>{todo.title}</h3>
            </Link>
            <p>{todo.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;

