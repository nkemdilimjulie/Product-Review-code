

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmModal from './ConfirmModal'; 
import ScrollToTopButton from './ScrollToTopButton';

function Marketers() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  const [phones, setPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState('');
  const [company, setCompany] = useState('');
  const [link, setLink] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/mobiles/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('jwt_token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPhones(data);
        } else {
          toast.error('Failed to load phones');
        }
      })
      .catch(() => toast.error('Error fetching phones'));
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const formData = {
  //     phone: selectedPhone,
  //     company,
  //     link
  //   };

  //   fetch('http://127.0.0.1:8080/api/marketers/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Token ${localStorage.getItem('jwt_token')}`
  //     },
  //     body: JSON.stringify(formData)
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         return response.json().then(data => {
  //           throw new Error(data.detail || data.link || "Submission error");
  //         });
  //       }
  //       return response.json();
  //     })
  //     .then(() => {
  //       toast.success('Market Successfully Submitted!');
  //       setCompany('');
  //       setLink('');
  //       setSelectedPhone('');
  //     })
  //     .catch(error => toast.error(error.message));
  // };

    const handleSubmit = (e) => {
    e.preventDefault();
    const data = { phone, company, link, author };
    setFormData(data);
    setShowModal(true);  // show the confirmation modal
  };
  
  const handleConfirmSubmit = () => {
    fetch('http://127.0.0.1:8080/api/marketers/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('jwt_token')}`
      },
      body: JSON.stringify(formData)
    })
    .then(async (res) => {
      const data = await res.json();
  
      if (!res.ok) {
        toast.error('Submission Failed');
        alert(`Failed: ${JSON.stringify(data)}`);
        throw new Error('Submission failed');
      }
  
      toast.success('Marketer Successfully Submitted');
      setPhone('');
      setCompany('');
      setLink('');
      setShowModal(false);
    })
    .catch((err) => {
      console.error('Error submitting marketer:', err);
      setShowModal(false);
    });
  };
  

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Marketers</h1>
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
          <button className="btn btn-secondary me-2" onClick={goBack}>⬅️ Back</button>
          <button type="submit" style={styles.primaryButton}>Submit Market</button>
          <button type="button" onClick={() => navigate('/marketers-list')} style={styles.secondaryButton}>MarketersList</button>
          {/* <button type="button" onClick={() => navigate('/confirm-edit-marketer')} style={styles.secondaryButton}>ConfirmOrEditMarket</button> */}
          <button type="button" onClick={() => navigate('/')} style={styles.logoutButton}>Logout</button>
          <button className="btn btn-secondary" onClick={goForward}>➡️ Forward</button>
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
    maxWidth: '600px',
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
    justifyContent: 'space-between'
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
