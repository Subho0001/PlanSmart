// import React, { useState, useEffect,useContext } from 'react';
// import '../static/Navbar.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { UserContext } from '../UserContext';

// const Navbar = () => {
//   const { user, logout } = useContext(UserContext); 
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [services, setServices] = useState([]);
//   //const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     //setUser(null); // Reset user state to null
//     logout();
//     localStorage.removeItem('order_address')
//     navigate('/'); // Redirect to home or login page after logout
//   };

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/services/unique');
//         if (response.ok) {
//           const data = await response.json();
//           setServices(data);
//         } else {
//           console.error('Failed to fetch services:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error fetching services:', error);
//       }
//     };

//     fetchServices();
//   }, []);

//   return (
//     <nav className="navbar">
//       <button className="logo-button" onClick={() => window.location.href = '/'}>
//         <img src="/logo.png" alt="Logo" className="logo" />
//         <span className="logo-text">PLANSMART</span>
//       </button>
//       <div className="nav-items">
//         <div className="dropdown">
//           <a href="#" className="nav-link" onClick={toggleDropdown}>
//             All Services
//             <i className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`}>▾</i>
//           </a>
//           {isDropdownOpen && (
//             <ul className="dropdown-menu">
//               {services.map((service, index) => (
//                 <li key={index}>
//                   <a href="#">{service.service_name}</a>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//         <Link to="/about"><span className="nav-link">About Us</span></Link>
//         {user ? (
//           <>
//           <button className="logout-btn" onClick={handleLogout}>Logout</button>
//           <Link to="/account"><img src="/profile.png" alt="Profile" className="profile-icon" /></Link></>
//         ) : (
//           <Link to="/login"><span className="login-btn">Login / SignUp</span></Link>
//         )}
        
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



//export default Navbar;
import React, { useState, useEffect, useContext } from 'react';
import '../static/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { API_BASE_URL } from '../configurations/config';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    logout();
    localStorage.removeItem('order_address');
    localStorage.removeItem('order')
    navigate('/'); // Redirect to home or login page after logout
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/services/unique`);
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        } else {
          console.error('Failed to fetch services:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  // Function to navigate to vendors page with service_name as a parameter
  const handleServiceClick = (serviceName) => {
    navigate('/vendors', { state: { serviceName } });
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo-button">
        <img src="/logo.png" alt="Logo" className="logo" />
        <span className="logo-text">PLANSMART</span>
      </Link>
      
      <div className="nav-items">
        <div className="dropdown">
        <a href="#" className="nav-link" onClick={toggleDropdown}>
  All Services
  <i className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`}>▾</i>
</a>

          {isDropdownOpen && (
            <ul className="dropdown-menu">
              {services.map((service, index) => (
                <li key={index} onClick={() => handleServiceClick(service.service_name)}>
                  <a href=""> {service.service_name}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Link to="/about"><span className="nav-link">About Us</span></Link>
        {user ? (
          <>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            <Link to="/profile"><img src="/profile.svg" alt="Profile" className="profile-icon" /></Link>
          </>
        ) : (
          <Link to="/login"><span className="login-btn">Login / SignUp</span></Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;