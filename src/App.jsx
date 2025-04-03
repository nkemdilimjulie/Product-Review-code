// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ListView from './components/ListView';
// import DetailView from './components/DetailView';
// import CreateTodo from './components/CreateTodo';
// import UpdateTodo from './components/UpdateTodo';
// import DeleteTodo from './components/DeleteTodo';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//           <Route path="/mobile/" element={<ListView />} />
//           <Route path="/mobile/:id/" element={<DetailView />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ListView from "./components/ListView";
import MarketersListView from "./components/MarketersListView";
import DetailView from "./components/DetailView";
import CreateTodo from "./components/CreateTodo";
import UpdateTodo from "./components/UpdateTodo";
import DeleteTodo from "./components/DeleteTodo";
import MarketersDetailView from "./components/MarketersDetailView"; 
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Public Views */}
          <Route path="/mobile/" element={<ListView />} />
          <Route path="/mobile/:id/" element={<DetailView />} />
          <Route path="/marketer/" element={<MarketersListView />} />
          <Route path="/marketer/:id/" element={<MarketersDetailView />} /> {/* ✅ Fixed path */}

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/create-todo" element={<CreateTodo />} />
            <Route path="/update-todo/:id" element={<UpdateTodo />} />
            <Route path="/delete-todo/:id" element={<DeleteTodo />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
