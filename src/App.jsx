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
          <Route path="/mobile/" element={<ListView />} />
          <Route path="/mobile/:id/" element={<DetailView />} />
      </Routes>
    </Router>
  );
};

export default App;

