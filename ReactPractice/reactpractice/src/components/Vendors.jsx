/* eslint-disable no-unused-vars */
// import React from 'react';
// import Navbar from './Navbar'; // Adjust the path if Navbar is in a different directory
// import Footer from './Footer'; // Adjust the path if Footer is in a different directory
// import '../static/Vendors.css';

//import { API_BASE_URL } from "../configurations/config";

// // Sample data based on the categories and items shown in the screenshot
// const vendorData = [
//   {
//     category: 'Weddings',
//     vendors: [
//       { name: 'Hotel Saket', location: '4.2 km', rating: '4.7/5', id: 1 },
//       { name: 'Sangam Castle', location: '4.8 km', rating: '4.6/5', id: 2 },
//       { name: 'Divine Vatika', location: '5.0 km', rating: '4.8/5', id: 3 },
//       { name: 'Palms Resort', location: '4.0 km', rating: '4.9/5', id: 4 },
//     ],
//   },
//   {
//     category: 'Parties',
//     vendors: [
//       { name: 'Hotel Shyam', location: '5.1 km', rating: '4.5/5', id: 5 },
//       { name: 'Dream Castle', location: '4.3 km', rating: '4.2/5', id: 6 },
//       { name: 'Paradise Restaurant', location: '4.1 km', rating: '4.3/5', id: 7 },
//       { name: 'Kanha Shyam', location: '4.0 km', rating: '4.0/5', id: 8 },
//       { name: 'Bikaner Hotel', location: '4.2 km', rating: '4.0/5', id: 9 },
//     ],
//   },
//   {
//     category: 'Caterers',
//     vendors: [
//       { name: 'Resort Rendezvous', location: '3.5 km', rating: '3.8/5', id: 10 },
//       { name: 'The Inn Crowd', location: '3.2 km', rating: '4.1/5', id: 11 },
//       { name: 'InnSpire', location: '3.5 km', rating: '4.2/5', id: 12 },
//       { name: 'Traveler’s Tryst', location: '3.3 km', rating: '4.0/5', id: 13 },
//     ],
//   },
// ];

// const Vendors = () => {
//   const handleCheckIn = (vendorName) => {
//     alert(`Checked in to ${vendorName}`);
//   };

//   return (
//     <div className="app">
//       <Navbar /> {/* Include Navbar component at the top */}
      
      
      
//       <main>
//         {vendorData.map((categoryData) => (
//           <div className="vendor-list" key={categoryData.category}>
//             <h2>{categoryData.category}</h2>
//             <div className="vendor-container">
//               {categoryData.vendors.map((vendor) => (
//                 <div className="vendor-card" key={vendor.id}>
//                   <img
//                     src={`/${vendor.name.toLowerCase().replace(/\s/g, '-')}.jpg`}
//                     alt={vendor.name}
//                     className="vendor-image"
//                   />
//                   <h3>{vendor.name}</h3>
//                   <p>{vendor.location} | {vendor.rating}</p>
//                   <button
//                     onClick={() => handleCheckIn(vendor.name)}
//                     className="checkin-button"
//                   >
//                     Check In
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </main>
      
//       <Footer /> {/* Include Footer component at the bottom */}
//     </div>
//   );
// };

// export default Vendors;



// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom'; // For retrieving state from navigation
// import '../static/Vendors.css';

// const Vendors = ({ serviceName }) => {
//   const [vendorData, setVendorData] = useState([]); // State to hold vendor data
//   const [loading, setLoading] = useState(true); // State for loading status
//   const location = useLocation();
  
//   // If serviceName is not passed directly as a prop, check location.state
//   const selectedServiceName = serviceName || location.state?.serviceName;

//   useEffect(() => {
//     const apiUrl = selectedServiceName 
//       ? `http://localhost:5000/services/${selectedServiceName}`  // Adjust this endpoint for specific service
//       : 'http://localhost:5000/services/all'; // Endpoint for all services

//     // Fetch data from the API
//     fetch(apiUrl)
//       .then((response) => response.json())
//       .then((data) => {
//         const groupedData = data.reduce((acc, item) => {
//           const { services, business_name, location, rating, service_id, price } = item;

//           if (!acc[services]) {
//             acc[services] = { category: services, vendors: [] };
//           }

//           acc[services].vendors.push({
//             name: business_name,
//             location,
//             rating,
//             service_id,
//             price
//           });

//           return acc;
//         }, {});

//         const groupedArray = Object.values(groupedData);
//         setVendorData(groupedArray);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching vendor data:', error);
//         setLoading(false);
//       });
//   }, [selectedServiceName]);

//   const navigate = useNavigate();

//   const handleCheckIn = (vendor) => {
//     console.log("Navigating with vendor details:", vendor);

//     if (vendor && vendor.name && vendor.price) {
//       navigate("/invoice", { state: { vendorDetails: vendor } });
//     } else {
//       console.error("Vendor details are missing or incomplete", vendor);
//     }
//   };

