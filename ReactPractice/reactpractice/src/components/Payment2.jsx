import React, { useState } from 'react';
import '../static/Payment2.css';

const Payment = () => {
  const [transactionType, setTransactionType] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Retrieve total price from localStorage
    const totalPrice = localStorage.getItem('total_amount');
    
    // Ensure totalPrice and transactionType are available
    if (!totalPrice || !transactionType) {
      alert('Please select a payment method and ensure total price is available');
      return;
    }
    
    // Data to send to the Flask API
    const paymentData = {
      amount: parseFloat(totalPrice),
      transactionType: transactionType,
      //status: true
    };

    // Send data to the Flask API
    try {
      const response = await fetch('http://localhost:5000/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });
      
      if (response.ok) {
        alert('Payment submitted successfully');
      } else {
        alert('Payment submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting payment');
    }
  };

  return (
    <div className="payment-body">
      <div className="container">
        <div className="payment-logo">
          <img src="./logopay.sg" alt="Payment Gateway Logo" className="logo" />
          <h2>Payment Gateway</h2>
        </div>

        <div className="payment-form">
          <h1>Complete Registration Payment</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Payment Methods</h2>
              <div className="payment-methods">
                <div className="payment-method" onClick={() => setTransactionType('Visa')}>
                  <img src="./visa.png" alt="Visa" />
                </div>
                <div className="payment-method" onClick={() => setTransactionType('Stripe')}>
                  <img src="./stripe.png" alt="Stripe" />
                </div>
                <div className="payment-method" onClick={() => setTransactionType('PayPal')}>
                  <img src="/api/placeholder/60/40" alt="PayPal" />
                </div>
                <div className="payment-method" onClick={() => setTransactionType('Mastercard')}>
                  <img src="./master.png" alt="Mastercard" />
                </div>
                <div className="payment-method" onClick={() => setTransactionType('Google Pay')}>
                  <img src="./gpay.png" alt="Google Pay" />
                </div>
              </div>

              <div className="form-group">
                <label>Cardholder&apos;s Name</label>
                <input type="text" placeholder="Name on your card" required />
              </div>
              <div className="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="0000 0000 0000 0000" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry</label>
                  <input type="text" placeholder="MM/YY" required />
                </div>
                <div className="form-group">
                  <label>CVC</label>
                  <input type="text" placeholder="000" required />
                </div>
              </div>
            </div>

            <button type="submit" className="next-button">Pay Now</button>
          </form>

          <div className="footer">
            <a href="#">Instructions</a>
            <a href="#">License</a>
            <a href="#">Terms of Use</a>
            <a href="#">Privacy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
