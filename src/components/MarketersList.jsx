
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ScrollToTopButton from './ScrollToTopButton';
// import { FaArrowUp } from 'react-icons/fa';
// import { API_DOMAIN } from '../configdomain';

// function MarketersList() {
//   const [marketers, setMarketers] = useState([]);
//   const navigate = useNavigate();


//   const goBack = () => {
//     navigate(-1);  // Go back to last page
//   };
  
//   const goForward = () => {
//     navigate(1);   // Go forward to next page
//   };


  

//   useEffect(() => {
//     fetch(`${API_DOMAIN}/api/marketers/`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Token ${localStorage.getItem('jwt_token')}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data.results)) {
//           setMarketers(data.results);
//         } else {
//           console.error("Expected an array of marketers, got:", data);
//         }
//       })
//       .catch((err) => console.error('Error fetching marketers:', err));
//   }, []);

//   const buttonStyle = {
//     margin: '8px',
//     padding: '10px 20px',
//     borderRadius: '10px',
//     backgroundColor: '#007bff',
//     color: 'white',
//     border: 'none',
//     cursor: 'pointer',
//   };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Marketers List</h2>
//       {marketers.length === 0 ? (
//         <p>No marketers found.</p>
//       ) : (
//         <ul>
//           {marketers.map((marketer) => (
//             <li key={marketer.id} style={{ marginBottom: '1.5rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
//               <p><strong>Author:</strong> {marketer.author}</p>
//               <p><strong>Phone:</strong> {marketer.phone}</p>
//               <p><strong>Company:</strong> {marketer.company}</p>
//               <p><strong>Link:</strong> <a href={marketer.link} target="_blank" rel="noopener noreferrer">{marketer.link}</a></p>
//               <p><strong>Created:</strong> {new Date(marketer.created_at).toLocaleString()}</p>
//               <p><strong>Updated:</strong> {new Date(marketer.updated_at).toLocaleString()}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//       <div style={{ marginTop: '20px' }}>
//       <button className="btn btn-secondary me-2" onClick={goBack}>⬅️ Back</button>
//         <button onClick={() => navigate('/review-mobiles')} style={buttonStyle}>Review Mobiles</button>
//         <button onClick={() => navigate('/')} style={{ ...buttonStyle, backgroundColor: 'crimson' }}>Logout</button>
//         <button className="btn btn-secondary" onClick={goForward}>➡️ Forward</button>
//       </div>
      
//       <ScrollToTopButton />
//       <ToastContainer />
//       <FaArrowUp />
//     </div>
//   );
// }

// export default MarketersList;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTopButton from './ScrollToTopButton';
import { FaArrowUp } from 'react-icons/fa';
import { API_DOMAIN } from '../../configdomain';

function MarketersList() {
  const [marketers, setMarketers] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(`${API_DOMAIN}/api/marketers/`);

  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  const goForward = () => navigate(1);

  useEffect(() => {
    fetch(currentUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('jwt_token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.results)) {
          setMarketers(data.results);
          setNextPage(data.next);
          setPrevPage(data.previous);
        } else {
          console.error('Expected an array of marketers, got:', data);
        }
      })
      .catch((err) => console.error('Error fetching marketers:', err));
  }, [currentUrl]);

  const handlePagination = (url) => {
    if (url) setCurrentUrl(url);
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

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Marketers List</h2>
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
        {prevPage && <button onClick={() => handlePagination(prevPage)} style={buttonStyle}>⬅️ Prev</button>}
        {nextPage && <button onClick={() => handlePagination(nextPage)} style={buttonStyle}>Next ➡️</button>}
      </div>

      <div style={{ marginTop: '20px' }}>
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

export default MarketersList;
