// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const ReviewMobile = () => {
//   const [phones, setPhones] = useState([]);
//   const [formData, setFormData] = useState({
//     phone: "",
//     body: "",
//     author: "",
//     created_at: new Date().toISOString(),
//     seller: "",
//     price: "",
//     rate: "",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPhones = async () => {
//       // Simulate fetching phones data (you can replace this with actual API calls)
//       setPhones([
//         { id: 1, brand: "Samsung", model: "Galaxy S21" },
//         { id: 2, brand: "Apple", model: "iPhone 13" },
//         // Add more mock phones as needed
//       ]);

//       // Get the username from localStorage
//       const username = localStorage.getItem("username");
//       setFormData((prev) => ({
//         ...prev,
//         author: username || "",  // Set the username if available
//       }));
//     };

//     fetchPhones();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
  
//     // Prepare the review data
//     const newReview = { ...formData, created_at: new Date().toISOString() };
  
//     // Load existing reviews from localStorage
//     const savedReviews = JSON.parse(localStorage.getItem("review-mobile")) || [];
  
//     // Add the new review to the array
//     savedReviews.push(newReview);
  
//     // Save the updated reviews to localStorage
//     localStorage.setItem("review-mobile", JSON.stringify(savedReviews));
  
//     // Navigate to the SubmitReview page to confirm submission
//     navigate("/submit-review", { state: newReview });
//   };
  
  

//   return (
//     <div className="container mt-4">
//       <h2>📱 Review a Mobile</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Phone Dropdown */}
//         <div className="mb-3">
//           <label className="form-label">Phone</label>
//           <select
//             className="form-select"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select a Phone</option>
//             {phones.map((phone) => (
//               <option key={phone.id} value={phone.id}>
//                 {phone.brand} - {phone.model}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Review Body */}
//         <div className="mb-3">
//           <label className="form-label">Review</label>
//           <textarea
//             className="form-control"
//             name="body"
//             rows="4"
//             value={formData.body}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>

//         {/* Author (auto-filled) */}
//         <div className="mb-3">
//           <label className="form-label">Author</label>
//           <input
//             className="form-control"
//             type="text"
//             name="author"
//             value={formData.author}
//             readOnly
//           />
//         </div>

//         {/* Seller */}
//         <div className="mb-3">
//           <label className="form-label">Seller</label>
//           <input
//             className="form-control"
//             type="text"
//             name="seller"
//             value={formData.seller}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Price */}
//         <div className="mb-3">
//           <label className="form-label">Price ($)</label>
//           <input
//             className="form-control"
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Rate */}
//         <div className="mb-3">
//           <label className="form-label">Rate (1–5)</label>
//           <input
//             className="form-control"
//             type="number"
//             name="rate"
//             value={formData.rate}
//             onChange={handleChange}
//             min="1"
//             max="5"
//             required
//           />
//         </div>

//         <button className="btn btn-success" type="submit">
//           ✅ Submit Review
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ReviewMobile;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReviewMobile = () => {
  const [phones, setPhones] = useState([]);
  const [formData, setFormData] = useState({
    phone: "",
    body: "",
    author: "",
    created_at: new Date().toISOString(),
    seller: "",
    price: "",
    rate: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhones = async () => {
      // Simulate fetching phones data (you can replace this with actual API calls)
      setPhones([
        { id: 1, brand: "Samsung", model: "Galaxy S21" },
        { id: 2, brand: "Apple", model: "iPhone 13" },
        // Add more mock phones as needed
      ]);

      // Get the username from localStorage
      const username = localStorage.getItem("username");
      setFormData((prev) => ({
        ...prev,
        author: username || "",  // Set the username if available
      }));
    };

    fetchPhones();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = { ...formData, created_at: new Date().toISOString() };
    const savedReviews = JSON.parse(localStorage.getItem("review-mobile")) || [];
    savedReviews.push(newReview);
    localStorage.setItem("review-mobile", JSON.stringify(savedReviews));

    // Navigate to the review list page after submitting the review
    navigate("/review-list");
  };

  return (
    <div className="container mt-4">
      <h2>📱 Review a Mobile</h2>
      <form onSubmit={handleSubmit}>
        {/* Phone Dropdown */}
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <select
            className="form-select"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          >
            <option value="">Select a Phone</option>
            {phones.map((phone) => (
              <option key={phone.id} value={phone.id}>
                {phone.brand} - {phone.model}
              </option>
            ))}
          </select>
        </div>

        {/* Review Body */}
        <div className="mb-3">
          <label className="form-label">Review</label>
          <textarea
            className="form-control"
            name="body"
            rows="4"
            value={formData.body}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Author (auto-filled) */}
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            className="form-control"
            type="text"
            name="author"
            value={formData.author}
            readOnly
          />
        </div>

        {/* Seller */}
        <div className="mb-3">
          <label className="form-label">Seller</label>
          <input
            className="form-control"
            type="text"
            name="seller"
            value={formData.seller}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price ($)</label>
          <input
            className="form-control"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Rate */}
        <div className="mb-3">
          <label className="form-label">Rate (1–5)</label>
          <input
            className="form-control"
            type="number"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
        </div>

        <button className="btn btn-success" type="submit">
          ✅ Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewMobile;
