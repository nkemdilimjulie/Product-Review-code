
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const EditReview = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("jwt_token");

//   const [reviews, setReviews] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedReviewId, setSelectedReviewId] = useState(null);
//   const [formData, setFormData] = useState({
//     author: "",
//     phone: "",
//     body: "",
//     seller: "",
//     price: "",
//     rate: "",
//   });

//   useEffect(() => {
//     fetch("http://127.0.0.1:8080/api/reviews/", {
//       headers: { Authorization: `Token ${token}` },
//     })
//       .then(res => res.json())
//       .then(data => setReviews(data))
//       .catch(error => console.error("Error fetching reviews:", error));
//   }, [token]);

//   useEffect(() => {
//     if (!selectedReviewId) return;
//     fetch(`http://127.0.0.1:8080/api/reviews/${selectedReviewId}/`, {
//       headers: { Authorization: `Token ${token}` },
//     })
//       .then(res => res.json())
//       .then(data =>
//         setFormData({
//           author: data.author,
//           phone: data.phone,
//           body: data.body,
//           seller: data.seller,
//           price: data.price,
//           rate: data.rate,
//         })
//       )
//       .catch(error => console.error("Error fetching review:", error));
//   }, [selectedReviewId, token]);

//   const handleChange = e => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleUpdate = e => {
//     e.preventDefault();
//     if (!selectedReviewId) return;

//     fetch(`http://127.0.0.1:8080/api/reviews/${selectedReviewId}/`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Token ${token}`,
//       },
//       body: JSON.stringify(formData),
//     })
//       .then(res => res.json())
//       .then(() => {
//         alert("Review updated!");
//         navigate("/review-mobiles");
//       })
//       .catch(error => console.error("Update error:", error));
//   };

//   const handleDelete = () => {
//     if (!selectedReviewId) return;

//     fetch(`http://127.0.0.1:8080/api/reviews/${selectedReviewId}/`, {
//       method: "DELETE",
//       headers: { Authorization: `Token ${token}` },
//     })
//       .then(() => {
//         alert("Review deleted!");
//         navigate("/review-mobiles");
//       })
//       .catch(error => console.error("Delete error:", error));
//   };

//   const handleLogout = () => {
//     navigate("/home");
//   };

//   // Filtered reviews
//   const filteredReviews = reviews.filter(
//     review =>
//       review.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       review.author.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container mt-4">
//       <div className="row">
//         {/* Left Column: Review List */}
//         <div className="col-md-5">
//           <h4>Review List</h4>
//           <input
//             type="text"
//             placeholder="Search by phone or author..."
//             className="form-control mb-3"
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//           />
//           <ul className="list-group">
//             {filteredReviews.map(review => (
//               <li
//                 key={review.id}
//                 className={`list-group-item ${
//                   selectedReviewId === review.id ? "active" : ""
//                 }`}
//                 style={{ cursor: "pointer" }}
//                 onClick={() => setSelectedReviewId(review.id)}
//               >
//                 #{review.id} — {review.phone} by {review.author}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Right Column: Edit Form */}
//         <div className="col-md-7">
//           <h4>Edit Review</h4>
//           {selectedReviewId ? (
//             <form onSubmit={handleUpdate}>
//               <div className="mb-3">
//                 <label className="form-label">Author</label>
//                 <input
//                   type="text"
//                   name="author"
//                   value={formData.author}
//                   className="form-control"
//                   readOnly
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Phone</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Seller</label>
//                 <input
//                   type="text"
//                   name="seller"
//                   value={formData.seller}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Rate</label>
//                 <input
//                   type="number"
//                   name="rate"
//                   value={formData.rate}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Body</label>
//                 <textarea
//                   name="body"
//                   value={formData.body}
//                   onChange={handleChange}
//                   className="form-control"
//                   rows="4"
//                 />
//               </div>

//               <div className="d-flex flex-wrap gap-2">
//                 <button type="submit" className="btn btn-primary">
//                   Update
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   onClick={handleDelete}
//                 >
//                   Delete
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-success"
//                   onClick={() => navigate("/review-mobiles")}
//                 >
//                   Back to ReviewMobiles
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <div className="alert alert-info">
//               Select a review from the list to edit.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditReview;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const EditReview = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("jwt_token");

//   const [reviews, setReviews] = useState([]);
//   const [selectedReview, setSelectedReview] = useState(null);
//   const [formData, setFormData] = useState(null);
//   const [searchIndex, setSearchIndex] = useState("");

