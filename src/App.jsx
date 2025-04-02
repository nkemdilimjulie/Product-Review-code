import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListView from './components/ListView';
import DetailView from './components/DetailView';
import CreateTodo from './components/CreateTodo';
import UpdateTodo from './components/UpdateTodo';
import DeleteTodo from './components/DeleteTodo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListView />} />
        <Route path="/:id" element={<DetailView />} />
        <Route path="/create" element={<CreateTodo />} />
        <Route path="/update/:id" element={<UpdateTodo />} />
        <Route path="/delete/:id" element={<DeleteTodo />} />
      </Routes>
    </Router>
  );
};

export default App;

