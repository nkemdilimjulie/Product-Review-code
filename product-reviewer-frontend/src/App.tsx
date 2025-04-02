import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;


// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Users from './pages/Users';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<h1>Home Page</h1>} />  {/* Home Page or Route */}
//         <Route path="/users" element={<Users />} />  {/* Users List or Route */}
//         <Route path="*" element={<h1>404 - Page Not Found</h1>} />  {/* Catch-all Route */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
