import React, { useState } from 'react';

const SideMenu = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  
  const menuOptions = [
    { id: 'venue', label: 'Explore Venue' },
    { id: 'catering', label: 'Catering' },
    { id: 'additional', label: 'Additional Services' },
    { id: 'welcome', label: 'Guest Welcome' },
    { id: 'date', label: 'Book Your Date' },
    { id: 'budget', label: 'Budget' },
    { id: 'request', label: 'Request' }
  ];

  const handleOptionSelect = (id) => {
    setSelectedOption(id);
  };

  return (
    <div className="side-menu">
      <h3 className="menu-title">Choose Your Interest</h3>
      <p className="menu-subtitle">Choose the services you want to add to your events</p>
      <div className="menu-options">
        {menuOptions.map((option) => (
          <div 
            key={option.id}
            className={`menu-option ${selectedOption === option.id ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(option.id)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;