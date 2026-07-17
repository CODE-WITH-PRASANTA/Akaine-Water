import React from 'react';
import './ServiceBreadcrumb.css';
// Import your background image directly from your assets folder
// Updated to use the correct reference image "wat 1.jpg"
import serviceBannerBg from '../../assets/wat 1.jpg'; 

const ServiceBreadcrumb = () => {
  return (
    <div className="ServiceBreadcrumb-wrapper">
      
      {/* Invisible semantic SEO block for search engine indexing */}
      <section className="ServiceBreadcrumb-seo-content">
        <h1>Alka Drops - Premium Water Delivery Services Bhubaneswar</h1>
        <h2>Best Water Delivery Service in Odisha & Premium Wellness Hydration</h2>
        <p>
          Explore premium alkaline and pure wellness water delivery services by Alka Drops. 
          As the leading water service provider in Bhubaneswar and throughout Odisha, we deliver healthy, 
          mineral-rich hydration solutions direct to your home and office.
        </p>
      </section>

      {/* --- HERO BANNER BACKGROUND --- */}
      <div 
        className="ServiceBreadcrumb-banner"
        style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${serviceBannerBg})` }}
      >
        {/* Text and Nav Controls Container */}
        <div className="ServiceBreadcrumb-container">
          <h2 className="ServiceBreadcrumb-title">Our Services</h2>
          
          <div className="ServiceBreadcrumb-navigation">
            <a href="/" className="ServiceBreadcrumb-link-home">HOME</a>
            <span className="ServiceBreadcrumb-divider">/</span>
            <span className="ServiceBreadcrumb-link-current">OUR SERVICES</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ServiceBreadcrumb;