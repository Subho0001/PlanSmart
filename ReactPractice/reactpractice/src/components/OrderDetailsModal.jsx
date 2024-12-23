// // OrderDetailsModal.jsx
// import React, { useState } from 'react';
// import '../static/OrderDetailsModal.css'; // Optional: Add styles for the modal
// import { useNavigate } from 'react-router-dom';

// const OrderDetailsModal = ({ vendor, onClose, onSubmit }) => {
//   const [orderDetails, setOrderDetails] = useState('');
//   const navigate = useNavigate()

//   const handleInputChange = (e) => {
//     setOrderDetails(e.target.value);
//   };
//   console.log(vendor);
  

//   const handleSubmit = () => {
//     onSubmit(orderDetails);
//     onClose(); // Close the modal after submitting
//     console.log("Navigating with vendor details:", vendor);

//     if (vendor && vendor.name && vendor.price) {
//       navigate("/invoice", { state: { vendorDetails: vendor , orderdetails:orderDetails } });
//     } else {
//       console.error("Vendor details are missing or incomplete", vendor);
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h3>Order Details for {vendor.name}</h3>
//         <textarea
//           value={orderDetails}
//           onChange={handleInputChange}
//           placeholder="Enter specific details for your order..."
//           rows="5"
//           cols="30"
//         ></textarea>
//         <button onClick={handleSubmit}>Submit</button>
//         <button onClick={onClose}>Cancel</button>
//       </div>
//     </div>
//   );
// };

// export default OrderDetailsModal;

// import React, { useState } from 'react';
// import '../static/OrderDetailsModal.css';
// import { useNavigate } from 'react-router-dom';

// const OrderDetailsModal = ({ vendor, onClose, onSubmit }) => {
//   const [orderDetails, setOrderDetails] = useState('');
//   const [selectedSubcategories, setSelectedSubcategories] = useState([]);
//   const navigate = useNavigate();

//   console.log(vendor);
  

//   const handleInputChange = (e) => {
//     setOrderDetails(e.target.value);
//   };

//   // Toggle selected subcategory on checkbox change
//   const handleCheckboxChange = (subcategory, price) => {
//     setSelectedSubcategories((prevSelected) => {
//       const isSelected = prevSelected.some(item => item.subcategory === subcategory);
//       if (isSelected) {
//         // Remove if already selected
//         return prevSelected.filter(item => item.subcategory !== subcategory);
//       } else {
//         // Add if not selected, initialize quantity to 1
//         return [...prevSelected, { subcategory, price, quantity: 1 }];
//       }
//     });
//   };

//   // Increment the quantity for a selected subcategory
//   const incrementQuantity = (subcategory) => {
//     setSelectedSubcategories((prevSelected) =>
//       prevSelected.map(item =>
//         item.subcategory === subcategory
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   // Decrement the quantity, ensuring it doesn't go below 1
//   const decrementQuantity = (subcategory) => {
//     setSelectedSubcategories((prevSelected) =>
//       prevSelected.map(item =>
//         item.subcategory === subcategory && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   // Calculate total price based on selected subcategories and their quantities
//   const totalPrice = selectedSubcategories.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const handleSubmit = () => {
//     onSubmit(orderDetails);
//     onClose();

//     if (vendor && vendor.name && totalPrice) {
//       navigate("/invoice", {
//         state: {
//           vendorDetails: vendor,
//           orderDetails,
//           totalPrice,
//           selectedSubcategories, // Pass the selected services with quantity here
//         },
//       });
//     } else {
//       console.error("Vendor details are missing or incomplete", vendor);
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h3>Order Details for {vendor.name}</h3>

//         {/* Checkbox list for subcategories */}
//         <label>Select Subcategories:</label>
//         <div className="checkbox-group">
//           {vendor.subcategory_price_pairs ? vendor.subcategory_price_pairs.map((item, index) => (
//             <div key={index} className="checkbox-item">
//               <input
//                 type="checkbox"
//                 id={`subcategory-${index}`}
//                 onChange={() => handleCheckboxChange(item.subcategory, parseFloat(item.price))}
//               />
//               <label htmlFor={`subcategory-${index}`}>
//                 {item.subcategory} - ${item.price}
//               </label>

//               {/* Quantity Controls */}
//               {selectedSubcategories.some(selected => selected.subcategory === item.subcategory) && (
//                 <div className="quantity-controls">
//                   <button onClick={() => decrementQuantity(item.subcategory)}>-</button>
//                   <span>Quantity: {selectedSubcategories.find(selected => selected.subcategory === item.subcategory).quantity}</span>
//                   <button onClick={() => incrementQuantity(item.subcategory)}>+</button>
//                 </div>
//               )}
//             </div>
//           )) : (
//             <div>No subcategories available</div>
//           )}
//         </div>

//         {/* Display the total price dynamically */}
//         <div className="total-price">Total Price: ${totalPrice.toFixed(2)}</div>

//         <textarea
//           value={orderDetails}
//           onChange={handleInputChange}
//           placeholder="Enter specific details for your order..."
//           rows="5"
//           cols="30"
//           className="order-textarea"
//         ></textarea>

//         <div className="button-group">
//           <button onClick={handleSubmit}>Submit</button>
//           <button onClick={onClose}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetailsModal;


import React, { useState } from 'react';
import '../static/OrderDetailsModal.css';

const OrderDetailsModal = ({ vendor, onClose, onSubmit }) => {
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const handleCheckboxChange = (subcategory, price) => {
    setSelectedSubcategories((prev) =>
      prev.some((item) => item.subcategory === subcategory)
        ? prev.filter((item) => item.subcategory !== subcategory)
        : [...prev, { subcategory, price, quantity: 1 }]
    );
  };

  //   // Increment the quantity for a selected subcategory
  const incrementQuantity = (subcategory) => {
    setSelectedSubcategories((prevSelected) =>
      prevSelected.map(item =>
        item.subcategory === subcategory
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrement the quantity, ensuring it doesn't go below 1
  const decrementQuantity = (subcategory) => {
    setSelectedSubcategories((prevSelected) =>
      prevSelected.map(item =>
        item.subcategory === subcategory && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };


  const totalPrice = selectedSubcategories.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

  const handleSubmit = () => {
    onSubmit(selectedSubcategories);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Select Subcategories for {vendor.name}</h3>
        <div className="checkbox-group">
          {vendor.subcategory_price_pairs.map((item, index) => (
            <div key={index}>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(item.subcategory, item.price)}
              />
              <label>{item.subcategory} -  ₹{item.price}</label>
              {selectedSubcategories.some(selected => selected.subcategory === item.subcategory) && (
                <div className="quantity-controls">
                  <button onClick={() => decrementQuantity(item.subcategory)}>-</button>
                  <span>Quantity: {selectedSubcategories.find(selected => selected.subcategory === item.subcategory).quantity}</span>
                  <button onClick={() => incrementQuantity(item.subcategory)}>+</button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="total-price">Total Price:  ₹{totalPrice.toFixed(2)}</div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
