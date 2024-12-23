// import React, { useState } from 'react';
// import Navbar from './Navbar';
// import Footer from './Footer';
// import '../static/EditAddress.css';

// const EditAddress = () => {
//   const [formData, setFormData] = useState({
//     name: 'John Doe',
//     email: 'johndoe@gmail.com',
//     billingAddress: '',
//     contact: '',
//     country: 'england',
//     zipCode: '',
//     vatNumber: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     localStorage.setItem('order_address', JSON.stringify(formData));
//     console.log('Form submitted:', formData);
//   };

//   const handleCancel = () => {
//     // Handle cancel logic here
//     console.log('Form cancelled');
//   };

//   const countries = [
//     { value: 'england', label: 'England' },
//     { value: 'usa', label: 'USA' },
//     { value: 'canada', label: 'Canada' }
//   ];

//   return (
//     <div className="edit-address-page">
     

//       <div className="container">
//         <h2>Edit Address</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               placeholder="John Doe"
//               value={formData.name}
//               onChange={handleChange}
//               className="input-box"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="johndoe@gmail.com"
//               value={formData.email}
//               onChange={handleChange}
//               className="input-box"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="billingAddress">Billing Address</label>
//             <input
//               type="text"
//               id="billingAddress"
//               name="billingAddress"
//               placeholder="Address"
//               value={formData.billingAddress}
//               onChange={handleChange}
//               className="input-box"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="contact">Contact</label>
//             <input
//               type="tel"
//               id="contact"
//               name="contact"
//               placeholder="+44 0000 000000"
//               value={formData.contact}
//               onChange={handleChange}
//               className="input-box"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="country">Country</label>
//             <select
//               id="country"
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               className="input-box"
//               required
//             >
//               {countries.map(country => (
//                 <option key={country.value} value={country.value}>
//                   {country.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="zipCode">Zip Code</label>
//             <input
//               type="text"
//               id="zipCode"
//               name="zipCode"
//               placeholder="000000"
//               value={formData.zipCode}
//               onChange={handleChange}
//               className="input-box"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="vatNumber">VAT Number</label>
//             <input
//               type="text"
//               id="vatNumber"
//               name="vatNumber"
//               placeholder="000000"
//               value={formData.vatNumber}
//               onChange={handleChange}
//               className="input-box"
//             />
//           </div>

//           <div className="buttons">
//             <button type="button" className="cancel" onClick={handleCancel}>
//               Cancel
//             </button>
//             <button type="submit" className="submit">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>

      
//     </div>
//   );
// };

// export default EditAddress;


import React, { useState } from 'react';
import '../static/EditAddress.css';
import { Link, useNavigate } from "react-router-dom";

const EditAddress = () => {
  const [formData, setFormData] = useState({
    address: '',
    city_town: '',
    state: '',
    pincode: '',
    date: ''
  });
  const [locationData, setLocationData] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  // Function to fetch current location using IP Geolocation API
  const fetchLocation = async () => {
    try {
      const response = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=f4fd8f10be354439a0fe1b8724d1884c'); // Replace with your actual API key
      const data = await response.json();
      if (data) {
        console.log(data);
        
        setLocationData(data);
        // Automatically populate address fields with the fetched data
        setFormData({
          ...formData,
          address: data.city, // Set city in billing address field
          pincode: data.zipcode, // Set zipcode in zipCode field
          city_town: data.country_name,
          state:data.state_prov // Set country in country field
        });
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the date to "YYYY-MM-DD HH:MM:SS" before storing it
    const formattedDate = new Date(formData.date).toISOString().replace('T', ' ').split('.')[0];
    
    const dataToStore = {
      ...formData,
      date: formattedDate
    };

    // Store only the necessary fields in localStorage
    localStorage.setItem('order_address', JSON.stringify(dataToStore));
    console.log('Form submitted:', dataToStore);

    navigate('/');
  };

  const handleCancel = () => {
    console.log('Form cancelled');
  };

  return (
    <div className="edit-address-page">
      <div className="container">
        <h2>Edit Address</h2>
        <button type="button" onClick={fetchLocation} className="use-location-button">
          Use Current Location
        </button>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              className="input-box"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city_town">City/Town</label>
            <input
              type="text"
              id="city_town"
              name="city_town"
              placeholder="Enter your city or town"
              value={formData.city_town}
              onChange={handleChange}
              className="input-box"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="Enter your state"
              value={formData.state}
              onChange={handleChange}
              className="input-box"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pincode">Pincode</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              placeholder="Enter your pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="input-box"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input-box"
              required
            />
          </div>

          <div className="buttons">
            <button type="button" className="cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddress;