//   // Fetch all reviews
//   useEffect(() => {
//     fetch("http://127.0.0.1:8080/api/reviews/", {
//       headers: { Authorization: `Token ${token}` },
//     })
//       .then(res => res.json())
//       .then(data => {
//         setReviews(data);
//         if (data.length > 0) {
//           setSelectedReview(data[0]);
//           setFormData(data[0]);
//         }
//       })
//       .catch(err => console.error("Error fetching reviews:", err));
//   }, [token]);

//   // When a review is selected
//   const handleSelect = (review) => {
//     setSelectedReview(review);
//     setFormData(review);
//   };

//   // Handle form input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // Update review
//   const handleUpdate = () => {
//     if (!formData) return;
//     fetch(`http://127.0.0.1:8080/api/reviews/${formData.id}/`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Token ${token}`,
//       },
//       body: JSON.stringify(formData),
//     })
//       .then(res => res.json())
//       .then(() => alert("Review updated successfully."))
//       .catch(err => console.error("Update error:", err));
//   };

//   // Delete review
//   const handleDelete = () => {
//     if (!formData) return;
//     fetch(`http://127.0.0.1:8080/api/reviews/${formData.id}/`, {
//       method: "DELETE",
//       headers: { Authorization: `Token ${token}` },
//     })
//       .then(() => {
//         alert("Review deleted.");
//         setReviews(prev => prev.filter(r => r.id !== formData.id));
//         setFormData(null);
//         setSelectedReview(null);
//       })
//       .catch(err => console.error("Delete error:", err));
//   };

//   // Search review by index (1-based)
//   const handleSearch = () => {
//     const index = parseInt(searchIndex, 10) - 1;
//     if (!isNaN(index) && reviews[index]) {
//       handleSelect(reviews[index]);
//     } else {
//       alert("Invalid index number.");
//     }
//   };

//   const handleLogout = () => {
//     navigate("/home");
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       {/* LEFT COLUMN: Review List */}
//       <div style={{ width: "45%", overflowY: "scroll", padding: "1rem", borderRight: "1px solid #ccc" }}>
//         <h4>Review List</h4>
//         <div style={{ marginBottom: "1rem" }}>
//           <input
//             type="text"
//             placeholder="Enter index (1, 2, 3...)"
//             value={searchIndex}
//             onChange={(e) => setSearchIndex(e.target.value)}
//             style={{ marginRight: "8px", padding: "4px" }}
//           />
//           <button onClick={handleSearch} className="btn btn-sm btn-primary">Search</button>
//         </div>
//         {reviews.map((review, idx) => (
//           <div
//             key={review.id}
//             onClick={() => handleSelect(review)}
//             style={{
//               padding: "0.5rem",
//               marginBottom: "0.5rem",
//               backgroundColor: selectedReview?.id === review.id ? "#e9ecef" : "#f8f9fa",
//               cursor: "pointer",
//               border: "1px solid #ddd",
//               borderRadius: "5px",
//             }}
//           >
//             <strong>#{idx + 1}</strong> - {review.phone} by {review.author}
//           </div>
//         ))}
//       </div>

//       {/* RIGHT COLUMN: Edit Form */}
//       <div style={{ width: "55%", padding: "2rem", position: "sticky", top: 0, alignSelf: "flex-start" }}>
//         {formData ? (
//           <div>
//             <h4>Edit Review #{formData.id}</h4>
//             <form>
//               <div className="mb-3">
//                 <label>Author</label>
//                 <input type="text" name="author" value={formData.author} readOnly className="form-control" />
//               </div>
//               <div className="mb-3">
//                 <label>Phone</label>
//                 <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-control" />
//               </div>
//               <div className="mb-3">
//                 <label>Seller</label>
//                 <input type="text" name="seller" value={formData.seller} onChange={handleChange} className="form-control" />
//               </div>
//               <div className="mb-3">
//                 <label>Price</label>
//                 <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control" />
//               </div>
//               <div className="mb-3">
//                 <label>Rate</label>
//                 <input type="number" name="rate" value={formData.rate} onChange={handleChange} className="form-control" />
//               </div>
//               <div className="mb-3">
//                 <label>Body</label>
//                 <textarea name="body" value={formData.body} onChange={handleChange} className="form-control" rows={4} />
//               </div>
//               <button type="button" onClick={handleUpdate} className="btn btn-primary me-2">Update</button>
//               <button type="button" onClick={handleDelete} className="btn btn-danger me-2">Delete</button>
//               <button type="button" onClick={handleLogout} className="btn btn-secondary">Logout</button>
//             </form>
//           </div>
//         ) : (
//           <p>Select a review from the list to view/edit.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EditReview;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EditReview = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("jwt_token");

