import React, { useState } from 'react';
import { API_BASE_URL } from '../configurations/config';  // Ensure your API base URL is stored in config.js
import '../static/Footer.css';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        setSuccessMessage('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
        setErrorMessage('');
      } else {
        setErrorMessage('There was an issue submitting your message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setErrorMessage('Failed to connect to server. Please try again later.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>Categories</h4>
        <ul>
          <li>Catering</li>
          <li>DJ</li>
          <li>Makeup</li>
          <li>Venue</li>
        </ul>
      </div>
      
      <div className="footer-section">
        <h4>Contact us</h4>
        <ul>
        <li>9999999999</li>
        <li>Address:<br/>XY Complex</li>
        </ul>
      </div>
      
      <div className="footer-section">
        <h4>Quick Reach</h4>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit →</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
      <div className="footer-section">
        <p>© 2024 PlanSmart Event Planners. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
