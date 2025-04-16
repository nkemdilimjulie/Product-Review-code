
// import React, { useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import toast from "react-hot-toast";

// const EditMyReviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [selectedReview, setSelectedReview] = useState(null);
//   const token = localStorage.getItem("jwt_token");

//   const fetchMyReviews = () => {
//     fetch("http://127.0.0.1:8080/api/reviews/", {
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setReviews(data))
//       .catch(() => toast.error("Could not fetch your reviews."));
//   };

//   useEffect(() => {
//     if (token) {
//       fetchMyReviews();
//     } else {
//       toast.error("You are not logged in");
//     }
//   }, []);

//   const handleUpdate = () => {
//     if (!selectedReview) return;

//     fetch(`http://127.0.0.1:8080/api/reviews/${selectedReview.id}/`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Token ${token}`,
//       },
//       body: JSON.stringify(selectedReview),
//     })
//       .then((res) => {
//         if (res.ok) {
//           toast.success("Updated!");
//           fetchMyReviews();
//           setSelectedReview(null);
//         } else {
//           toast.error("Update failed: no permission");
//         }
//       })
//       .catch(() => toast.error("Update failed"));
//   };

//   const handleDelete = (id) => {
//     fetch(`http://127.0.0.1:8080/api/reviews/${id}/`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     })
//       .then((res) => {
//         if (res.ok) {
//           toast.success("Deleted");
//           fetchMyReviews();
//           setSelectedReview(null);
//         } else {
//           toast.error("Delete failed: no permission");
//         }
//       })
//       .catch(() => toast.error("Delete failed"));
//   };

//   const handleLogout = () => {
//     // localStorage.removeItem("jwt_token");
//     window.location.href = "/";
//   };

//   return (
//     <div style={{ padding: "2rem", fontFamily: "Arial" }}>
//       <h2>Edit My Reviews</h2>
//       <p>Remember: you are allowed to Delete ONLY your own entries and have no permission to update any entry</p>
//       <div style={{ display: "flex", gap: "2rem" }}>
//         {/* Review List */}
//         <div
//           style={{
//             width: "40%",
//             borderRight: "1px solid #ccc",
//             maxHeight: "400px",
//             overflowY: "scroll",
//           }}
//         >
//           {reviews.length === 0 ? (
//             <p>No reviews yet.</p>
//           ) : (
//             reviews.map((review) => (
//               <div
//                 key={review.id}
//                 onClick={() => setSelectedReview(review)}
//                 style={{
//                   padding: "10px",
//                   marginBottom: "8px",
//                   border: "1px solid #ddd",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                   backgroundColor:
//                     selectedReview?.id === review.id ? "#f0f0f0" : "#fff",
//                 }}
//               >
//                 <strong>{review.phone}</strong> — {review.rate}/5
//               </div>
//             ))
//           )}
//         </div>

//         {/* Edit Form */}
//         <div style={{ width: "60%" }}>
//           {selectedReview ? (
//             <div>
//               <h3>Edit Review for {selectedReview.phone}</h3>
//               <textarea
//                 value={selectedReview.body}
//                 onChange={(e) =>
//                   setSelectedReview({
//                     ...selectedReview,
//                     body: e.target.value,
//                   })
//                 }
//                 rows={4}
//                 style={{ width: "100%", marginBottom: "10px" }}
//               />

//               <input
//                 type="text"
//                 value={selectedReview.seller}
//                 onChange={(e) =>
//                   setSelectedReview({
//                     ...selectedReview,
//                     seller: e.target.value,
//                   })
//                 }
//                 placeholder="Seller"
//                 style={{ width: "100%", marginBottom: "10px" }}
//               />

//               <input
//                 type="number"
//                 value={selectedReview.price}
//                 onChange={(e) =>
//                   setSelectedReview({
//                     ...selectedReview,
//                     price: e.target.value,
//                   })
//                 }
//                 placeholder="Price"
//                 style={{ width: "100%", marginBottom: "10px" }}
//               />

//               <input
//                 type="number"
//                 value={selectedReview.rate}
//                 onChange={(e) =>
//                   setSelectedReview({
//                     ...selectedReview,
//                     rate: e.target.value,
//                   })
//                 }
//                 min={1}
//                 max={5}
//                 placeholder="Rate (1-5)"
//                 style={{ width: "100%", marginBottom: "10px" }}
//               />

//               <div>
//                 <button onClick={handleUpdate} style={{ marginRight: "1rem" }}>
//                   Update
//                 </button>
//                 <button
//                   onClick={() => handleDelete(selectedReview.id)}
//                   style={{ color: "red" }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <p>Select a review from the left to edit.</p>
//           )}
//         </div>
//      </div>

// //       {/* Footer Buttons */}
      
//         {/* Navigation Buttons */}
//         <div style={styles.navigation}>
//             <button
//                 style={styles.navButton}
//                 onClick={() => (window.location.href = "/review-mobiles")}
//             >
//                 Review Mobiles
//             </button>
//             <button
//                 style={styles.logoutButton}
//                 onClick={() => (window.location.href = "/")}
//             >
//               Logout
//             </button>
//         </div>
//     </div>
//   );
// };