//   const [reviews, setReviews] = useState([]);
//   const [selectedReviewId, setSelectedReviewId] = useState(null);
//   const [searchIndex, setSearchIndex] = useState("");
//   const [formData, setFormData] = useState({
//     author: "",
//     phone: "",
//     body: "",
//     seller: "",
//     price: "",
//     rate: "",
//   });

//   useEffect(() => {
//     fetch("http://127.0.0.1:8080/api/reviews/", {
//       headers: { Authorization: `Token ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) => setReviews(data))
//       .catch((error) => toast.error("❌ Error fetching reviews."));
//   }, [token]);

//   useEffect(() => {
//     if (!selectedReviewId) return;
//     fetch(`http://127.0.0.1:8080/api/reviews/${selectedReviewId}/`, {
//       headers: { Authorization: `Token ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) =>
//         setFormData({
//           author: data.author,
//           phone: data.phone,
//           body: data.body,
//           seller: data.seller,
//           price: data.price,
//           rate: data.rate,
//         })
//       )
//       .catch((error) => toast.error("❌ Error fetching review."));
//   }, [selectedReviewId, token]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     fetch(`http://127.0.0.1:8080/api/reviews/${selectedReviewId}/`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Token ${token}`,
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((res) => res.json())
//       .then(() => toast.success("✅ Review updated!"))
//       .catch((error) => toast.error("❌ Update failed."));
//   };

//   const handleDelete = () => {
//     fetch(`http://127.0.0.1:8080/api/reviews/${selectedReviewId}/`, {
//       method: "DELETE",
//       headers: { Authorization: `Token ${token}` },
//     })
//       .then(() => {
//         toast.success("🗑️ Review deleted!");
//         setReviews(reviews.filter((r) => r.id !== selectedReviewId));
//         setSelectedReviewId(null);
//       })
//       .catch((error) => toast.error("❌ Delete failed."));
//   };

//   const handleSearch = () => {
//     const index = parseInt(searchIndex);
//     if (!isNaN(index) && index >= 1 && index <= reviews.length) {
//       setSelectedReviewId(reviews[index - 1].id);
//     } else {
//       toast.warning("🔍 No review at this index.");
//     }
//   };

//   return (
//     <div className="container-fluid mt-4">
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
//       <div className="row">
//         {/* Left Column: Review List */}
//         <div className="col-md-5 bg-white rounded shadow p-3" style={{ maxHeight: "90vh", overflowY: "auto" }}>
//           <h4 className="text-primary">Review List</h4>
//           <div className="input-group mb-3">
//             <input
//               type="number"
//               className="form-control"
//               placeholder="Search by index"
//               value={searchIndex}
//               onChange={(e) => setSearchIndex(e.target.value)}
//             />
//             <button className="btn btn-outline-primary" onClick={handleSearch}>
//               Search
//             </button>
//           </div>
//           <ul className="list-group">
//             {reviews.map((review, index) => (
//               <li
//                 key={review.id}
//                 className={`list-group-item ${
//                   selectedReviewId === review.id ? "active" : ""
//                 }`}
//                 style={{ cursor: "pointer" }}
//                 onClick={() => setSelectedReviewId(review.id)}
//               >
//                 {index + 1}. Review #{review.id} (Phone ID: {review.phone})
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Right Column: Form */}
//         <div
//           className="col-md-7 bg-light p-4 rounded shadow"
//           style={{ position: "sticky", top: 20, alignSelf: "flex-start" }}
//         >
//           <h4 className="mb-3 text-success">Edit Selected Review</h4>
//           {selectedReviewId ? (
//             <form onSubmit={handleUpdate}>
//               <div className="mb-3">
//                 <label className="form-label">Author</label>
//                 <input type="text" name="author" value={formData.author} className="form-control" readOnly />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Phone ID</label>
//                 <input type="text" name="phone" value={formData.phone} className="form-control" readOnly />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Seller</label>
//                 <input type="text" name="seller" value={formData.seller} onChange={handleChange} className="form-control" />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Price</label>
//                 <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control" />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Rate</label>
//                 <input type="number" name="rate" value={formData.rate} onChange={handleChange} className="form-control" />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Body</label>
//                 <textarea name="body" value={formData.body} onChange={handleChange} className="form-control" rows="4" />
//               </div>

//               <div className="d-flex gap-2">
//                 <button type="submit" className="btn btn-success">Update</button>
//                 <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
//                 <button type="button" className="btn btn-secondary" onClick={() => navigate("/home")}>Logout</button>
//               </div>
//             </form>
//           ) : (
//             <div className="alert alert-info">Select a review to edit it.</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditReview;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EditReview = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("jwt_token");

