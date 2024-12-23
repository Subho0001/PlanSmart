// import React, { useEffect, useState } from 'react';
// import '../static/Invoice.css';
// import { Link } from 'react-router-dom';

// const Invoice = () => {
//   const [serviceDetails, setServiceDetails] = useState([]);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     // Fetch service details from local storage
//     const storedDetails = JSON.parse(localStorage.getItem('serviceDetails'));
//     if (storedDetails) {
//       setServiceDetails(storedDetails);
//     }
//   }, []);

//   useEffect(() => {
//     // Calculate total charges, GST, and final total
//     const calculateTotal = () => {
//       let serviceTotal = 0;
//       const charges = serviceDetails.map((service) => {
//         serviceTotal += parseFloat(service.amount.replace(/,/g, ''));
//         return { item: service.item, amount: service.amount };
//       });

//       const gstCharge = (serviceTotal * 0.3).toFixed(2);
//       const portalCharge = 700;

//       const totalAmount = serviceTotal + parseFloat(gstCharge) + portalCharge;
//       setTotal(totalAmount);

//       setServiceDetails([
//         ...charges,
//         { item: 'GST (30%)', amount: `${gstCharge}/-` },
//         { item: 'Portal Charge', amount: `${portalCharge}/-` },
//       ]);
//     };

//     calculateTotal();
//   }, [serviceDetails]);

//   const handleClose = () => {
//     window.close();
//   };

//   return (
//     <div className="invoice-container">
//       <span className="close-button" onClick={handleClose}>×</span>
//       <h2>YOUR INVOICE</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Item</th>
//             <th>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {serviceDetails.map((row, index) => (
//             <tr key={index}>
//               <td>{row.item}</td>
//               <td>{row.amount}</td>
//             </tr>
//           ))}
//           <tr>
//             <th className="total">Total</th>
//             <td className="total">{total.toLocaleString()}/-</td>
//           </tr>
//         </tbody>
//       </table>
//       <Link to="/payment"><button>BOOK NOW</button></Link>
//     </div>
//   );
// };

// export default Invoice;



// import React, { useEffect, useState } from 'react';
// import '../static/Invoice.css';
// import { Link, useLocation } from 'react-router-dom';

// const Invoice = () => {
//   const location = useLocation();
//   const [serviceDetails, setServiceDetails] = useState([]);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     const vendorDetails = location.state?.vendorDetails;
//     console.log(vendorDetails);

//     if (vendorDetails) {
//       setServiceDetails([{ item: vendorDetails.name, amount: vendorDetails.price }]);
//     }
//   }, [location.state]);

//   useEffect(() => {
//     const calculateTotal = () => {
//       let serviceTotal = 0;

//       // Safely parse and sum service amounts
//       serviceDetails.forEach((service) => {
//         const amount = typeof service.amount === 'string'
//           ? parseFloat(service.amount.replace(/,/g, ''))
//           : service.amount;

//         serviceTotal += amount || 0; // Fallback to 0 if amount is undefined or NaN
//       });

//       // Calculate GST and portal charges
//       const gstCharge = (serviceTotal * 0.3).toFixed(2); // 30% GST
//       const portalCharge = 700;
//       const totalAmount = serviceTotal + parseFloat(gstCharge) + portalCharge;
//       setTotal(totalAmount);

//       // Add GST and portal charges if not already in `serviceDetails`
//       const additionalCharges = [
//         { item: 'GST (30%)', amount: `${gstCharge}/-` },
//         { item: 'Portal Charge', amount: `${portalCharge}/-` },
//       ];

//       if (!serviceDetails.some((service) => service.item === 'GST (30%)')) {
//         setServiceDetails((prevDetails) => [...prevDetails, ...additionalCharges]);
//       }
//     };

//     if (serviceDetails.length > 0) {
//       calculateTotal();
//     }
//   }, [serviceDetails]);

//   const handleClose = () => {
//     window.close();
//   };

//   return (
//     <div className="invoice-container">
//       <span className="close-button" onClick={handleClose}>×</span>
//       <h2>YOUR INVOICE</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Item</th>
//             <th>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {serviceDetails.map((row, index) => (
//             <tr key={index}>
//               <td>{row.item}</td>
//               <td>{row.amount}</td>
//             </tr>
//           ))}
//           <tr>
//             <th className="total">Total</th>
//             <td className="total">{total.toLocaleString()}/-</td>
//           </tr>
//         </tbody>
//       </table>
//       <Link to="/payment"><button>BOOK NOW</button></Link>
//     </div>
//   );
// };

// export default Invoice;

