// import React, { useState } from 'react';
// import '../static/AccountSettings.css';

// import Sidebar from './SideBar.jsx';
// import MyOrders from './MyOrders.jsx';
// import MyServices from './MyServices.jsx';

// const AccountSettings = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     businessName: '',
//     phoneNumber: '',
//     email: '',
//   });
//   const [showMyOrders, setShowMyOrders] = useState(false);
//   const [showMyServices, setShowMyServices] = useState(false);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleUpdateProfile = () => {
//     // Implement logic to update the profile
//     console.log('Updated profile:', formData);
//   };

//   const handleMyOrders = () => {
//     setShowMyOrders(true);
//     setShowMyServices(false);
//   };

//   const handleMyServices = () => {
//     setShowMyOrders(false);
//     setShowMyServices(true);
//   };

//   return (
//     <div className="account-settings-container">
      
//       <div className="main-content">
//         <Sidebar onMyOrders={handleMyOrders} onMyServices={handleMyServices} />
//         <div className="content-wrapper">
//           {showMyOrders && <MyOrders />}
//           {showMyServices && <MyServices />}
//           {!showMyOrders && !showMyServices && (
//             <>
//               <h1 className="page-title">Account Settings</h1>
//               <div className="form-container">
//                 <div className="form-group">
//                   <label htmlFor="fullName">Full Name:</label>
//                   <input
//                     type="text"
//                     id="fullName"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="form-group">
//               <label htmlFor="businessName">Business Name (optional):</label>
//               <input
//                 type="text"
//                 id="businessName"
//                 name="businessName"
//                 value={formData.businessName}
//                 onChange={handleInputChange}
//               />
//               </div>
//               <div className="form-group">
//               <label htmlFor="phoneNumber">Phone Number:</label>
//               <input
//                 type="tel"
//                 id="phoneNumber"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="email">Email:</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//               />
//             </div>
//                 {/* Rest of the form fields */}
//                 <div className="form-actions">
//                   <button className="btn btn-primary" onClick={handleUpdateProfile}>
//                     Update Profile
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
      
//     </div>
//   );
// };

// export default AccountSettings;


import React, { useState, useEffect } from 'react';
import '../static/AccountSettings.css';

import Sidebar from './SideBar.jsx';
import MyOrders from './MyOrders.jsx';
import MyServices from './MyServices.jsx';

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    phoneNumber: '',
    email: '',
  });
  const [showMyOrders, setShowMyOrders] = useState(false);
  const [showMyServices, setShowMyServices] = useState(false);

  useEffect(() => {
    // Fetch data from local storage on component mount
    const storeduser=JSON.parse(localStorage.getItem('user'));
    console.log(storeduser);
    

    const storedData = {
      first_name: storeduser.user.first_name || '',
      last_name: storeduser.user.last_name || '',
      address: storeduser.user.address || '',
      email: storeduser.user.user_uid || '',
    };
    setFormData(storedData);
  }, []);

  const handleMyOrders = () => {
    setShowMyOrders(true);
    setShowMyServices(false);
  };

  const handleMyServices = () => {
    setShowMyOrders(false);
    setShowMyServices(true);
  };

  return (
    <div className="account-settings-container">
      <div className="main-content">
        <Sidebar onMyOrders={handleMyOrders} onMyServices={handleMyServices} />
        <div className="content-wrapper">
          {showMyOrders && <MyOrders />}
          {showMyServices && <MyServices />}
          {!showMyOrders && !showMyServices && (
            <>
              <h1 className="page-title">Account Settings</h1>
              <div className="form-container">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name:</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.first_name}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="businessName">Last Name:</label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.last_name}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">address:</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.address}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    disabled
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