//   const [reviews, setReviews] = useState([]);
//   const [selectedReviewId, setSelectedReviewId] = useState(null);
//   const [searchIndex, setSearchIndex] = useState("");
//   const [phoneFilter, setPhoneFilter] = useState("");
//   const [formData, setFormData] = useState({
//     author: "",
//     phone: "",
//     body: "",
//     seller: "",
//     price: "",
//     rate: "",
//   });

//   useEffect(() => {
//     fetch("http://127.0.0.1:8080/api/reviews/", {
//       headers: { Authorization: `Token ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) => setReviews(data))
//       .catch((error) => toast.error("❌ Error fetching reviews."));
//   }, [token]);

//   useEffect(() => {
//     if (!selectedReviewId) return;
//     fetch(`http://127.0.0.1:8080/api/reviews/${selectedReviewId}/`, {
//       headers: { Authorization: `Token ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) =>
//         setFormData({
//           author: data.author,
//           phone: data.phone,
//           body: data.body,
//           seller: data.seller,
//           price: data.price,
//           rate: data.rate,
//         })
//       )
//       .catch((error) => toast.error("❌ Error fetching review."));
//   }, [selectedReviewId, token]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     fetch(`http://127.0.0.1:8080/api/reviews/${selectedReviewId}/`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Token ${token}`,
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((res) => res.json())
//       .then(() => toast.success("✅ Review updated!"))
//       .catch((error) => toast.error("❌ Update failed."));
//   };

//   const handleDelete = () => {
//     fetch(`http://127.0.0.1:8080/api/reviews/${selectedReviewId}/`, {
//       method: "DELETE",
//       headers: { Authorization: `Token ${token}` },
//     })
//       .then(() => {
//         toast.success("🗑️ Review deleted!");
//         setReviews(reviews.filter((r) => r.id !== selectedReviewId));
//         setSelectedReviewId(null);
//       })
//       .catch((error) => toast.error("❌ Delete failed."));
//   };

//   const handleSearch = () => {
//     const index = parseInt(searchIndex);
//     if (!isNaN(index) && index >= 1 && index <= reviews.length) {
//       setSelectedReviewId(reviews[index - 1].id);
//     } else {
//       toast.warning("🔍 No review at this index.");
//     }
//   };

//   const uniquePhones = Array.from(new Set(reviews.map((r) => r.phone)));
//   const filteredReviews = phoneFilter
//     ? reviews.filter((r) => r.phone === phoneFilter)
//     : reviews;

//   return (
//     <div className="container-fluid mt-4">
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
//       <div className="row">
//         {/* Left Column: Review List */}
//         <div className="col-md-5 bg-white rounded shadow p-3" style={{ maxHeight: "90vh", overflowY: "auto" }}>
//           <h4 className="text-primary">Review List</h4>
//           <div className="input-group mb-2">
//             <select
//               className="form-select"
//               value={phoneFilter}
//               onChange={(e) => setPhoneFilter(e.target.value)}
//             >
//               <option value="">Filter by Phone</option>
//               {uniquePhones.map((phoneId) => (
//                 <option key={phoneId} value={phoneId}>
//                   Phone ID: {phoneId}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="input-group mb-3">
//             <input
//               type="number"
//               className="form-control"
//               placeholder="Search by index"
//               value={searchIndex}
//               onChange={(e) => setSearchIndex(e.target.value)}
//             />
//             <button className="btn btn-outline-primary" onClick={handleSearch}>
//               Search
//             </button>
//           </div>
//           <ul className="list-group">
//             {filteredReviews.map((review, index) => (
//               <li
//                 key={review.id}
//                 className={`list-group-item ${
//                   selectedReviewId === review.id ? "active" : ""
//                 }`}
//                 style={{ cursor: "pointer" }}
//                 onClick={() => setSelectedReviewId(review.id)}
//               >
//                 {index + 1}. Review #{review.id} (Phone ID: {review.phone})
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Right Column: Form */}
//         <div
//           className="col-md-7 bg-light p-4 rounded shadow"
//           style={{ position: "sticky", top: 20, alignSelf: "flex-start" }}
//         >
//           <h4 className="mb-3 text-success">Edit Selected Review</h4>
//           {selectedReviewId ? (
//             <form onSubmit={handleUpdate}>
//               <div className="mb-3">
//                 <label className="form-label">Author</label>
//                 <input type="text" name="author" value={formData.author} className="form-control" readOnly />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Phone ID</label>
//                 <input type="text" name="phone" value={formData.phone} className="form-control" readOnly />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Seller</label>
//                 <input type="text" name="seller" value={formData.seller} onChange={handleChange} className="form-control" />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Price</label>
//                 <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control" />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Rate</label>
//                 <input type="number" name="rate" value={formData.rate} onChange={handleChange} className="form-control" />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Body</label>
//                 <textarea name="body" value={formData.body} onChange={handleChange} className="form-control" rows="4" />
//               </div>

