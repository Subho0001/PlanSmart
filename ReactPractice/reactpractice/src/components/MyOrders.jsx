// import React from 'react';
// import '../static/MyOrders.css';

// const MyOrders = () => {
//   const orders = [
//     { id: 1, order: 'Order #1', status: 'Received' },
//     { id: 2, order: 'Order #2', status: 'Pending' },
//     { id: 3, order: 'Order #3', status: 'Received' },
//   ];

//   return (
//     <div className="my-orders-container">
//       <h2 className="my-orders-title">My Orders</h2>
//       <table className="orders-table">
//         <thead>
//           <tr>
//             <th>Order</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order.id}>
//               <td>{order.order}</td>
//               <td>{order.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MyOrders;

// import React, { useEffect, useState } from 'react';
// import '../static/MyOrders.css';

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const storeduser=JSON.parse(localStorage.getItem('user'))
//   const user_id=storeduser.user.user_uid

//   useEffect(() => {
//     // Replace 'http://localhost:5000/api/orders' with your Flask API endpoint
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/order/${user_id}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch orders');
//         }
//         const data = await response.json();
//         console.log(data);
        
//         setOrders(data); // Assuming your API returns an array of orders
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="my-orders-container">
//       <h2 className="my-orders-title">My Orders</h2>
//       <table className="orders-table">
//         <thead>
//           <tr>
//             <th>Order</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order.id}>
//               <td>{order.order}</td>
//               <td>{order.decision}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MyOrders;

import React, { useEffect, useState } from 'react';
import '../static/MyOrders.css';
import { API_BASE_URL } from '../configurations/config';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storeduser = JSON.parse(localStorage.getItem('user'));
  const user_id = storeduser.user.user_uid;

  useEffect(() => {
    // Fetch orders data
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/order/${user_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        console.log(data);
        setOrders(data); // Set the fetched data to the state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="my-orders-container">
      <h2 className="my-orders-title">My Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-card" key={order.order_uid}>
            <h4>Items:</h4>
            <ul>
              {order.item_price_quantity_pairs.map((item, index) => (
                <li key={index}>
                  <p><strong>Item:</strong> {item.item}</p>
                  <p><strong>Price:</strong> ₹{item.price}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                </li>
              ))}
            </ul>
            <p><strong>Request:</strong> {order.request}</p>
            <p><strong>Date and Time:</strong> {order.date_time}</p>
            <p><strong>Address:</strong> {order.address}, {order.city_town}, {order.state}, {order.pincode}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;