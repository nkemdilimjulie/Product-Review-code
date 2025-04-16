
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTopButton from './ScrollToTopButton';
import { FaArrowUp } from 'react-icons/fa';

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);  // Go back to last page
  };
  
  const goForward = () => {
    navigate(1);   // Go forward to next page
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/reviews/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('jwt_token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          console.error("Expected an array of reviews, got:", data);
        }
      })
      .catch((err) => console.error('Error fetching reviews:', err));
  }, []);

  // Filter reviews by search term
  const filteredReviews = reviews.filter((review) =>
    review.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.seller?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container py-4">
      {/* Top Nav Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">All Reviews</h2>
        <div>
          <button className="btn btn-primary me-2" onClick={() => navigate('/review-mobiles')}>Review Mobiles</button>
          <button className="btn btn-danger" onClick={() => navigate('/')}>Logout</button>
        </div>
    
        <div style={{ position: 'fixed', bottom: '80px', right: '30px', zIndex: 1000 }}>
          <button className="btn btn-secondary me-2 mb  -2" onClick={goBack}>⬅️</button>
          <button className="btn btn-secondary" onClick={goForward}>➡️</button>
        </div>

      </div>

      {/* Search Input */}
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by phone, author, or seller..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to first page on search
          }}
        />
      </div>

      {/* Review List */}
      {currentReviews.length === 0 ? (
        <p className="text-muted text-center">No reviews found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {currentReviews.map((review) => (
            <div className="col" key={review.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{review.phone}</h5>
                  <p><strong>Author:</strong> {review.author}</p>
                  <p><strong>Body:</strong> {review.body || 'N/A'}</p>
                  <p><strong>Seller:</strong> {review.seller}</p>
                  <p><strong>Price:</strong> {review.price ? `$${review.price}` : 'N/A'}</p>
                  <p><strong>Rating:</strong> {review.rate}/5</p>
                  <p className="text-muted"><strong>Created:</strong> {new Date(review.created_at).toLocaleString()}</p>
                  <p className="text-muted"><strong>Updated:</strong> {new Date(review.updated_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-4 d-flex justify-content-center">
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, idx) => (
              <li key={idx + 1} className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(idx + 1)}>
                  {idx + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Scroll to Top and Toast */}
      <ScrollToTopButton />
      <ToastContainer />
      <FaArrowUp />
    </div>
  );
}

export default ReviewList;

