import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { API_DOMAIN } from '../../configdomain';


const EditMyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const token = localStorage.getItem("jwt_token");


  const fetchMyReviews = () => {
    fetch(`${API_DOMAIN}/api/reviews/`, {
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

    fetch(`${API_DOMAIN}/api/reviews/${selectedReview.id}/`, {
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
    fetch(`${API_DOMAIN}/api/reviews/${id}/`, {
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
      <div style={{ textAlign: 'center' }} className="alert alert-danger alert-dismissible fade show" role="alert">
      Remember: You are allowed to <strong>Delete</strong> only your own entries. Updates are restricted.
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
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
            <p className="text-muted">Select a review to edit (from left).</p>
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
