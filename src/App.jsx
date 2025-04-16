
import React from "react";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import "./styles.css";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import Register from "./components/Register";
import Help from "./components/Help"; 
import Marketers from "./components/Marketers";
import MarketersList from "./components/MarketersList";
import EditMyReviews from "./components/EditMyReviews";
import ReviewListVertical from "./components/ReviewListVertical";
// import SocialPlatform from "./components/SocialPlatform"; 
import SubmitReview from "./components/SubmitReview"; 
import ReviewList from "./components/ReviewList"; 
import ReviewMobiles from "./components/ReviewMobiles";
import ScrollToTopButton from "./components/ScrollToTopButton";



const App = () => {
  return (
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
         
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/help" element={<Help />} />

          {/* Public Views */}
          <Route path="/marketers" element={<Marketers />} />
          <Route path="/marketers-list" element={<MarketersList />} />
          <Route path="/edit-myreviews" element={<EditMyReviews />} />
          <Route path="/submit-review" element={<SubmitReview />} />
          <Route path="/review-list" element={<ReviewList />} />
          <Route path="/review-list-vertical" element={<ReviewListVertical />} />
          {/* <Route path="/social-platform" element={<SocialPlatform />} />  */}
          {/* New Review Section */}
          <Route path="/review-mobiles" element={<ReviewMobiles />} />
          <Route path="/scroll-top" element={<ScrollToTopButton />} />
          
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
