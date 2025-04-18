
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmModal from './ConfirmModal';
import ScrollToTopButton from './ScrollToTopButton';
import { API_DOMAIN } from '../../configdomain';


const styleSheet = document.styleSheets[0];
const fadeIn = `
  @keyframes fadeIn {
    from { opacity: 0 }
    to { opacity: 1 }
  }
`;

const scaleIn = `
  @keyframes scaleIn {
    from { transform: scale(0.9); opacity: 0 }
    to { transform: scale(1); opacity: 1 }
  }
`;

styleSheet.insertRule(fadeIn, styleSheet.cssRules.length);
styleSheet.insertRule(scaleIn, styleSheet.cssRules.length);


function ReviewMobiles() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const [phones, setPhones] = useState([]);
  const [phone, setPhone] = useState('');
  const [body, setBody] = useState('');
  const [rate, setRate] = useState(1);
  const [seller, setSeller] = useState('');
  const [price, setPrice] = useState('');
  const [author, setAuthor] = useState(localStorage.getItem('username') || '');


  const goBack = () => {
    navigate(-1);  // Go back to last page
  };
  
  const goForward = () => {
    navigate(1);   // Go forward to next page
  };

  useEffect(() => {
    fetch(`${API_DOMAIN}/api/mobiles/`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('jwt_token')}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log("Fetched phones:", data);
        setPhones(data);
      })
      .catch(err => console.error('Error fetching phones:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  const data = { phone, body, rate, seller, price, author };
    setFormData(data);
    setShowModal(true);
  };
  
  const handleConfirmSubmit = () => {
    fetch(`${API_DOMAIN}/api/reviews/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('jwt_token')}`
      },
      body: JSON.stringify(formData)
    })
    .then(async res => {
      const responseData = await res.json();
      if (!res.ok) {
        toast.error('Submission Failed');
        alert(JSON.stringify(responseData));
        return;
      }
      toast.success('Review is Successfully Submitted');
      setPhone(''); setBody(''); setRate(1); setSeller(''); setPrice('');
    })
    .catch(err => console.error(err))
    .finally(() => setShowModal(false));
  };
  
  
  // const confirmSubmission = () => {
  //   const formData = { phone, body, rate, seller, price, author };
  
  //   fetch(`${API_DOMAIN}/api/reviews/`, { 
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Token ${localStorage.getItem('jwt_token')}`
  //     },
  //     body: JSON.stringify(formData)
  //   })
  //     .then(async (res) => {
  //       const responseData = await res.json();
  
  //       if (!res.ok) {
  //         toast.error('Submission Failed');
  //         console.error('Error:', responseData);
  //         setShowConfirm(false);
  //         return;
  //       }
  
  //       toast.success('Review is Successfully Submitted');
  //       setPhone('');
  //       setBody('');
  //       setRate(1);
  //       setSeller('');
  //       setPrice('');
  //       setShowConfirm(false);
  //     })
  //     .catch(err => {
  //       toast.error('Error submitting review');
  //       console.error(err);
  //     });
  // };
  

  const buttonStyle = {
    margin: '8px',
    padding: '10px 20px',
    borderRadius: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  };

  const cardStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#fff'
  };

  const labelStyle = {
    display: 'block',
    margin: '10px 0 5px',
    fontWeight: 'bold'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc'
  };

 
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease-in-out'
  };
  
  const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '15px',
    maxWidth: '500px',
    width: '90%',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    textAlign: 'left',
    animation: 'scaleIn 0.3s ease-in-out'
  };
  

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ textAlign: 'center' }}>Review Mobiles</h2>
      <p style={{ textAlign: 'center' }}>A user is allowed to review a specific mobile phone ONCE</p>
      <p style={{ textAlign: 'center' }}>Moreover, check your review again before submission. You have no permission for updates</p>

      <div style={cardStyle}>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={labelStyle}>Select Phone:</label>
            <select value={phone} onChange={(e) => setPhone(e.target.value)} required style={inputStyle}>
              <option value="">-- Select Phone --</option>
              {phones.map((p) => (
                <option key={p.ean} value={p.ean}>{p.brand} {p.model}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Review:</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} rows="4" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Rate (1–5):</label>
            <select value={rate} onChange={(e) => setRate(Number(e.target.value))} style={inputStyle}>
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Seller:</label>
            <input type="text" value={seller} onChange={(e) => setSeller(e.target.value)} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Author:</label>
            <input type="text" value={author} disabled style={inputStyle} />
          </div>

          <button type="submit" style={{ ...buttonStyle, backgroundColor: 'green' }}>
            Submit Review
          </button>
        </form>

        <ConfirmModal
          show={showModal}
          onCancel={() => setShowModal(false)}
          onConfirm={handleConfirmSubmit}
          data={formData}
        />


        {showConfirm && (
          <div style={{ marginTop: '30px', textAlign: 'center', background: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
            <h3>Confirm Your Review</h3>
            <p><strong>Phone:</strong> {phones.find(p => p.ean === phone)?.brand} {phones.find(p => p.ean === phone)?.model}</p>
            <p><strong>Review:</strong> {body}</p>
            <p><strong>Rate:</strong> {rate}</p>
            <p><strong>Seller:</strong> {seller}</p>
            <p><strong>Price:</strong> ${price}</p>
            <p><strong>Author:</strong> {author}</p>

            <button onClick={confirmSubmission} style={{ ...buttonStyle, backgroundColor: 'green' }}>Confirm & Submit</button>
            <button onClick={() => setShowConfirm(false)} style={{ ...buttonStyle, backgroundColor: 'gray' }}>Edit</button>
          </div>
        )}


      </div>

      {/* Navigation Buttons */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button className="btn btn-secondary me-2" onClick={goBack}>⬅️ Back</button>
        <button onClick={() => navigate('/edit-myreviews')} style={buttonStyle}>Edit My Reviews</button>
        <button onClick={() => navigate('/review-list')} style={buttonStyle}>📋Review List</button>
        <button onClick={() => navigate('/marketers-list')} style={buttonStyle}>Market List</button>
        <button onClick={() => navigate('/')} style={{ ...buttonStyle, backgroundColor: 'crimson' }}>Logout</button>
        <button className="btn btn-secondary" onClick={goForward}>➡️ Forward</button>
      </div>

      {showConfirm && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3>Confirm Your Review</h3>
            <p><strong>Phone:</strong> {phones.find(p => p.ean === phone)?.brand} {phones.find(p => p.ean === phone)?.model}</p>
            <p><strong>Review:</strong> {body}</p>
            <p><strong>Rate:</strong> {rate}</p>
            <p><strong>Seller:</strong> {seller}</p>
            <p><strong>Price:</strong> ${price}</p>
            <p><strong>Author:</strong> {author}</p>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button onClick={confirmSubmission} style={{ ...buttonStyle, backgroundColor: 'green', marginRight: '10px' }}>
                Confirm & Submit
              </button>
              <button onClick={() => setShowConfirm(false)} style={{ ...buttonStyle, backgroundColor: 'gray' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ScrollToTopButton />
      <ToastContainer />
    </div>
  );
}

export default ReviewMobiles;
