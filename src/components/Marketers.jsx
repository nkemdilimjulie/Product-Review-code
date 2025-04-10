import React, { useState, useEffect } from 'react';

function Marketers() {
  const [phones, setPhones] = useState([]); // State to store the list of available phones
  const [selectedPhone, setSelectedPhone] = useState(''); // State to store selected phone (ID)
  const [company, setCompany] = useState('');
  const [link, setLink] = useState('');

  // Fetch the available phones from the API
  useEffect(() => {
    console.log(localStorage.getItem('jwt_token'))
    fetch('http://127.0.0.1:8080/api/mobiles/', {  // Ensure this URL is correct
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('jwt_token')}`  // Ensure the token is sent
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('mydata', data); // Check the structure of the response
        if (Array.isArray(data)) {
          setPhones(data);  // Make sure the response is an array
        } else {
          console.error("Received data is not an array", data);
        }
      })
      .catch((error) => console.error("Error fetching phones:", error));
  }, []);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      phone: selectedPhone, // The selected phone's ean (ID)
      company,
      link,
    };
    console.log('formData', formData)
    // Now submit the form data to your API endpoint for Marketer
    fetch('http://127.0.0.1:8080/api/marketers/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('jwt_token')}`, // Assuming you're using DRF token authentication
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data (e.g., show success message or reset form)
        console.log('Marketer submitted:', data);
      })
      .catch((error) => console.error('Error submitting marketer:', error));
  };

  return (
    <div>
      <h1>Submit Marketer Info</h1>
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
          <label>Phone:</label>
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

        <button type="submit">Submit Marketer</button>
      </form>
    </div>
  );
}

export default Marketers;
