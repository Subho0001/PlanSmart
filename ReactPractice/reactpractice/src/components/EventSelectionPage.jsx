/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import EventCategories from './EventCategories';
import '../static/EventSelectionPage.css';
import { useNavigate } from 'react-router-dom';

const EventSelectionPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate=useNavigate()
  
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    // Handle back navigation
    console.log('Going back');
    window.history.back();

  };

  const handleNext = () => {
    if (selectedCategory) {
      // Handle next step with selectedCategory

      console.log('Moving to next step with:', selectedCategory);
      navigate('/multipleselect')
    }
  };

  return (
    <div className="event-selection-container">
    
      <div className="main-content">
       
        <div className="selection-area">
        <h2 className="selection-title">
  What you want to celebrate?
  <style>
    {`
      .selection-title {
        color: #8b6914; /* Elegant gold shade for the title */
        font-size: 24px;
        margin-bottom: 32px;
      }
    `}
  </style>
</h2>

          <EventCategories 
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
          <div className="navigation-buttons">
  <style>
    {`
      /* Back and Next Buttons */
      .back-button,
      .next-button {
        padding: 12px 32px;
        border-radius: 8px; /* Rounded edges for elegance */
        font-weight: bold;
        font-size: 16px;
        transition: all 0.3s ease;
      }

      /* Back Button */
      .back-button {
        background-color: #e0e0e0; /* Light grey background for the back button */
        color: #333; /* Dark color for text */
        border: 2px solid #e0e0e0; /* Subtle border to match the theme */
      }

      .back-button:hover {
        background-color: #d0d0d0; /* Slightly darker grey on hover */
        border-color: #8b6914; /* Gold border on hover */
      }

      .back-button:disabled {
        background-color: #c0c0c0; /* Disabled button grey */
        cursor: not-allowed;
      }

      /* Next Button */
      .next-button {
        background-color: #8b6914; /* Elegant gold background for next button */
        color: white;
        border: 2px solid #8b6914; /* Matching gold border */
      }

      .next-button:hover:not(.disabled) {
        background-color: #f0e68c; /* Light gold on hover */
        border-color: #f0e68c; /* Lighter gold border on hover */
        transform: scale(1.05); /* Slightly enlarge on hover */
      }

      .next-button.disabled {
        background-color: #c0c0c0; /* Grey background when disabled */
        cursor: not-allowed;
      }
    `}
  </style>
  
  <button 
    className="back-button"
    onClick={handleBack}
  >
    BACK
  </button>
  <button 
    className={`next-button ${!selectedCategory ? 'disabled' : ''}`}
    onClick={handleNext}
    disabled={!selectedCategory}
  >
    NEXT
  </button>
</div>

        </div>
      </div>
     
    </div>
  );
};

export default EventSelectionPage;