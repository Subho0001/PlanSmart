import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../static/About.css';

const About = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const features = [
    {
      title: "Diverse Venues",
      description: "We offer a wide selection of event venues, from elegant banquet halls to intimate outdoor locations, tailored to suit your unique style and preferences."
    },
    {
      title: "Customized Catering",
      description: "With Plansmart catering service a breeze. Create a personalized menu that suits your dietary preferences and cultural themes."
    },
    {
      title: "Endless Possibilities",
      description: "Enhance your event with entertainment, photography, decorations, and more. We provide a comprehensive range of services to bring your vision to life."
    },
    {
      title: "Corporate Excellence",
      description: "Specializing in corporate event planning, ensuring that your business meetings, seminars, and conferences run flawlessly."
    }
  ];

  const categories = [
    "Birthday",
    "Wedding",
    "Reception",
    "Corporate Parties",
    "Retirement Parties",
    "Reunion",
    "Anniversary Parties"
  ];

  return (
    <div>
     
      
      <div className="container">
        <section className="section">
          <h1 className="section-title">ABOUT US</h1>
          <div className="logo-circle">
            <img src="./logo.png" alt="PlanSmart Logo Large" />
          </div>
          
          <div className="section">
            <h2 className="section-title">Our Story</h2>
            <p>At Plansmart, we understand the challenges and stress that often come with event planning. That's why we embarked on a mission to revolutionize the way people plan and celebrate special moments. Founded by a team of passionate event enthusiasts, Plansmart was born out of a shared vision to make event planning an enjoyable and seamless experience.</p>
          </div>

          <div className="section">
            <h2 className="section-title">What Sets Us Apart</h2>
            <p>At the core of Plansmart's philosophy is a commitment to delivering exceptional service and unparalleled convenience. We believe that every event, whether it's a wedding, a corporate seminar, a milestone birthday, or a simple get-together, deserves meticulous planning and attention to detail.</p>
          </div>

          <div className="section">
            <h2 className="section-title">Our Vision</h2>
            <p>Our vision is simple yet profound: To be your trusted partner in crafting unforgettable events. We aim to be the go-to platform for anyone seeking the perfect service, delectable catering, and a plethora of additional services to make their event truly special.</p>
          </div>

          <div className="section">
            <h2 className="section-title">Why Choose Plansmart</h2>
            <div className="features">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

       
      </div>


    </div>
  );
};

export default About;