// import React, { useEffect, useState } from 'react';
// import '../static/Invoice.css';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { API_BASE_URL } from '../configurations/config';

// const Invoice = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [serviceDetails, setServiceDetails] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [gstCharge, setGstCharge] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);  // Prevent multiple submissions
//   const portalCharge = 700; // Fixed portal charge
//   const orderDetails = location.state?.orderdetails;
//   const selectedSubcategories = location.state?.selectedSubcategories || [];  // Get selected subcategories and their quantities

//   // Fetch service details on component mount
//   useEffect(() => {
//     const vendorDetails = location.state?.vendorDetails;
//     console.log(location.state?.selectedSubcategories);

//     if (vendorDetails) {
//       setServiceDetails([{ id: vendorDetails.service_uid, item: vendorDetails.name, amount: location.state?.totalPrice }]);
//     }
//   }, [location.state?.vendorDetails]);

//   // Calculate total, GST, and portal charges
//   useEffect(() => {
//     const calculateTotal = () => {
//       let serviceTotal = 0;

//       // Sum service amounts safely
//       serviceDetails.forEach((service) => {
//         const amount = typeof service.amount === 'string'
//           ? parseFloat(service.amount.replace(/,/g, ''))
//           : service.amount;
//         serviceTotal += amount || 0;
//       });

//       // Add subcategory prices based on quantity
//       selectedSubcategories.forEach((subcategory) => {
//         serviceTotal += subcategory.price * subcategory.quantity;  // Multiply price by quantity
//       });

//       // Calculate GST (30% of service total)
//       const calculatedGstCharge = (serviceTotal * 0.3).toFixed(2);
//       setGstCharge(parseFloat(calculatedGstCharge));

//       // Calculate final total
//       const totalAmount = serviceTotal + parseFloat(calculatedGstCharge) + portalCharge;
//       setTotal(totalAmount);
//     };

//     if (serviceDetails.length > 0 || selectedSubcategories.length > 0) {
//       calculateTotal();
//     }
//   }, [serviceDetails, selectedSubcategories]);

//   // Handle order creation and send data
//   const handleOrderCreation = async () => {
//     if (isSubmitting) return; // Prevent multiple submissions

//     setIsSubmitting(true); // Set the submitting flag to true

//     const orderAddress = JSON.parse(localStorage.getItem('order_address'));
//     const user = JSON.parse(localStorage.getItem('user'));

//     if (!orderAddress || !user) {
//       alert("Order address or user information is missing.");
//       setIsSubmitting(false); // Reset the submitting flag
//       return;
//     }

//     // Prepare comma-separated strings for subcategories and prices
//     const subcategories = selectedSubcategories.map((service) => service.subcategory).join(", ");
//     const prices = selectedSubcategories.map((service) => service.price).join(", ");
//     const quantities = selectedSubcategories.map((service) => service.quantity).join(", "); // Quantities

//     // Prepare order payload with service IDs, subcategories, prices, and quantities
//     const orderData = {
//       user_id: user.user.user_uid,
//       address: orderAddress.address,
//       state: orderAddress.state,
//       city_town: orderAddress.city_town,
//       pincode: orderAddress.pincode,
//       date_time: orderAddress.date,
//       services: serviceDetails.map((service) => ({ service_uid: service.id })), // Map to service IDs
//       total_amount: total,
//       request: orderDetails || "",            // Fallback to empty string if null
//       items_data: subcategories || "",         // Fallback to empty string if null
//       price_data: prices || "",               // Fallback to empty string if null
//       quantity: quantities || ""         // Send quantities as comma-separated string
//     };

//     // Store the initial orderData in localStorage
//     localStorage.setItem('order', JSON.stringify(orderData));

//     console.log(orderData);

//     try {
//       const response = await fetch(`${API_BASE_URL}/order/${user.user.user_uid}/place`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(orderData),
//       });

//       if (response.status === 201) {
//         const responseData = await response.json(); // Parse the response as JSON
//         const order_uid = responseData.order_uid; // Extract the order_uid from the response

//         // Add order_uid to orderData
//         orderData.order_uid = order_uid;

//         // Update localStorage with the modified orderData
//         localStorage.setItem('order', JSON.stringify(orderData));

//         alert("Order created successfully!");
//         navigate('/payment'); // Redirect to payment page
//       }
//     } catch (error) {
//       console.error("Error creating order:", error);
//       alert("There was an error creating your order.");
//     } finally {
//       setIsSubmitting(false); // Reset the submitting flag after the API call is complete
//     }
//   };

//   const handleClose = () => {
//     window.close();
//   };

