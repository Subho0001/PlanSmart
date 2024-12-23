import React, { useState } from 'react';
import '../static/Recommdation.css';

const Recommdation = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('Explore Venue');
  const [budgetValue, setBudgetValue] = useState(30000);

  const menuItems = [
    'Explore Venue',
    'Catering',
    'Additional Services',
    'Guest Welcome',
    'Book Your Date',
    'Budget',
    'Request'
  ];

  const eventTypes = [
    { icon: '🎂', name: 'Birthday' },
    { icon: '👥', name: 'Party' },
    { icon: '💼', name: 'Corporate' },
    { icon: '🏠', name: 'Reception' },
    { icon: '🎭', name: 'Entertainment' },
    { icon: '💍', name: 'Wedding Ritual' },
    { icon: '🤝', name: 'Social Events' }
  ];

  const handleBudgetChange = (e) => {
    setBudgetValue(parseInt(e.target.value));
  };

  return (
    <div>
      <main className="main-content">
        <div className="container">
          <h2 className="title">
            Trust us! We will suggest Best for You.<br />
            Please answer this questions.
          </h2>

          <div className="content-grid">
            <aside className="sidebar">
              <h3>Choose Your Interest</h3>
              {menuItems.map((item) => (
                <button
                  key={item}
                  className={`menu-item ${activeMenuItem === item ? 'active' : ''}`}
                  onClick={() => setActiveMenuItem(item)}
                >
                  {item}
                </button>
              ))}
            </aside>

            <div className="main-section">
              <div className="card">
                <h3>Select Events</h3>
                <div className="events-grid">
                  {eventTypes.map((event) => (
                    <button key={event.name} className="event-btn">
                      <span className="event-icon">{event.icon}</span>
                      <span>{event.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3>Attendees have to come</h3>
                <div className="attendees-form">
                  <div className="input-group">
                    <label>Minimum</label>
                    <input type="number" defaultValue="50" />
                  </div>
                  <div className="input-group">
                    <label>Maximum</label>
                    <input type="number" defaultValue="70" />
                  </div>
                </div>
              </div>

              <div className="card">
                <h3>Budget</h3>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={budgetValue}
                  className="budget-slider"
                  onChange={handleBudgetChange}
                />
                <div className="text-center">${budgetValue.toLocaleString()}</div>
              </div>

              <div className="action-buttons">
                <button className="action-btn">BACK</button>
                <button className="action-btn">RECOMMEND</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Recommdation;