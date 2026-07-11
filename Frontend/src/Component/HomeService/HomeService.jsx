import React from 'react';
import './HomeService.css';

// Premium imagery representing pure filtration and distribution assets
import imgCard1 from '../../assets/Water1.jpg'; 
import imgCard2 from '../../assets/Water2.jpg'; 
import imgCard3 from '../../assets/Water3.jpg';

const HomeService = () => {
  return (
    <section className="alka-services-section">
      {/* Category Target Header for Search Intent */}
      <span className="services-tag">Our Premium Offerings</span>
      <h2 className="services-main-title">We pride ourselves on our standard service.</h2>
      
      {/* Wave Accent Divider */}
      <div className="wave-divider">
        <svg width="40" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M0 4C2.5 1.5 5 1.5 7.5 4C10 6.5 12.5 6.5 15 4C17.5 1.5 20 1.5 22.5 4C25 6.5 27.5 6.5 30 4C32.5 1.5 35 1.5 37.5 4C40 6.5 42.5 6.5 45 4" stroke="#5ccbe9" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </svg>
      </div>

      {/* Main Responsive Grid Container */}
      <div className="services-grid">
        
        {/* Service 1: Water Trailers */}
        <div className="service-card">
          <div className="card-top-accent">
            <div className="card-image-container">
              <img src={imgCard1} alt="Bulk water trailers and tankers managed by Alka Drops in Bhubaneswar" />
            </div>
            <div className="card-icon-badge">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23 12h-2.11c-.41-1.16-1.51-2-2.82-2H15V4c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-3l2-3.14V12zm-17 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5 0.67 1.5 1.5-.67 1.5-1.5 1.5zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5 0.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
            </div>
          </div>
          <div className="card-body-content">
            <h3 className="card-title">Water Trailers</h3>
            <p className="card-description">
              High-capacity mobile distribution units engineered for construction projects, large corporate events, and emergency reserves. As the best water supplier in Odisha, we guarantee timely dispatch to keep your operations running smoothly.
            </p>
            <a href="#trailers" className="card-text-link" aria-label="Learn more about our water trailer solutions">
              <span className="arrow-icon">➤</span> READ MORE
            </a>
          </div>
        </div>

        {/* Service 2: Water Dispenser */}
        <div className="service-card">
          <div className="card-top-accent">
            <div className="card-image-container">
              <img src={imgCard2} alt="Premium hot and cold water dispensers setup for corporate offices in Odisha" />
            </div>
            <div className="card-icon-badge">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm4 12H8v-2h8v2zm0-3H8v-2h8v2z"/>
              </svg>
            </div>
          </div>
          <div className="card-body-content">
            <h3 className="card-title">Water Dispenser</h3>
            <p className="card-description">
              Sleek, modern climate-controlled purification units tailored specifically for corporate workspaces and residential living. Get immediate access to refreshing wellness water, backed by regular sanitary servicing from our technicians.
            </p>
            <a href="#dispensers" className="card-text-link" aria-label="Learn more about our water dispenser rentals and setups">
              <span className="arrow-icon">➤</span> READ MORE
            </a>
          </div>
        </div>

        {/* Service 3: Bottled Water */}
        <div className="service-card">
          <div className="card-top-accent">
            <div className="card-image-container">
              <img src={imgCard3} alt="Pure mineral bottled water manufactured by Alka Drops, the best Bhubaneswar water supplier" />
            </div>
            <div className="card-icon-badge">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2c-1.1 0-2 .9-2 2v1h4V4c0-1.1-.9-2-2-2zm3.33 7H8.67c-.37 0-.67.3-.67.67v9.67c0 .9.73 1.66 1.63 1.66h4.74c.9 0 1.63-.76 1.63-1.66V9.67c0-.37-.3-.67-.67-.67zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
              </svg>
            </div>
          </div>
          <div className="card-body-content">
            <h3 className="card-title">Bottled Water</h3>
            <p className="card-description">
              Perfectly sealed, mineral-rich everyday hydration batches. Recognized widely as the best Bhubaneswar water supplier, our packaged drinking water undergoes rigid multi-stage filtration checks to meet uncompromising safety protocols.
            </p>
            <a href="#bottles" className="card-text-link" aria-label="Learn more about our packaged mineral bottled water delivery">
              <span className="arrow-icon">➤</span> READ MORE
            </a>
          </div>
        </div>

      </div>

      {/* Main Central Read More Button */}
      <div className="global-action-wrapper">
        <button className="btn-global-more" onClick={() => window.location.href = '#all-services'}>
          READ MORE
        </button>
      </div>
    </section>
  );
};

export default HomeService;