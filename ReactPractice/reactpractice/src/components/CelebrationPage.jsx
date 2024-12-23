/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import '../static/CelebrationPage.css';
import { UserContext } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';

const CelebrationPage = () => {
  const { user } = useContext(UserContext); 
  const navigate = useNavigate();
  const themeName="festive-vibrant"

  const handleServiceIconClick = (url) => {
    window.location.href = url;
  };

  // Check if user is logged in and if `order_address` exists in localStorage
  useEffect(() => {
    if (user && !localStorage.getItem('order_address')) {
      const confirmed = window.confirm("Please Give Your Order Address");
      if (confirmed) {
        navigate('/editaddress'); // Redirect to EditAddress page
      }
    }
  }, [user, navigate]);

  return (
    <div className={`wrapper ${themeName}`}>
      <main className="main">
        <section className="hero-section">
          <h1>Bringing Celebrations to Your Life</h1>
          <p>Discover our services to make your events unforgettable.</p>
        </section>

        <section className="services-section">
          <div className="service-box" onClick={() => handleServiceIconClick('/individual')}>
            <img
              className="service-icon"
              src="/Individual.png"
              alt="Individual Services"
            />
            <h3>Individual Services</h3>
          </div>
          <div className="service-box" onClick={() => handleServiceIconClick('/eventselection')}>
            <img
              className="service-icon"
              src="/Combo.jpeg"
              alt="Combo Services"
            />
            <h3>Combo Packs</h3>
          </div>
          {/* <div className="service-box" onClick={() => handleServiceIconClick('/recommendation')}>
            <img
              className="service-icon"
              src="/question.svg"
              alt="Help me to choose"
            />
            <h3>Not sure what to choose?</h3>
            <button className="service-button help-button">Help me to choose!</button>
          </div> */}
        </section>
        {/* <footer className="footer">
        <p>© 2024 PlanSmart Event Planners. All rights reserved.</p>
      </footer> */}
      </main>
           
      

    </div>
    
  );
};

export default CelebrationPage;
