// import React, { useState } from 'react';
// // import SideMenu from './SideMenu';
// // import Navbar from './Navbar';
// // import Footer from './Footer';
// import '../static/Multipleselect.css';

// const Multipleselect = () => {
//   const [selectedServices, setSelectedServices] = useState(['venue', 'catering']);

//   const handleServiceSelect = (service) => {
//     if (selectedServices.includes(service)) {
//       setSelectedServices(selectedServices.filter(s => s !== service));
//     } else {
//       setSelectedServices([...selectedServices, service]);
//     }
//   };

//   const handleBack = () => {
//     // Handle back navigation
//     console.log('Going back');
//     window.history.back();
//   };

//   const handleNext = () => {
//     // Handle next step with selectedServices
//     console.log('Moving to next step with:', selectedServices);
//   };

//   return (
//     <div className="birthday-combo-container">
      
//       <div className="main-content">
//         {/* <SideMenu /> */}
//         <div className="selection-area">
//           <h2 className="selection-title">Birthday Combo</h2>
//           <p className="selection-subtitle">Choose the options you want to add to your events</p>
//           <div className="service-selection">
//             <div
//               className={`service-card ${selectedServices.includes('venue') ? 'selected' : ''}`}
//               onClick={() => handleServiceSelect('venue')}
//             >
//               Venue
//             </div>
//             <div
//               className={`service-card ${selectedServices.includes('catering') ? 'selected' : ''}`}
//               onClick={() => handleServiceSelect('catering')}
//             >
//               Catering
//             </div>
//             <div
//               className={`service-card ${selectedServices.includes('dj') ? 'selected' : ''}`}
//               onClick={() => handleServiceSelect('dj')}
//             >
//               DJ
//             </div>
//             <div
//               className={`service-card ${selectedServices.includes('decoration') ? 'selected' : ''}`}
//               onClick={() => handleServiceSelect('decoration')}
//             >
//               Decoration
//             </div>
//           </div>
//           <div className="navigation-buttons">
//             <button className="back-button" onClick={handleBack}>
//               BACK
//             </button>
//             <button className="next-button" onClick={handleNext}>
//               NEXT
//             </button>
//           </div>
//         </div>
//       </div>
      
//     </div>
//   );
// };

// export default Multipleselect;


// import React, { useState } from 'react';
// import '../static/Multipleselect.css';
// import { useNavigate } from 'react-router-dom';

// const Multipleselect = () => {
//   const [selectedServices, setSelectedServices] = useState(['Venue', 'Caterers']);
//   const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
//   const navigate=useNavigate()

//   const handleServiceSelect = (service) => {
//     if (selectedServices.includes(service)) {
//       setSelectedServices(selectedServices.filter(s => s !== service));
//     } else {
//       setSelectedServices([...selectedServices, service]);
//     }
//   };

//   const handleBack = () => {
//     // Handle back navigation
//     console.log('Going back');
//     window.history.back();
//   };

//   const handleNext = () => {
//     if (currentServiceIndex < selectedServices.length) {
//       const currentService = selectedServices[currentServiceIndex];
//       console.log(`Navigating to ${currentService} vendor page`);
      
//       // Navigate to the vendor page for the current service
//       //window.location.href = `/vendor/${currentService}`; // or use `navigate(`/vendor/${currentService}`)` if using react-router
//       navigate("/vendors", { state: { serviceName: currentService } });
//       // Update to the next service index for future navigations
//       setCurrentServiceIndex(currentServiceIndex + 1);
//     }
//   };

//   return (
//     <div className="birthday-combo-container">
//       <div className="main-content">
//         <div className="selection-area">
//           <h2 className="selection-title">Birthday Combo</h2>
//           <p className="selection-subtitle">Choose the options you want to add to your events</p>
//           <div className="service-selection">
//             <div
//               className={`service-card ${selectedServices.includes('Venue') ? 'selected' : ''}`}
//               onClick={() => handleServiceSelect('Venue')}
//             >
//               Venue
//             </div>
//             <div
//               className={`service-card ${selectedServices.includes('Caterers') ? 'selected' : ''}`}
//               onClick={() => handleServiceSelect('Caterers')}
//             >
//               Cateror
//             </div>
//             <div
//               className={`service-card ${selectedServices.includes('Dj') ? 'selected' : ''}`}
//               onClick={() => handleServiceSelect('Dj')}
//             >
//               DJ
//             </div>
//             <div
//               className={`service-card ${selectedServices.includes('Makeup') ? 'selected' : ''}`}
//               onClick={() => handleServiceSelect('Makeup')}
//             >
//               Decoration
//             </div>
//           </div>
//           <div className="navigation-buttons">
//             <button className="back-button" onClick={handleBack}>
//               BACK
//             </button>
//             <button 
//               className="next-button" 
//               onClick={handleNext}
//               disabled={currentServiceIndex >= selectedServices.length} // Disable when all services are done
//             >
//               NEXT
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Multipleselect;



import React, { useState } from 'react';
import '../static/Multipleselect.css';
import { useNavigate } from 'react-router-dom';

const Multipleselect = () => {
  const [selectedServices, setSelectedServices] = useState(['Venue', 'Caterers']);
  const navigate = useNavigate();

  const handleServiceSelect = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleNext = () => {
    navigate("/vendors", { state: { selectedServices } });
  };

  return (
    <div className="birthday-combo-container">
      <h2>Select Services</h2>
      <div className="service-selection">
        {['Venue', 'Caterers', 'Dj', 'Makeup'].map((service) => (
          <div
            key={service}
            className={`service-card ${selectedServices.includes(service) ? 'selected' : ''}`}
            onClick={() => handleServiceSelect(service)}
          >
            {service}
          </div>
        ))}
      </div>
      <button onClick={handleNext} disabled={selectedServices.length === 0}>Next</button>
    </div>
  );
};

export default Multipleselect;
