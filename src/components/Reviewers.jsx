
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Reviewers() {
  const [phones, setPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState('');
  const [body, setBody] = useState('');
  const [created_at, setCreated_at] = useState('');
  const [updated_at, setUpdated_at] = useState('');
  const [rate, setRate] = useState('');
  const [seller, setSeller] = useState('');
  const [price, setPrice] = useState('');
  
//   const [selectedRate, setSelectedRate] = useState('');

  const navigate = useNavigate();

  // Fetch available phones
  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/mobiles/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('jwt_token')}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('403 Forbidden');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setPhones(data);
        } else {
          toast.error("⚠️ Unexpected response structure.");
        }
      })
      .catch((error) => {
        console.error("Error fetching phones:", error);
        toast.error("❌ Failed to fetch phones.");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      phone: selectedPhone,
      body,
      created_at,
      updated_at,
      rate: selectedRate,
      seller,
      price,
      
    };

    fetch('http://127.0.0.1:8080/api/reviewers/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('jwt_token')}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Submission failed');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Reviewer submitted:', data);
        toast.success('✅ Reviewer data submitted successfully!');
        // Reset form
        setBody('');
        setCreated_at('');
        setUpdated_at('');
        setSeller('');
        setPrice('');
        setrate('');
        setSelectedPhone('');
      })
      .catch((error) => {
        console.error('Error submitting reviewer:', error);
        toast.error('❌ Failed to submit reviewer data.');
      });
  };

  const handleLogout = () => {
    // localStorage.removeItem('jwt_token');
    navigate('/');
  };

  return (
    <div>
      <h1>Reviewers</h1>

      <ToastContainer position="top-center" />

      <div style={{ marginBottom: '1rem' }}>
      <button onClick={() => navigate('/review-list')} style={{ marginRight: '10px' }}>
          📄 Phone Review List
        </button>
        <button onClick={() => navigate('/marketers-list')} style={{ marginRight: '10px' }}>
          📄 Marketers List
        </button>
        <button onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Phone:</label>
          <select
            value={selectedPhone}
            onChange={(e) => setSelectedPhone(e.target.value)}
            required
          >
            <option value="">-- Select Phone --</option>
            {phones.map((phone) => (
              <option key={phone.ean} value={phone.ean}>
                {phone.brand} {phone.model}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Body:</label>
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Created_at:</label>
          <input
            type="datetime"
            value={created_at}
            onChange={(e) => setCreated_at(e.target.value)}
            required
          />
        </div>


        <div>
          <label>Updated_at:</label>
          <input
            type="datetime"
            value={updated_at}
            onChange={(e) => setUpdated_at(e.target.value)}
            required
          />
        </div>


        <div>
          <label>Rate:</label>
          <input
            type="integer"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
          />
        </div>


        <div>
          <label>Seller:</label>
          <input
            type="char"
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="positiveinteger"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>    

        
        <button type="submit">🚀 Submit Reviewer</button>
      </form>
    </div>
  );
}

export default Reviewers;
