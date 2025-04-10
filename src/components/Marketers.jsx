
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Marketers() {
  const [phones, setPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState('');
  const [company, setCompany] = useState('');
  const [link, setLink] = useState('');

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
      company,
      link,
    };

    fetch('http://127.0.0.1:8080/api/marketers/', {
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
        console.log('Marketer submitted:', data);
        toast.success('✅ Marketer data submitted successfully!');
        // Reset form
        setCompany('');
        setLink('');
        setSelectedPhone('');
      })
      .catch((error) => {
        console.error('Error submitting marketer:', error);
        toast.error('❌ Failed to submit marketer data.');
      });
  };

  const handleLogout = () => {
    // localStorage.removeItem('jwt_token');
    navigate('/');
  };

  return (
    <div>
      <h1>Marketers</h1>

      <ToastContainer position="top-center" />

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => navigate('/marketers-list')} style={{ marginRight: '10px' }}>
          📄 Marketers List
        </button>
        <button onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Company:</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>

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
          <label>Link:</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>

        <button type="submit">🚀 Submit Marketer</button>
      </form>
    </div>
  );
}

export default Marketers;