//   const handleNavigateToReview = (vendor) => {
//     console.log("Navigating with vendor details:", vendor);
//     navigate("/review", { state: { vendorDetails: vendor } });
//   };

//   return (
//     <div className="app">
//       <main>
//         {loading ? (
//           <p>Loading vendors...</p>
//         ) : (
//           vendorData.map((categoryData) => (
//             <div className="vendor-list" key={categoryData.category}>
//               <h2>{categoryData.category}</h2> {/* Display category name */}
//               <div className="vendor-container">
//                 {categoryData.vendors.map((vendor) => (
//                   <div
//                     className="vendor-card"
//                     key={vendor.id}
//                     onClick={() => handleNavigateToReview(vendor)} // Add navigation on click
//                   >
//                     <img
//                       src={`/${vendor.name.toLowerCase().replace(/\s/g, '-')}.jpg`}
//                       alt={vendor.name}
//                       className="vendor-image"
//                     />
//                     <h3>{vendor.name}</h3>
//                     <p>{vendor.location} | {vendor.rating}</p>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation(); // Prevent parent onClick
//                         handleCheckIn(vendor);
//                       }}
//                       className="checkin-button"
//                     >
//                       Place Order
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))
//         )}
//       </main>
//     </div>
//   );
// };

// export default Vendors;

// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import '../static/Vendors.css';
// import OrderDetailsModal from './OrderDetailsModal'; // Import the modal

// const Vendors = ({ serviceName }) => {
//   const [vendorData, setVendorData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedVendor, setSelectedVendor] = useState(null); // State to hold selected vendor for the modal
//   const location = useLocation();
//   const selectedServiceName = serviceName || location.state?.serviceName;
//   const navigate=useNavigate()

//   useEffect(() => {
//     const apiUrl = selectedServiceName 
//       ? `http://localhost:5000/services/${selectedServiceName}`
//       : 'http://localhost:5000/services/all';

//     fetch(apiUrl)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
        
//         const groupedData = data.reduce((acc, item) => {
//           const { services, business_name, location, rating, service_uid, price ,description,subcategory_price_pairs } = item;

//           if (!acc[services]) {
//             acc[services] = { category: services, vendors: [] };
//           }

//           acc[services].vendors.push({
//             name: business_name,
//             location,
//             rating,
//             service_uid,
//             price,
//             description,
//             subcategory_price_pairs 
//           });

//           return acc;
//         }, {});
//         console.log(groupedData);
        
//         setVendorData(Object.values(groupedData));
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching vendor data:', error);
//         setLoading(false);
//       });
//   }, [selectedServiceName]);

//   const handleVendorClick = (vendor) => {
//     setSelectedVendor(vendor); // Open the modal with the selected vendor
//   //   console.log("Navigating with vendor details:", vendor);

//   //   if (vendor && vendor.name && vendor.price) {
//   //     navigate("/invoice", { state: { vendorDetails: vendor } });
//   //   } else {
//   //     console.error("Vendor details are missing or incomplete", vendor);
//   //   }
//   };

//   const handleModalClose = () => {
//     setSelectedVendor(null); // Close the modal
//   };

//   const handleOrderSubmit = (orderDetails) => {
//     console.log(`Order details for ${selectedVendor.name}:`, orderDetails);
//     // Add logic here to send order details to the backend or perform other actions
//     // For example, you could use a fetch() request to save order details
//   };

//   return (
//     <div className="app">
//       <main>
//         {loading ? (
//           <p>Loading vendors...</p>
//         ) : (
//           vendorData.map((categoryData) => (
//             <div className="vendor-list" key={categoryData.category}>
//               <h2>{categoryData.category}</h2>
//               <div className="vendor-container">
//                 {categoryData.vendors.map((vendor) => (
//                   <div className="vendor-card" key={vendor.id}>
//                     <img
//                       src={`/${vendor.name.toLowerCase().replace(/\s/g, '-')}.jpg`}
//                       alt={vendor.name}
//                       className="vendor-image"
//                     />
//                     <h3>{vendor.name}</h3>
//                     <p>{vendor.location} | {vendor.rating}</p>
//                     <button
//                       onClick={() => handleVendorClick(vendor)}
//                       className="checkin-button"
//                     >
//                       Place Order
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))
//         )}
//       </main>

//       {selectedVendor && (
//         <OrderDetailsModal
//           vendor={selectedVendor}
//           onClose={handleModalClose}
//           onSubmit={handleOrderSubmit}
//         />
//       )}
//     </div>
//   );
// };

// export default Vendors;


// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import '../static/Vendors.css';
// import OrderDetailsModal from './OrderDetailsModal';
// import { API_BASE_URL } from '../configurations/config';

