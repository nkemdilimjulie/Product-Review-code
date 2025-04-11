import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ReviewMobiles() {
  const navigate = useNavigate();
  const [phones, setPhones] = useState([]);
  const [phone, setPhone] = useState('');
  const [body, setBody] = useState('');
  const [rate, setRate] = useState(1);
  const [seller, setSeller] = useState('');
  const [price, setPrice] = useState('');
  const [author, setAuthor] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/mobiles/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('jwt_token')}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setPhones(data);
      })
      .catch(err => console.error('Error fetching phones:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { phone, body, rate, seller, price, author };

    fetch('http://127.0.0.1:8080/api/reviews/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('jwt_token')}`
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Submission failed');
        return res.json();
      })
      .then(() => {
        toast.success('Review Successfully Submitted');
        setPhone('');
        setBody('');
        setRate(1);
        setSeller('');
        setPrice('');
      })
      .catch(err => {
        console.error(err);
        toast.error('Submission Failed');
      });
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
    <div style={{ padding: '30px' }}>
      <h2>Review Mobiles</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Phone:</label>
          <select value={phone} onChange={(e) => setPhone(e.target.value)} required>
            <option value="">-- Select Phone --</option>
            {phones.map((p) => (
              <option key={p.ean} value={p.ean}>{p.brand} {p.model}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Review:</label><br />
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows="4" cols="50" />
        </div>

        <div>
          <label>Rate (1–5):</label>
          <select value={rate} onChange={(e) => setRate(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Seller:</label>
          <input type="text" value={seller} onChange={(e) => setSeller(e.target.value)} />
        </div>

        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div>
          <label>Author:</label>
          <input type="text" value={author} disabled />
        </div>

        <button type="submit" style={{ ...buttonStyle, backgroundColor: 'green' }}>
          Submit Review
        </button>
      </form>

      {/* Navigation Buttons */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/reviewlist')} style={buttonStyle}>ReviewList</button>
        <button onClick={() => navigate('/marketerslist')} style={buttonStyle}>MarketList</button>
        <button onClick={() => navigate('/reviewmobiles')} style={buttonStyle}>ReviewMore</button>
        <button onClick={() => navigate('/')} style={{ ...buttonStyle, backgroundColor: 'crimson' }}>Logout</button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default ReviewMobiles;
