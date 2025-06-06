import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmModal from './ConfirmModal';
import ScrollToTopButton from './ScrollToTopButton';
import { API_DOMAIN } from '../../configdomain';

function Marketers() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [phones, setPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState('');
  const [company, setCompany] = useState('');
  const [link, setLink] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

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
      console.log('Submit clicked!'); 
    // const data = { phone, body, rate, seller, price, author };
     
    
    
    const data = {
      phone: selectedPhone,
      company,
      link,
    };

    setFormData(data);
    setShowModal(true);
  };

  const handleConfirmSubmit = () => {
    fetch(`${API_DOMAIN}/api/marketers/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(formData)
    })
      .then(async (res) => {
        const data = await res.json();
        console.log('Server response:', data); // 

        if (!res.ok) {
          const errorMsg = data.detail || data.link || Object.values(data).join(', ') || 'Submission failed';
          toast.error(errorMsg);
          setShowModal(false);
          return;
        }

        toast.success('Marketer Successfully Submitted');
        setSelectedPhone('');
        setCompany('');
        setLink('');
        setShowModal(false);
      })
      .catch((err) => {
        console.error('Error submitting marketer:', err);
        toast.error('Error submitting marketer');
        setShowModal(false);
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Marketers</h1>
      {/* <p>A marketer should not market one phone twice. Never use an already submitted link</p> */}
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        A marketer should not market one phone twice. Never use an already submitted link.
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>


      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label>Company:</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label>Select Phone:</label>
          <select
            value={selectedPhone}
            onChange={(e) => setSelectedPhone(e.target.value)}
            required
            style={styles.input}
          >
            <option value="">-- Select Phone --</option>
            {phones.map(phone => (
              <option key={phone.ean} value={phone.ean}>
                {phone.brand} {phone.model}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.field}>
          <label>Link:</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.buttonRow}>
          <button className="btn btn-secondary me-2" type="button" onClick={() => navigate(-1)}>⬅️ Back</button>
          <button type="submit" style={styles.primaryButton}>Submit Market</button>
          <button type="button" onClick={() => navigate('/marketers-list')} style={styles.secondaryButton}>Marketers List</button>
          <button type="button" onClick={() => navigate('/')} style={styles.logoutButton}>Logout</button>
          <button className="btn btn-secondary" type="button" onClick={() => navigate(1)}>➡️ Forward</button>
        </div>
      </form>

      <ScrollToTopButton />
      <ToastContainer />

      <ConfirmModal
        show={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleConfirmSubmit}
        data={formData}
      />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '30px auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  field: {
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px'
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '10px'
  },
  primaryButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  secondaryButton: {
    padding: '10px 20px',
    backgroundColor: '#008CBA',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default Marketers;
