import React from "react";
import { useNavigate } from "react-router-dom";

const Help = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🆘 Get Help</h2>
      <p className="lead">
        Here’s how to review products and explore marketers offering better deals:
      </p>

      <ol className="list-group list-group-numbered mb-4">
        <li className="list-group-item">
          <strong>Register</strong> with us once by clicking on the <code>Register</code> link in the navigation bar.
        </li>
        <li className="list-group-item">
          <strong>Login</strong> anytime you want to review a product or find better offers from marketers.
        </li>
        <li className="list-group-item">
          After logging in, head over to <code>Review a Mobile</code> to write your review. You’ll select the phone, enter your feedback, seller info, and rating.
        </li>
        <li className="list-group-item">
          You can view all submitted reviews under the <code>Review List</code> page.
        </li>
        <li className="list-group-item">
          Want better offers? Go to the <code>Marketers List</code> or <code>Marketer Details</code> page to explore sellers offering the same products at better prices!
        </li>
      </ol>

      <div className="alert alert-info">
        🔐 <strong>Note:</strong> Only registered and logged-in users can post reviews or view exclusive marketer details.
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handleStart}>
          🚀 Ready to Start
        </button>
      </div>
    </div>
  );
};

export default Help;