//   return (
//     <div className="invoice-container">
//       <span className="close-button" onClick={handleClose}>×</span>
//       <h2>YOUR INVOICE</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Item</th>
//             <th>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {serviceDetails.map((row, index) => (
//             <tr key={index}>
//               <td>{row.item}</td>
//               <td>{row.amount}</td>
//             </tr>
//           ))}

//           {/* Display selected subcategories with quantities */}
//           {selectedSubcategories.map((row, index) => (
//             <tr key={index}>
//               <td>{row.subcategory}</td>
//               <td>{(row.price * row.quantity).toFixed(2)} /-</td>
//             </tr>
//           ))}

//           <tr>
//             <td>GST (30%)</td>
//             <td>{gstCharge.toLocaleString()}/-</td>
//           </tr>
//           <tr>
//             <td>Portal Charge</td>
//             <td>{portalCharge.toLocaleString()}/-</td>
//           </tr>
//           <tr>
//             <th className="total">Total</th>
//             <td className="total">{total.toLocaleString()}/-</td>
//           </tr>
//         </tbody>
//       </table>
//       <button onClick={handleOrderCreation} disabled={isSubmitting}>
//         {isSubmitting ? "Processing..." : "BOOK NOW"}
//       </button>
//     </div>
//   );
// };

// export default Invoice;


import React, { useEffect, useState } from 'react';
import '../static/Invoice.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../configurations/config';

const Invoice = () => {
  const { state } = useLocation();
  const { selectedVendors } = state;
  const [total, setTotal] = useState(0);
  const [gstCharge, setGstCharge] = useState(0);
  const navigate = useNavigate();
  const portalCharge = 700;

  useEffect(() => {
    const calculatedTotal = selectedVendors.reduce((sum, { selectedSubcategories }) => {
      return sum + selectedSubcategories.reduce((subSum, { price, quantity }) => subSum + price * quantity, 0);
    }, portalCharge);

    const calculatedGstCharge = calculatedTotal * 0.3;
    setTotal(calculatedTotal + calculatedGstCharge);
    setGstCharge(calculatedGstCharge);
  }, [selectedVendors]);

  const handleOrderCreation = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const orderAddress = JSON.parse(localStorage.getItem('order_address'));

    if (!user || !orderAddress) {
      alert("Order address or user information is missing.");
      return;
    }

    const serviceDetails = selectedVendors.map(({ vendor, selectedSubcategories, service }) => ({
      service_uid: vendor.service_uid,
      service_name: service,
      vendor_name: vendor.business_name,
      subcategories: selectedSubcategories.map((subcat) => ({
        subcategory: subcat.subcategory,
        price: subcat.price,
        quantity: subcat.quantity,
      })),
    }));

    const orderData = {
      user_id: user.user.user_uid,
      address: orderAddress.address,
      state: orderAddress.state,
      city_town: orderAddress.city_town,
      pincode: orderAddress.pincode,
      date_time: orderAddress.date,
      services: serviceDetails,
      total_amount: total,
      request: "", 
      items_data: serviceDetails.flatMap((service) =>
        service.subcategories.map((sub) => sub.subcategory)
      ).join(", "),
      price_data: serviceDetails.flatMap((service) =>
        service.subcategories.map((sub) => sub.price)
      ).join(", "),
      quantity: serviceDetails.flatMap((service) =>
        service.subcategories.map((sub) => sub.quantity)
      ).join(", ")
    };

    console.log(orderData);
    
    

    try {
      const response = await fetch(`${API_BASE_URL}/order/${user.user.user_uid}/place`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.status === 201) {
        const responseData=await response.json()
        const order_uid = responseData.order_uid;
        orderData.order_uid = order_uid;
        alert("Order created successfully!");
        localStorage.setItem('order', JSON.stringify(orderData));
        navigate('/payment');
      } else {
        alert("There was an error creating your order.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("There was an error creating your order.");
    }
  };

  return (
    <div className="invoice-container">
      <h2>Your Invoice</h2>
      <table>
        <thead>
          <tr><th>Service</th><th>Vendor</th><th>Subcategory</th><th>Quantity</th><th>Price</th></tr>
        </thead>
        <tbody>
          {selectedVendors.map(({ service, vendor, selectedSubcategories }, index) =>
            selectedSubcategories.map((item, i) => (
              <tr key={`${index}-${i}`}>
                <td>{service}</td>
                <td>{vendor.business_name}</td>
                <td>{item.subcategory}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <p>GST (30%): ${gstCharge.toFixed(2)}</p>
      <p>Portal Charge: ${portalCharge}</p>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={handleOrderCreation}>Book Now</button>
    </div>
  );
};

export default Invoice;


