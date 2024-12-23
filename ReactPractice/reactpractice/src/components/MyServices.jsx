import React, { useEffect, useState } from 'react';
import '../static/MyServices.css';

const MyServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Fetch user UID from localStorage
        const userUid = JSON.parse(localStorage.getItem('user'));
        
        // Make a GET request to the Flask API with the user UID
        const response = await fetch(`http://127.0.0.1:5000/services/service_by_id/${userUid.user.user_uid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Check if the response is successful
        if (!response.ok) {
          if (response.status === 404) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'No services found for this user');
          } else {
            throw new Error('Failed to fetch services');
          }
        }
        
        // Parse the JSON response
        const data = await response.json();
        
        // Update the state with the fetched data
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Show loading state
  if (loading) {
    return <div>Loading services...</div>;
  }

  // Show error if one occurred
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Show message if no services are found
  if (services.length === 0) {
    return <div>No services found for this user.</div>;
  }

  return (
    <div className="my-services-container">
      <h2 className="my-services-title">My Services</h2>
      <table className="services-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Business Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.service_uid}>
              <td>{service.services}</td>
              <td>{service.business_name}</td>
              <td>{service.description}</td>
              <td>{service.location}</td>
              <td>{service.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyServices;
