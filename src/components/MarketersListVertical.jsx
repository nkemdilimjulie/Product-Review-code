
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTopButton from './ScrollToTopButton';
import { FaArrowUp } from 'react-icons/fa';
import { API_DOMAIN } from '../../configdomain';

function MarketerList() {
  const [marketers, setmarketers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const marketersPerPage = 3;

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);  // Go back to last page
  };
  
  const goForward = () => {
    navigate(1);   // Go forward to next page
  };

  useEffect(() => {
    fetch(`${API_DOMAIN}/api/marketers/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('jwt_token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setmarketers(data);
        } else {
          console.error("Expected an array of marketers, got:", data);
        }
      })
      .catch((err) => console.error('Error fetching marketers:', err));
  }, []);

  // Filter marketers by search term
  const filteredmarketers = marketers.filter((marketer) =>
    marketer.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    marketer.author?.toLowerCase().includes(searchTerm.toLowerCase()) 
    
  );

  // Pagination logic
  const indexOfLastmarketer = currentPage * marketersPerPage;
  const indexOfFirstmarketer = indexOfLastmarketer - marketersPerPage;
  const currentmarketers = filteredmarketers.slice(indexOfFirstmarketer, indexOfLastmarketer);
  const totalPages = Math.ceil(filteredmarketers.length / marketersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container py-4">
      {/* Top Nav Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Marketers Structured List</h2>
        <div>
          <button className="btn btn-primary me-2" onClick={() => navigate('/marketers')}>Marketers</button>
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

      {/* marketer List */}
      {currentmarketers.length === 0 ? (
        <p className="text-muted text-center">No marketers found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {currentmarketers.map((marketer) => (
            <div className="col" key={marketer.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{marketer.phone}</h5>
                  <p><strong>Author:</strong> {marketer.author}</p>
                  <p><strong>Company:</strong> {marketer.company}</p>                  
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
                  {idx + 1}Marketer
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

export default MarketerList;