// const Vendors = () => {
//   const location = useLocation();
//   const { selectedServices = [], serviceName = '' } = location.state || {}; // `selectedServices` for multiple, `serviceName` for individual
//   const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
//   const [vendorData, setVendorData] = useState([]);
//   const [selectedVendors, setSelectedVendors] = useState([]);
//   const [selectedVendor, setSelectedVendor] = useState(null);
//   const navigate = useNavigate();

//   // Determine if we're in multi-selection or single-service mode
//   const isMultipleSelection = Boolean(selectedServices);
//   const currentService = isMultipleSelection ? selectedServices[currentServiceIndex] : serviceName;

//   useEffect(() => {
//     // Fetch vendors based on the current service
//     fetch(`${API_BASE_URL}/services/${currentService}`)
//       .then((response) => response.json())
//       .then((data) => setVendorData(data))
//       .catch((error) => console.error('Error fetching vendor data:', error));
//   }, [currentService]);

//   const handleVendorClick = (vendor) => {
//     setSelectedVendor(vendor);
//   };

//   const handleModalSubmit = (vendor, selectedSubcategories) => {
//     const newSelectedVendor = { service: currentService, vendor, selectedSubcategories };
    
//     if (isMultipleSelection) {
//       // Multi-selection mode: store selected vendor and advance to the next service or finish
//       setSelectedVendors((prev) => [...prev, newSelectedVendor]);

//       if (currentServiceIndex < selectedServices.length - 1) {
//         setCurrentServiceIndex((prev) => prev + 1);
//       } else {
//         navigate('/invoice', { state: { selectedVendors: [...selectedVendors, newSelectedVendor] } });
//       }
//     } else {
//       // Individual selection mode: directly navigate to the invoice page with the selected vendor data
//       navigate('/invoice', { state: { selectedVendors: [newSelectedVendor] } });
//     }

//     setSelectedVendor(null);
//   };

//   return (
//     <div className="vendor-container">
//       <h2>Select Vendor for {currentService}</h2>
//       <div className="vendor-list">
//         {vendorData.map((vendor) => (
//           <div
//             key={vendor.service_uid}
//             className="vendor-card"
//             onClick={() => handleVendorClick(vendor)}
//           >
//             <h3>{vendor.business_name}</h3>
//             <p>{vendor.location} | Rating: {vendor.rating}</p>
//           </div>
//         ))}
//       </div>
//       {selectedVendor && (
//         <OrderDetailsModal
//           vendor={selectedVendor}
//           onSubmit={(subcategories) => handleModalSubmit(selectedVendor, subcategories)}
//           onClose={() => setSelectedVendor(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default Vendors;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../static/Vendors.css';
import OrderDetailsModal from './OrderDetailsModal';
import { API_BASE_URL } from '../configurations/config';

const Vendors = () => {
  const location = useLocation();
  const { selectedServices = [], serviceName = '' } = location.state || {}; // Provide defaults if state is null
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [vendorData, setVendorData] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const navigate = useNavigate();

  const isMultipleSelection = selectedServices.length > 0;
  const currentService = isMultipleSelection ? selectedServices[currentServiceIndex] : serviceName;

  useEffect(() => {
    if (currentService) {
      fetch(`${API_BASE_URL}/services/${currentService}`)
        .then((response) => response.json())
        .then((data) => setVendorData(data))
        .catch((error) => console.error('Error fetching vendor data:', error));
    }
  }, [currentService]);

  const handleVendorClick = (vendor) => {
    setSelectedVendor(vendor);
  };

  const handleModalSubmit = (vendor, selectedSubcategories) => {
    const newSelectedVendor = { service: currentService, vendor, selectedSubcategories };

    if (isMultipleSelection) {
      setSelectedVendors((prev) => [...prev, newSelectedVendor]);

      if (currentServiceIndex < selectedServices.length - 1) {
        setCurrentServiceIndex((prev) => prev + 1);
      } else {
        navigate('/invoice', { state: { selectedVendors: [...selectedVendors, newSelectedVendor] } });
      }
    } else {
      navigate('/invoice', { state: { selectedVendors: [newSelectedVendor] } });
    }

    setSelectedVendor(null);
  };

  return (
    <div className="vendor-container">
      <div>
      <h2>Select Vendor for {currentService || "Unknown Service"}</h2></div>
      <div className="vendor-list">
        {vendorData.map((vendor) => (
          <div
            key={vendor.service_uid}
            className="vendor-card"
            onClick={() => handleVendorClick(vendor)}
          >
            <h3>{vendor.business_name}</h3>
            <p>{vendor.location} | Rating: {vendor.rating}</p>
          </div>
        ))}
      </div>
      {selectedVendor && (
        <OrderDetailsModal
          vendor={selectedVendor}
          onSubmit={(subcategories) => handleModalSubmit(selectedVendor, subcategories)}
          onClose={() => setSelectedVendor(null)}
        />
      )}
    </div>
  );
};

export default Vendors;