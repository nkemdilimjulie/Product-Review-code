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
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import "./styles.css";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import Register from "./components/Register";
import Help from "./components/Help"; 
import ListView from "./components/ListView";
import Marketers from "./components/Marketers";
import MarketersList from "./components/MarketersList";
import MarketersListView from "./components/MarketersListView";
import DetailView from "./components/DetailView";
import SuccessLogin from "./components/SuccessLogin";
import ReviewMobile from "./components/ReviewMobile"; 
import SubmitReview from "./components/SubmitReview"; 
import ReviewMore from "./components/ReviewMore"; 
import ReviewList from "./components/ReviewList"; 
// import CreateTodo from "./components/CreateTodo";
// import UpdateTodo from "./components/UpdateTodo";
// import DeleteTodo from "./components/DeleteTodo";
import MarketersDetailView from "./components/MarketersDetailView"; 

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/help" element={<Help />} />

          {/* Public Views */}
          <Route path="/mobile/" element={<ListView />} />
          <Route path="/mobile/:id/" element={<DetailView />} />
          <Route path="/marketer/" element={<MarketersListView />} />
          <Route path="/marketers-list" element={<MarketersList />} />
          <Route path="/marketers" element={<Marketers />} />
          <Route path="/success" element={<SuccessLogin />} />
          <Route path="/review-more" element={<ReviewMore />} />
          <Route path="/submit-review" element={<SubmitReview />} />
          <Route path="/marketer/:id/" element={<MarketersDetailView />} /> {/* ✅ Fixed path */}
          <Route path="/review-mobile" element={<ReviewMobile />} />
          <Route path="/review-list" element={<ReviewList />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* <Route path="/create-todo" element={<CreateTodo />} />
            <Route path="/update-todo/:id" element={<UpdateTodo />} />
            <Route path="/delete-todo/:id" element={<DeleteTodo />} /> */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
