import React from 'react';
import './TestiminialBreadcrum.css';

const TestiminialBreadcrum = () => {

  const handleHomeClick = (e) => {
    e.preventDefault();
    window.location.href = '/'; 
  };

  return (
    <div className="testimonial-banner-wrapper">
      <div className="testimonial-banner-overlay"></div>
      <div className="testimonial-content-box">
        <h1 className="testimonial-main-title">
          TESTIMONIALS
        </h1>

        <nav className="testimonial-breadcrumb-nav">
          <a 
            href="/" 
            onClick={handleHomeClick}
            className="testimonial-home-link"
          >
            Home
          </a>
          <span className="testimonial-breadcrumb-slash">/</span>
          <span className="testimonial-current-page">Testimonial</span>
        </nav>

      </div>
    </div>
  );
};

export default TestiminialBreadcrum;