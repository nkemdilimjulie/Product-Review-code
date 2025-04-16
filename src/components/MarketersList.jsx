
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTopButton from './ScrollToTopButton';
import { FaArrowUp } from 'react-icons/fa';

function MarketersList() {
  const [marketers, setMarketers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/marketers/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('jwt_token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMarketers(data);
        } else {
          console.error("Expected an array of marketers, got:", data);
        }
      })
      .catch((err) => console.error('Error fetching marketers:', err));
  }, []);

  const buttonStyle = {
    margin: '8px',
    padding: '10px 20px',
    borderRadius: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>All Marketers</h2>
      {marketers.length === 0 ? (
        <p>No marketers found.</p>
      ) : (
        <ul>
          {marketers.map((marketer) => (
            <li key={marketer.id} style={{ marginBottom: '1.5rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
              <p><strong>Author:</strong> {marketer.author}</p>
              <p><strong>Phone:</strong> {marketer.phone}</p>
              <p><strong>Company:</strong> {marketer.company}</p>
              <p><strong>Link:</strong> <a href={marketer.link} target="_blank" rel="noopener noreferrer">{marketer.link}</a></p>
              <p><strong>Created:</strong> {new Date(marketer.created_at).toLocaleString()}</p>
              <p><strong>Updated:</strong> {new Date(marketer.updated_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/review-mobiles')} style={buttonStyle}>Review Mobiles</button>
        <button onClick={() => navigate('/')} style={{ ...buttonStyle, backgroundColor: 'crimson' }}>Logout</button>
      </div>
      
      <ScrollToTopButton />
      <ToastContainer />
      <FaArrowUp />
    </div>
  );
}

export default MarketersList;
