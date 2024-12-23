// import React from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import '../static/Payment.css';

// // Initialize Stripe with your publishable API key
// const stripePromise = loadStripe('pk_test_51QICdTJB6O2Z8CmvinUDFVLL86ktLzr1bwScNHAPp54xXG129cGOKJb4LZsp3EZrgK5P8FqI6pdrBUZyB7rDeO2900jkN072xW'); // Replace with your actual key

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const card = elements.getElement(CardElement);
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: card,
//     });

//     if (error) {
//       console.error(error);
//     } else {
//       console.log('Payment Method Created:', paymentMethod);
//       // Send paymentMethod.id to your backend for processing
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="payment-form">
//       <h1>Complete Registration Payment</h1>
      
//       {/* Personal details section */}
//       <div className="form-section">
//         <h2>Personal details</h2>
//         <div className="form-row">
//           <div className="form-group">
//             <label>Address line</label>
//             <input type="text" placeholder="P.O.Box 1223" />
//           </div>
//           <div className="form-group">
//             <label>City</label>
//             <input type="text" />
//           </div>
//         </div>
//         <div className="form-row">
//           <div className="form-group">
//             <label>State</label>
//             <input type="text" placeholder="Arusha, Tanzania" />
//           </div>
//           <div className="form-group">
//             <label>Postal code</label>
//             <input type="text" placeholder="00000" />
//           </div>
//         </div>
//       </div>

//       {/* Payment methods section */}
//       <div className="form-section">
//         <h2>Payment methods</h2>
        
//         {/* Stripe CardElement for secure card input */}
//         <div className="form-group">
//           <label>Card Details</label>
//           <CardElement className="card-element" />
//         </div>
//       </div>

//       <button type="submit" className="next-button" disabled={!stripe}>
//         Next
//       </button>
//     </form>
//   );
// };

// // Main Payment component wrapping CheckoutForm with Stripe Elements
// const Payment = () => {
//   return (
//     <div className="payment-body">
//       <div className="container">
//         <div className="payment-logo">
//           <img src="./logopay.svg" alt="Payment Gateway Logo" className="logo" />
//           <h2>Payment Gateway</h2>
//         </div>
//         <Elements stripe={stripePromise}>
//           <CheckoutForm />
//         </Elements>
//       </div>
//     </div>
//   );
// };

// export default Payment;


// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../static/Payment.css';
import { API_BASE_URL } from '../configurations/config';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51QICdTJB6O2Z8CmvinUDFVLL86ktLzr1bwScNHAPp54xXG129cGOKJb4LZsp3EZrgK5P8FqI6pdrBUZyB7rDeO2900jkN072xW');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate=useNavigate();
  
  const [orderUid, setOrderUid] = useState('');
  const [amount, setAmount] = useState(0);
  const [userId, setUserId] = useState('');
  
  useEffect(() => {
    // Retrieve and parse the order and user objects from localStorage
    const order = JSON.parse(localStorage.getItem('order'));
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(order);
    
    
    // Set the necessary values from the parsed objects
    if (order) {
      setOrderUid(order.order_uid);
      setAmount(order.total_amount);
      setUserId(user.user.user_uid);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
    });

    if (error) {
      console.error(error);
    } else {
      console.log('Payment Method Created:', paymentMethod);

      // Prepare payment data
      const paymentData = {
        //transaction_uid: paymentMethod.id, // Use paymentMethod.id as a unique identifier
        order_uid: orderUid,
        transaction_type:"card",
        //user_uid: userId,
        amount: amount,
      };

      console.log(paymentData);
      

      // Send paymentData to the backend API
      try {
        const response = await fetch(`${API_BASE_URL}/order/${userId}/payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });
        
        const result = await response.json();
        if (response.ok) {
          console.log('Payment successful:', result);
          alert('Payment successful');
          navigate('/')
        } else {
          console.error('Payment failed:', result.message);
          alert('Payment failed');
        }
      } catch (error) {
        console.error('Error posting payment data:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h1>Complete Registration Payment</h1>
      
      {/* Personal details section */}
      <div className="form-section">
        <h2>Personal details</h2>
        <div className="form-row">
          <div className="form-group">
            <label>Address line</label>
            <input type="text" placeholder="P.O.Box 1223" />
          </div>
          <div className="form-group">
            <label>City</label>
            <input type="text" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>State</label>
            <input type="text" placeholder="Arusha, Tanzania" />
          </div>
          <div className="form-group">
            <label>Postal code</label>
            <input type="text" placeholder="00000" />
          </div>
        </div>
      </div>

      {/* Payment methods section */}
      <div className="form-section">
        <h2>Payment methods</h2>
        <div className="form-group">
          <label>Card Details</label>
          <CardElement className="card-element" />
        </div>
      </div>

      <button type="submit" className="next-button" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
};

const Payment = () => {
  return (
    <div className="payment-body">
      <div className="container">
        <div className="payment-logo">
          <img src="./payment_logo.jpeg" alt="Payment Gateway Logo" className="logo" />
          <h2>Payment Gateway</h2>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;

