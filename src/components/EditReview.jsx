import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmModal from './ConfirmModal'; // adjust the path if needed


function EditReview() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState({});


  const { reviewId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt_token');

  const [reviewData, setReviewData] = useState({
    author: '',
    phone: '',
    body: '',
    seller: '',
    price: '',
    rate: 1,
  });

  const [phones, setPhones] = useState([]);

  useEffect(() => {
    // Fetch phone options
    fetch('http://127.0.0.1:8080/api/mobiles/', {
      headers: { Authorization: `Token ${token}` }
    })
      .then(res => res.json())
      .then(data => setPhones(data))
      .catch(err => console.error('Error fetching phones', err));

    // Fetch review data
    fetch(`http://127.0.0.1:8080/api/reviews/${reviewId}/`, {
      headers: { Authorization: `Token ${token}` }
    })
      .then(res => res.json())
      .then(data => setReviewData({
        author: data.author,
        phone: data.phone,
        body: data.body,
        seller: data.seller,
        price: data.price,
        rate: data.rate,
      }))
      .catch(err => console.error('Error fetching review', err));
  }, [reviewId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData(prev => ({ ...prev, [name]: value }));
  };

  // const handleUpdate = () => {
  //   fetch(`http://127.0.0.1:8080/api/reviews/${reviewId}/`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Token ${token}`
  //     },
  //     body: JSON.stringify(reviewData)
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         toast.success('Review updated successfully!');
  //       } else {
  //         toast.error('Update failed!');
  //       }
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ phone, body, rate, seller, price, author });
    setShowModal(true);
  };
  
  const handleConfirmSubmit = () => {
    fetch(`http://127.0.0.1:8080/api/reviews/${reviewId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('jwt_token')}`
      },
      body: JSON.stringify(formData)
    })
      .then(async (res) => {
        const data = await res.json();
  
        if (!res.ok) {
          toast.error('Update Failed');
          alert(`Error: ${JSON.stringify(data)}`);
          throw new Error('Update failed');
        }
  
        toast.success('Review Updated');
        setShowModal(false);
        navigate('/review-list');
      })
      .catch(err => {
        console.error(err);
        setShowModal(false);
      });
  };
  
  
  // const handleDelete = () => {
  //   fetch(`http://127.0.0.1:8080/api/reviews/${reviewId}/`, {
  //     method: 'DELETE',
  //     headers: { Authorization: `Token ${token}` }
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         toast.success('Review deleted!');
  //         navigate('/review-list');
  //       } else {
  //         toast.error('Deletion failed!');
  //       }
  //     });
  // };

  const handleSubmitAgain = () => {
    toast.info('Submitted again!');
  };


  const handleDeleteClick = () => {
    setDeleteData({ phone, body, rate, seller, price, author, action: 'Deletion' });
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    fetch(`http://127.0.0.1:8080/api/reviews/${reviewId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${localStorage.getItem('jwt_token')}`
      }
    })
      .then(res => {
        if (res.status === 204) {
          toast.success('Review Deleted');
          navigate('/review-list');
        } else {
          toast.error('Deletion Failed');
        }
      })
      .catch(err => {
        console.error('Delete Error:', err);
        toast.error('Error deleting');
      })
      .finally(() => {
        setShowDeleteModal(false);
      });
  };
  

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '12px' }}>
      <h2>Confirm or Edit Review</h2>

      <div>
        <label>Phone:</label>
        <select name="phone" value={reviewData.phone} onChange={handleChange}>
          <option value="">-- Select Phone --</option>
          {phones.map(phone => (
            <option key={phone.ean} value={phone.ean}>
              {phone.brand} {phone.model}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Body:</label>
        <textarea name="body" value={reviewData.body || ''} onChange={handleChange} />
      </div>

      <div>
        <label>Seller:</label>
        <input name="seller" value={reviewData.seller || ''} onChange={handleChange} />
      </div>

      <div>
        <label>Price:</label>
        <input name="price" type="number" value={reviewData.price || ''} onChange={handleChange} />
      </div>

      <div>
        <label>Rate:</label>
        <select name="rate" value={reviewData.rate} onChange={handleChange}>
          {[1, 2, 3, 4, 5].map(i => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleConfirmSubmit} style={{ marginRight: '10px' }}>Update</button>
        <button onClick={handleConfirmDelete} style={{ marginRight: '10px', background: 'crimson', color: 'white' }}>Delete</button>
        <button onClick={handleSubmitAgain} style={{ marginRight: '10px', background: 'green', color: 'white' }}>Submit</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <ConfirmModal
        show={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleConfirmSubmit}
        data={formData}
      />

      <ConfirmModal
        show={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        data={deleteData}
      />

    </div>
  );
}

export default EditReview;