//               <div className="d-flex gap-2">
//                 <button type="submit" className="btn btn-success">Update</button>
//                 <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
//                 <button type="button" className="btn btn-secondary" onClick={() => navigate("/home")}>Logout</button>
//               </div>
//             </form>
//           ) : (
//             <div className="alert alert-info">Select a review to edit it.</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditReview;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EditReview = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("jwt_token");

//   const [reviews, setReviews] = useState([]);
//   const [selectedReviewId, setSelectedReviewId] = useState(null);
//   const [searchIndex, setSearchIndex] = useState("");
//   const [phoneFilter, setPhoneFilter] = useState("");
//   const [formData, setFormData] = useState({
//     author: "",
//     phone: "",
//     body: "",
//     seller: "",
//     price: "",
//     rate: "",
//   });

//   // Fetch reviews of the logged-in user
//   useEffect(() => {
//     fetch("http://127.0.0.1:8080/api/reviews/", {
//       headers: { Authorization: `Token ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) => setReviews(data))
//       .catch((error) => toast.error("❌ Error fetching reviews."));
//   }, [token]);

//   // Fetch the selected review details for editing
//   useEffect(() => {
//     if (!selectedReviewId) return;
//     fetch(`http://127.0.0.1:8080/api/reviews/${selectedReviewId}/`, {
//       headers: { Authorization: `Token ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) =>
//         setFormData({
//           author: data.author,
//           phone: data.phone,
//           body: data.body,
//           seller: data.seller,
//           price: data.price,
//           rate: data.rate,
//         })
//       )
//       .catch((error) => toast.error("❌ Error fetching review."));
//   }, [selectedReviewId, token]);

//   // Handle input field changes
//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   // Update the selected review
//   const handleUpdate = (e) => {
//     e.preventDefault();
//     fetch(`http://127.0.0.1:8080/api/reviews/${selectedReviewId}/`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Token ${token}`,
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((res) => res.json())
//       .then(() => toast.success("✅ Review updated!"))
//       .catch((error) => toast.error("❌ Update failed."));
//   };

//   // Delete the selected review
//   const handleDelete = () => {
//     fetch(`http://127.0.0.1:8080/api/reviews/${selectedReviewId}/`, {
//       method: "DELETE",
//       headers: { Authorization: `Token ${token}` },
//     })
//       .then(() => {
//         toast.success("🗑️ Review deleted!");
//         setReviews(reviews.filter((r) => r.id !== selectedReviewId));
//         setSelectedReviewId(null);
//       })
//       .catch((error) => toast.error("❌ Delete failed."));
//   };

//   // Search for a review by its index
//   const handleSearch = () => {
//     const index = parseInt(searchIndex);
//     if (!isNaN(index) && index >= 1 && index <= reviews.length) {
//       setSelectedReviewId(reviews[index - 1].id);
//     } else {
//       toast.warning("🔍 No review at this index.");
//     }
//   };

//   // Filter reviews by phone ID
//   const uniquePhones = Array.from(new Set(reviews.map((r) => r.phone)));
//   const filteredReviews = phoneFilter
//     ? reviews.filter((r) => r.phone === phoneFilter)
//     : reviews;

//   return (
//     <div className="container-fluid mt-4">
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
//       <div className="row">
//         {/* Left Column: Review List */}
//         <div className="col-md-5 bg-white rounded shadow p-3" style={{ maxHeight: "90vh", overflowY: "auto" }}>
//           <h4 className="text-primary">Review List</h4>
//           {reviews.length === 0 ? (
//             <div className="alert alert-info">You haven't submitted any reviews yet.</div>
//           ) : (
//             <>
//               {/* Filter by Phone */}
//               <div className="input-group mb-2">
//                 <select
//                   className="form-select"
//                   value={phoneFilter}
//                   onChange={(e) => setPhoneFilter(e.target.value)}
//                 >
//                   <option value="">Filter by Phone</option>
//                   {uniquePhones.map((phoneId) => (
//                     <option key={phoneId} value={phoneId}>
//                       Phone ID: {phoneId}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Search by Index */}
//               <div className="input-group mb-3">
//                 <input
//                   type="number"
//                   className="form-control"
//                   placeholder="Search by index"
//                   value={searchIndex}
//                   onChange={(e) => setSearchIndex(e.target.value)}
//                 />
//                 <button className="btn btn-outline-primary" onClick={handleSearch}>
//                   Search
//                 </button>
//               </div>

