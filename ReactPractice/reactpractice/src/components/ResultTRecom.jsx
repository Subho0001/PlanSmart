import React from 'react';
import './ResultTRecom.css';
import Navbar from './Navbar';
import Footer from './Footer';

const ResultTRecom = () => {
  const handleBookNow = () => {
    // Implement logic for booking the venue
    console.log('Booking the venue');
  };

  const handleBack = () => {
    // Implement logic to go back to the previous page
    console.log('Going back');
  };

  return (
    <div className="venue-details-container">
      <Navbar />
      <div className="content-wrapper">
        <div className="venue-info">
          <div className="venue-image-container">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Global Palace & Inn"
              className="venue-image"
            />
            <button className="btn btn-primary" onClick={handleBookNow}>
              Book Now
            </button>
          </div>
          <div className="venue-details-container">
            <h1 className="venue-name">GLOBAL PALACE & INN</h1>
            <div className="venue-details-item">
              <strong>CAPACITY & LAYOUT:</strong>
              <p>
                Capacity: Up to 500 guests. Layouts available for Weddings, Conferences, Parties, and more.
              </p>
            </div>
            <div className="venue-details-item">
              <strong>AMENITIES & FACILITIES:</strong>
              <p>
                Onsite catering, full-service bar, state-of-the-art audio/visual equipment, and more.
              </p>
            </div>
            <div className="venue-details-item">
              <strong>EVENT TYPE:</strong>
              <p>Marriage</p>
            </div>
            <button className="btn btn-secondary" onClick={handleBack}>
              Back
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResultTRecom;