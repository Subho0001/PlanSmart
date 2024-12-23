// Sidebar.jsx
import React from 'react';
import '../static/SideBar.css';

const Sidebar = ({ onMyOrders, onMyServices }) => {
  return (
    <div className="sidebar">
      <button onClick={onMyOrders} className="sidebar-button">
        My Orders
      </button>
      <button onClick={onMyServices} className="sidebar-button">
        My Services
      </button>
    </div>
  );
};

export default Sidebar;