//               {/* Review List */}
//               <ul className="list-group">
//                 {filteredReviews.map((review, index) => (
//                   <li
//                     key={review.id}
//                     className={`list-group-item ${selectedReviewId === review.id ? "active" : ""}`}
//                     style={{ cursor: "pointer" }}
//                     onClick={() => setSelectedReviewId(review.id)}
//                   >
//                     {index + 1}. Review #{review.id} (Phone ID: {review.phone})
//                   </li>
//                 ))}
//               </ul>
//             </>
//           )}
//         </div>

//         {/* Right Column: Form */}
//         <div
//           className="col-md-7 bg-light p-4 rounded shadow"
//           style={{ position: "sticky", top: 20, alignSelf: "flex-start" }}
//         >
//           <h4 className="mb-3 text-success">Edit Selected Review</h4>
//           {selectedReviewId ? (
//             <form onSubmit={handleUpdate}>
//               <div className="mb-3">
//                 <label className="form-label">Author</label>
//                 <input type="text" name="author" value={formData.author} className="form-control" readOnly />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Phone ID</label>
//                 <input type="text" name="phone" value={formData.phone} className="form-control" readOnly />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Seller</label>
//                 <input
//                   type="text"
//                   name="seller"
//                   value={formData.seller}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Rate</label>
//                 <input
//                   type="number"
//                   name="rate"
//                   value={formData.rate}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Body</label>
//                 <textarea
//                   name="body"
//                   value={formData.body}
//                   onChange={handleChange}
//                   className="form-control"
//                   rows="4"
//                 />
//               </div>

//               <div className="d-flex gap-2">
//                 <button type="submit" className="btn btn-success">Update Review</button>
//                 <button type="button" className="btn btn-danger" onClick={handleDelete}>
//                   Delete Review
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <div className="alert alert-warning">Select a review to edit.</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditReview;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EditReview = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("jwt_token");

//   const [reviews, setReviews] = useState([]);
//   const [selectedReviewId, setSelectedReviewId] = useState(null);
//   const [searchIndex, setSearchIndex] = useState("");
//   const [phoneFilter, setPhoneFilter] = useState("");
//   const [formData, setFormData] = useState({
//     author: "",
//     phone: "",
//     body: "",
//     seller: "",
//     price: "",
//     rate: "",
//   });

//   // Fetch reviews of the logged-in user
//   useEffect(() => {
//     fetch("http://127.0.0.1:8080/api/reviews/", {
//       headers: { Authorization: `Token ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) => setReviews(data))
//       .catch((error) => toast.error("❌ Error fetching reviews."));
//   }, [token]);

//   // Fetch the selected review details for editing
//   useEffect(() => {
//     if (!selectedReviewId) return;
//     fetch(`http://127.0.0.1:8080/api/reviews/${selectedReviewId}/`, {
//       headers: { Authorization: `Token ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) =>
//         setFormData({
//           author: data.author,
//           phone: data.phone,
//           body: data.body,
//           seller: data.seller,
//           price: data.price,
//           rate: data.rate,
//         })
//       )
//       .catch((error) => toast.error("❌ Error fetching review."));
//   }, [selectedReviewId, token]);

//   // Handle input field changes
//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
  