// const styles = {
//     container: {
//       padding: "2rem",
//       fontFamily: "Arial, sans-serif",
//     },
//     title: {
//       fontSize: "1.8rem",
//       marginBottom: "1.5rem",
//       color: "#333",
//     },
//     flexContainer: {
//       display: "flex",
//       gap: "2rem",
//     },
//     reviewList: {
//       width: "40%",
//       maxHeight: "400px",
//       overflowY: "scroll",
//       border: "1px solid #ccc",
//       padding: "1rem",
//       borderRadius: "8px",
//     },
//     reviewItem: {
//       borderBottom: "1px solid #eee",
//       padding: "0.5rem",
//       cursor: "pointer",
//       borderRadius: "6px",
//       marginBottom: "0.5rem",
//     },
//     formSection: {
//       width: "60%",
//     },
//     input: {
//       display: "block",
//       width: "100%",
//       marginBottom: "1rem",
//       padding: "0.5rem",
//       fontSize: "1rem",
//       borderRadius: "6px",
//       border: "1px solid #ccc",
//     },
//     buttonGroup: {
//       marginTop: "1rem",
//     },
//     primaryButton: {
//       backgroundColor: "#3b82f6",
//       color: "white",
//       padding: "0.6rem 1.2rem",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       fontWeight: "bold",
//     },
//     dangerButton: {
//       backgroundColor: "#ef4444",
//       color: "white",
//       padding: "0.6rem 1.2rem",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       fontWeight: "bold",
//       marginLeft: "1rem",
//     },
//     navigation: {
//       marginTop: "2rem",
//       display: "flex",
//       gap: "1rem",
//     },
//     navButton: {
//       backgroundColor: "#10b981",
//       color: "white",
//       padding: "0.6rem 1.5rem",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       fontWeight: "bold",
//     },
//     logoutButton: {
//       backgroundColor: "#6b7280",
//       color: "white",
//       padding: "0.6rem 1.5rem",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       fontWeight: "bold",
//     },
//   };
  

// export default EditMyReviews;





import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const EditMyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const token = localStorage.getItem("jwt_token");

  const fetchMyReviews = () => {
    fetch("http://127.0.0.1:8080/api/reviews/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch(() => toast.error("Could not fetch your reviews."));
  };

  useEffect(() => {
    if (token) {
      fetchMyReviews();
    } else {
      toast.error("You are not logged in");
    }
  }, []);

  const handleUpdate = () => {
    if (!selectedReview) return;

    fetch(`http://127.0.0.1:8080/api/reviews/${selectedReview.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(selectedReview),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Updated!");
          fetchMyReviews();
          setSelectedReview(null);
        } else {
          toast.error("Update failed: no permission");
        }
      })
      .catch(() => toast.error("Update failed"));
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8080/api/reviews/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Deleted");
          fetchMyReviews();
          setSelectedReview(null);
        } else {
          toast.error("Delete failed: no permission");
        }
      })
      .catch(() => toast.error("Delete failed"));
  };

  return (
    <div className="container my-5">
      <h2 className="mb-3 text-primary">Edit My Reviews</h2>
      <p className="text-muted">
        Remember: You are only allowed to <strong>Delete</strong> your own entries. Updates are restricted.
      </p>

      <div className="row">
        {/* Review List */}
        <div className="col-md-5 border-end pe-4" style={{ maxHeight: "400px", overflowY: "auto" }}>
          <h5 className="mb-3">My Reviews</h5>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <div className="list-group">
              {reviews.map((review) => (
                <button
                  key={review.id}
                  className={`list-group-item list-group-item-action ${selectedReview?.id === review.id ? "active" : ""
                    }`}
                  onClick={() => setSelectedReview(review)}
                >
                  <strong>{review.phone}</strong> — {review.rate}/5
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Edit Form */}
        <div className="col-md-7 mt-4 mt-md-0">
          {selectedReview ? (
            <div>
              <h5 className="mb-3">Edit Review for <span className="text-success">{selectedReview.phone}</span></h5>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows={3}
                  value={selectedReview.body}
                  onChange={(e) =>
                    setSelectedReview({
                      ...selectedReview,
                      body: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Seller"
                  value={selectedReview.seller}
                  onChange={(e) =>
                    setSelectedReview({
                      ...selectedReview,
                      seller: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={selectedReview.price}
                  onChange={(e) =>
                    setSelectedReview({
                      ...selectedReview,
                      price: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Rate (1-5)"
                  min={1}
                  max={5}
                  value={selectedReview.rate}
                  onChange={(e) =>
                    setSelectedReview({
                      ...selectedReview,
                      rate: e.target.value,
                    })
                  }
                />
              </div>

              <div className="d-flex gap-2">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(selectedReview.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <p className="text-muted">Select a review from the left to edit.</p>
          )}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="d-flex gap-3 mt-5">
        <button
          className="btn btn-success"
          onClick={() => (window.location.href = "/review-mobiles")}
        >
          Review Mobiles
        </button>
        <button
          className="btn btn-danger"
          onClick={() => (window.location.href = "/")}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default EditMyReviews;
