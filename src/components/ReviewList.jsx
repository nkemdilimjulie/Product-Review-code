
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTopButton from './ScrollToTopButton';
import { FaArrowUp } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { API_DOMAIN } from '../../configdomain';

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [expandedCard, setExpandedCard] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();


  const goBack = () => {
    navigate(-1);  // Go back to last page
  };
  
  const goForward = () => {
    navigate(1);   // Go forward to next page
  };

  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const pageQuery = parseInt(query.get('page')) || 1;
    setPage(pageQuery);
  }, [location.search]);

  useEffect(() => {
    fetch(`${API_DOMAIN}/api/reviews/?ordering=-created_at&page=${page}`, {

      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('jwt_token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched data:', data);
        if (Array.isArray(data)) {
          const filtered = data.filter(r =>
            searchTerm === '' || r.author.toLowerCase().includes(searchTerm.toLowerCase()));
          setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
          setReviews(filtered);
        } else {
          console.error("Expected an array of reviews, got:", data);
        }
      })
      .catch((err) => console.error('Error fetching reviews:', err));
  }, [searchTerm]);

  const handleExport = (type) => {
    const headers = ['Author', 'Phone', 'Body', 'Seller', 'Price', 'Rate', 'Created', 'Updated'];
    const rows = reviews.map(r => [
      r.author,
      r.phone,
      r.body || 'N/A',
      r.seller,
      r.price || 'N/A',
      r.rate,
      new Date(r.created_at).toLocaleString(),
      new Date(r.updated_at).toLocaleString()
    ]);
  
    if (type === 'pdf') {
      const doc = new jsPDF();
      autoTable(doc, {
        head: [headers],
        body: rows,
      });
      doc.save('reviews.pdf');
    } else {
      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'reviews.csv');
    }
  };
  
  const buttonStyle = {
    margin: '8px',
    padding: '10px 20px',
    borderRadius: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  };

  const currentReviews = reviews.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div style={{ padding: '2rem' }}>
      
      <h2>Review List</h2>
      <div className="d-flex justify-content-between align-items-center mb-4">
        
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Search by author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {currentReviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <ul className="list-group">
          {currentReviews.map((review) => (
            <li
              key={review.id}
              className="list-group-item mb-3"
              style={{ borderRadius: '10px', cursor: 'pointer' }}
              onClick={() => setExpandedCard(expandedCard === review.id ? null : review.id)}
            >
              <p><strong>Author:</strong> {review.author}</p>
              <p><strong>Phone:</strong> {review.phone}</p>
              {expandedCard === review.id && (
                <div>
                  <p><strong>Body:</strong> {review.body || 'N/A'}</p>
                  <p><strong>Seller:</strong> {review.seller}</p>
                  <p><strong>Price:</strong> {review.price ? `$${review.price}` : 'N/A'}</p>
                  <p><strong>Rating:</strong> {review.rate}/5</p>
                  <p><strong>Created:</strong> {new Date(review.created_at).toLocaleString()}</p>
                  <p><strong>Updated:</strong> {new Date(review.updated_at).toLocaleString()}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="d-flex justify-content-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => navigate(`?page=${page - 1}`)}
          className="btn btn-outline-primary"
        >Previous</button>

        <span className="align-self-center">Page {page} of {totalPages}</span>

        <button
          disabled={page === totalPages}
          onClick={() => navigate(`?page=${page + 1}`)}
          className="btn btn-outline-primary"
        >Next</button>
      </div>

      <div className="mt-4">
        <button className="btn btn-danger me-2" onClick={() => handleExport('csv')}>Export to CSV</button>
        <button onClick={() => navigate('/review-list-vertical')} style={buttonStyle}>Review List Vertical</button>
        <button className="btn btn-danger" onClick={() => handleExport('pdf')}>Export to PDF</button>
      </div>
      <div>
          <button className="btn btn-secondary me-2" onClick={goBack}>⬅️ Back</button>
          <button onClick={() => navigate('/review-mobiles')} style={buttonStyle}>Review Mobiles</button>
          <button onClick={() => navigate('/')} style={{ ...buttonStyle, backgroundColor: 'crimson' }}>Logout</button>
          <button className="btn btn-secondary" onClick={goForward}>➡️ Forward</button>
        </div> 
     
      <ScrollToTopButton />
      <ToastContainer />
      <FaArrowUp />
    </div>
  );
}

export default ReviewList;