//     fetch(`http://127.0.0.1:8080/api/reviews/${selectedReviewId}/`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Token ${token}`,
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           return res.json().then((error) => {
//             // Log the error response for debugging
//             console.error("Error response:", error);
//             throw new Error(error.detail || "Failed to update review");
//           });
//         }
//         return res.json();
//       })
//       .then(() => {
//         toast.success("✅ Review updated!");
//         // Update the local review list after successful update
//         setReviews(reviews.map((r) => (r.id === selectedReviewId ? { ...r, ...formData } : r)));
//       })
//       .catch((error) => {
//         toast.error(`❌ ${error.message}`);
//       });
//   };
  
//   // Delete the selected review
//   const handleDelete = () => {
//     fetch(`http://127.0.0.1:8080/api/reviews/${selectedReviewId}/`, {
//       method: "DELETE",
//       headers: { Authorization: `Token ${token}` },
//     })
//       .then(() => {
//         toast.success("🗑️ Review deleted!");
//         setReviews(reviews.filter((r) => r.id !== selectedReviewId));
//         setSelectedReviewId(null);
//       })
//       .catch((error) => toast.error("❌ Delete failed."));
//   };

//   // Search for a review by its index
//   const handleSearch = () => {
//     const index = parseInt(searchIndex);
//     if (!isNaN(index) && index >= 1 && index <= reviews.length) {
//       setSelectedReviewId(reviews[index - 1].id);
//     } else {
//       toast.warning("🔍 No review at this index.");
//     }
//   };

//   // Filter reviews by phone ID
//   const uniquePhones = Array.from(new Set(reviews.map((r) => r.phone)));
//   const filteredReviews = phoneFilter
//     ? reviews.filter((r) => r.phone === phoneFilter)
//     : reviews;

//   // Navigate to the home page (Logout)
//   const handleLogout = () => {
//     // localStorage.removeItem("jwt_token");
//     navigate("/");
//   };

//   // Navigate to Review Mobiles page
//   const handleReviewMobiles = () => {
//     navigate("/review-mobiles");
//   };

//   return (
//     <div className="container-fluid mt-4">
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
//       <div className="row">
//         {/* Left Column: Review List */}
//         <div className="col-md-5 bg-white rounded shadow p-3" style={{ maxHeight: "90vh", overflowY: "auto" }}>
//           <h4 className="text-primary">Review List</h4>
//           {reviews.length === 0 ? (
//             <div className="alert alert-info">You haven't submitted any reviews yet.</div>
//           ) : (
//             <>
//               {/* Filter by Phone */}
//               <div className="input-group mb-2">
//                 <select
//                   className="form-select"
//                   value={phoneFilter}
//                   onChange={(e) => setPhoneFilter(e.target.value)}
//                 >
//                   <option value="">Filter by Phone</option>
//                   {uniquePhones.map((phoneId) => (
//                     <option key={phoneId} value={phoneId}>
//                       Phone ID: {phoneId}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Search by Index */}
//               <div className="input-group mb-3">
//                 <input
//                   type="number"
//                   className="form-control"
//                   placeholder="Search by index"
//                   value={searchIndex}
//                   onChange={(e) => setSearchIndex(e.target.value)}
//                 />
//                 <button className="btn btn-outline-primary" onClick={handleSearch}>
//                   Search
//                 </button>
//               </div>

//               {/* Review List */}
//               <ul className="list-group">
//                 {filteredReviews.map((review, index) => (
//                   <li
//                     key={review.id}
//                     className={`list-group-item ${selectedReviewId === review.id ? "active" : ""}`}
//                     style={{ cursor: "pointer" }}
//                     onClick={() => setSelectedReviewId(review.id)}
//                   >
//                     {index + 1}. Review #{review.id} (Phone ID: {review.phone})
//                   </li>
//                 ))}
//               </ul>
//             </>
//           )}
//         </div>

//         {/* Right Column: Form */}
//         <div
//           className="col-md-7 bg-light p-4 rounded shadow"
//           style={{ position: "sticky", top: 20, alignSelf: "flex-start" }}
//         >
//           <h4 className="mb-3 text-success">Edit Selected Review</h4>
//           {selectedReviewId ? (
//             <form onSubmit={handleUpdate}>
//               <div className="mb-3">
//                 <label className="form-label">Author</label>
//                 <input type="text" name="author" value={formData.author} className="form-control" readOnly />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Phone ID</label>
//                 <input type="text" name="phone" value={formData.phone} className="form-control" readOnly />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Seller</label>
//                 <input
//                   type="text"
//                   name="seller"
//                   value={formData.seller}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Rate</label>
//                 <input
//                   type="number"
//                   name="rate"
//                   value={formData.rate}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Body</label>
//                 <textarea
//                   name="body"
//                   value={formData.body}
//                   onChange={handleChange}
//                   className="form-control"
//                   rows="4"
//                 />
//               </div>

//               <div className="d-flex gap-2">
//                 <button type="submit" className="btn btn-success">Update Review</button>
//                 <button type="button" className="btn btn-danger" onClick={handleDelete}>
//                   Delete Review
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <div className="alert alert-warning">Select a review to edit.</div>
//           )}

//           {/* Buttons for navigation */}
//           <div className="mt-4 d-flex justify-content-between">
//             <button className="btn btn-primary" onClick={handleReviewMobiles}>
//               Review Mobiles
//             </button>
//             <button className="btn btn-secondary" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditReview;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditReview = () => {
  const navigate = useNavigate();
  // const token = localStorage.getItem("jwt_token");

  // Decode token to get username
  // let decoded = null;
  // let userName = "";
  // if (token) {
  //   decoded = jwt_decode(token);
  //   userName = decoded?.username || "";
  // }


  const token = localStorage.getItem("jwt_token");
  
  let decoded = null;
  let userName = "";
  
  if (token && token.split(".").length === 3) {
    try {
      decoded = jwtDecode(token);
      userName = decoded?.username || "";
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  } else {
    console.warn("Invalid or missing JWT token:", token);
  }
  
  const [reviews, setReviews] = useState([]);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [searchIndex, setSearchIndex] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [formData, setFormData] = useState({
    phone: "",
    body: "",
    author: userName,
    rate: "",
    seller: "",
    price: "",
    
  });

  // Fetch reviews of the logged-in user
  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/reviews/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch(() => toast.error("❌ Error fetching reviews."));
  }, [token]);

  // When a review is selected, populate the form
  useEffect(() => {
    if (!selectedReviewId) return;

    fetch(`http://127.0.0.1:8080/api/reviews/${selectedReviewId}/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) =>
        setFormData({
          author: userName,
          phone: data.phone,
          body: data.body,
          seller: data.seller,
          price: data.price,
          rate: data.rate,
        })
      )
      .catch(() => toast.error("❌ Error fetching selected review."));
  }, [selectedReviewId]);

  // Handle form field updates
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Update the selected review
  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`http://127.0.0.1:8080/api/reviews/${selectedReviewId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((err) => Promise.reject(err));
        return res.json();
      })
      .then(() => {
        toast.success("✅ Review updated!");
        setReviews((prev) =>
          prev.map((r) => (r.id === selectedReviewId ? { ...r, ...formData } : r))
        );
      })
      .catch((err) => {
        const errorMsg = err?.detail || "❌ Failed to update.";
        toast.error(errorMsg);
      });
  };

  // Delete selected review
  const handleDelete = () => {
    fetch(`http://127.0.0.1:8080/api/reviews/${selectedReviewId}/`, {
      method: "DELETE",
      headers: { Authorization: `Token ${token}` },
    })
      .then(() => {
        toast.success("🗑️ Review deleted!");
        setReviews((prev) => prev.filter((r) => r.id !== selectedReviewId));
        setSelectedReviewId(null);
      })
      .catch(() => toast.error("❌ Delete failed."));
  };

  // Handle search
  const handleSearch = () => {
    const index = parseInt(searchIndex);
    if (!isNaN(index) && index >= 1 && index <= reviews.length) {
      setSelectedReviewId(reviews[index - 1].id);
    } else {
      toast.warning("🔍 No review at this index.");
    }
  };

  const uniquePhones = Array.from(new Set(reviews.map((r) => r.phone)));
  const filteredReviews = phoneFilter
    ? reviews.filter((r) => r.phone === phoneFilter)
    : reviews;

  const handleLogout = () => navigate("/");
  const handleReviewMobiles = () => navigate("/review-mobiles");

  return (
    <div className="container-fluid mt-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar pauseOnHover />
      <div className="row">
        {/* Left Column */}
        <div className="col-md-5 bg-white rounded shadow p-3" style={{ maxHeight: "90vh", overflowY: "auto" }}>
          <h4 className="text-primary">Review List</h4>

          {reviews.length === 0 ? (
            <div className="alert alert-info">No reviews yet.</div>
          ) : (
            <>
              {/* Filter by Phone */}
              <div className="input-group mb-2">
                <select
                  className="form-select"
                  value={phoneFilter}
                  onChange={(e) => setPhoneFilter(e.target.value)}
                >
                  <option value="">Filter by Phone</option>
                  {uniquePhones.map((p) => (
                    <option key={p} value={p}>Phone ID: {p}</option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Search by index"
                  value={searchIndex}
                  onChange={(e) => setSearchIndex(e.target.value)}
                />
                <button className="btn btn-outline-primary" onClick={handleSearch}>
                  Search
                </button>
              </div>

              {/* Review Items */}
              <ul className="list-group">
                {filteredReviews.map((review, index) => (
                  <li
                    key={review.id}
                    className={`list-group-item ${selectedReviewId === review.id ? "active" : ""}`}
                    onClick={() => setSelectedReviewId(review.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {index + 1}. Review #{review.id} (Phone ID: {review.phone})
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Right Column: Form */}
        <div className="col-md-7 bg-light p-4 rounded shadow" style={{ position: "sticky", top: 20 }}>
          <h4 className="mb-3 text-success">Edit Selected Review</h4>
          {selectedReviewId ? (
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label">Author</label>
                <input type="text" name="author" value={formData.author} className="form-control" readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone ID</label>
                <input type="text" name="phone" value={formData.phone} className="form-control" readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label">Seller</label>
                <input type="text" name="seller" value={formData.seller} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Rate</label>
                <input type="number" name="rate" value={formData.rate} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Body</label>
                <textarea name="body" value={formData.body} onChange={handleChange} className="form-control" rows="4" />
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">Update Review</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Review</button>
              </div>
            </form>
          ) : (
            <div className="alert alert-warning">Select a review to edit.</div>
          )}

          <div className="mt-4 d-flex justify-content-between">
            <button className="btn btn-primary" onClick={handleReviewMobiles}>Review Mobiles</button>
            <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReview;
