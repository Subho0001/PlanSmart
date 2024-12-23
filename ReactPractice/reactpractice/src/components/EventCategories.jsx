import React, { useState } from 'react';

const EventCategories = ({ selectedCategory, onCategorySelect }) => {
  const categories = [
    { id: 'birthday', label: 'Birthday', icon: '🎂' },
    { id: 'wedding', label: 'Wedding', icon: '💒' },
    { id: 'reunion', label: 'Reunion', icon: '👥' },
    { id: 'corporate', label: 'Corporate Party', icon: '🏢' },
    { id: 'anniversary', label: 'Anniversary', icon: '💝' },
    { id: 'religious', label: 'Religious & Cultural Events', icon: '🕉️' },
  ];

  return (
    <div>
      {/* Inline Style for CSS */}
      <style>
        {`
          /* Global Reset */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Merriweather', serif; /* Elegant serif font */
          }

          /* Categories Grid Styling */
          .categories-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr); /* 3 columns per row */
            gap: 2rem; /* Increased gap for elegance */
            padding: 2rem;
            background-color: #f9f7f2; /* Light, warm background */
          }

          .category-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 2px solid #8b6914; /* Subtle border in gold */
            padding: 1.5rem;
            border-radius: 12px; /* Rounded corners */
            text-align: center;
            cursor: pointer;
            transition: transform 0.3s ease, background-color 0.3s ease;
            background-color: white;
          }

          .category-card.selected {
            background-color: #f0e68c; /* Elegant gold background for selected item */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow effect */
          }

          .category-card:hover {
            transform: scale(1.05); /* Slightly enlarge card on hover */
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); /* Enhanced hover shadow */
          }

          .category-icon {
            font-size: 2.5rem; /* Slightly larger icons for more impact */
            color: #8b6914; /* Gold color for the icons */
          }

          .category-label {
            font-size: 1.2rem;
            font-weight: bold;
            margin-top: 1rem;
            color: #333; /* Dark text for better readability */
          }

          /* Button Styling */
          .elegant-button {
            padding: 0.8rem 2rem;
            background-color: #8b6914; /* Elegant gold button */
            color: white;
            font-size: 1rem;
            font-weight: bold;
            border: none;
            border-radius: 8px; /* Rounded corners */
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.3s ease;
          }

          .elegant-button:hover {
            background-color: #f0e68c; /* Light gold background on hover */
            transform: scale(1.05); /* Slightly enlarge on hover */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow on hover */
          }
        `}
      </style>

      <div className="categories-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-card ${selectedCategory === category.id ? 'selected' : ''}`}
            onClick={() => onCategorySelect(category.id)}
          >
            <div className="category-icon">{category.icon}</div>
            <div className="category-label">{category.label}</div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div>
      <EventCategories selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
    </div>
  );
};

export default EventCategories;
