import React, { useState, useEffect } from "react";
import "../static/Individual.css";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../configurations/config";


const Individual = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  // Fetch services from the Flask API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/services/unique`); // Adjust the URL as needed
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          
          setServices(data); // Assuming API response is an array of service objects
        } else {
          console.error("Failed to fetch services:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const selectService = (service) => {
    setSelectedService(service);
  };

  const goBack = () => {
    window.history.back();
  };

  const goNext = () => {
    if (selectedService) {
      console.log("Moving to next step with service:", selectedService);
      navigate("/vendors", { state: { serviceName: selectedService } });
    } else {
      alert("Please select a service to continue");
    }
  };

  return (
    <main className="main-content">
      <h1>Which type of event do you want to plan?</h1>
      
      <div className="services-grid">
        {services.length > 0 ? (
          services.map((service) => (
            <div
              key={service.service_name} // Assuming each service has a unique ID
              className={`service-item ${selectedService === service.service_name ? "selected" : ""}`}
              onClick={() => selectService(service.service_name)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {/* Add appropriate SVG paths based on service type */}
              </svg>
              <p>{service.service_name.charAt(0).toUpperCase() + service.service_name.slice(1)}</p>
            </div>
          ))
        ) : (
          <p>Loading services...</p>
        )}
      </div>

      <div className="navigation-buttons">
        <button className="nav-button" onClick={goBack}>BACK</button>
        <button className="nav-button" onClick={goNext}>NEXT</button>
      </div>
    </main>
  );
};

export default Individual;
