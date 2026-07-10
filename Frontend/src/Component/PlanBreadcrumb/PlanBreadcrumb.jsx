import React from 'react';
import './PlanBreadcrumb.css';
// Import your background image directly from your assets folder
import planBannerBg from '../../assets/W1.jpeg'; 

const PlanBreadcrumb = () => {
  return (
    <div className="PlanBreadcrumb-wrapper">
      
      {/* Invisible semantic SEO block for search engine indexing */}
      <section className="PlanBreadcrumb-seo-content">
        <h1>Alka Drops - Best Bhubaneswar Water Supplier</h1>
        <h2>Best Water Supplier in Odisha & Premium Wellness Water Provider</h2>
        <p>
          Discover affordable alkaline and pure wellness water subscription plans by Alka Drops. 
          As the leading water supplier in Bhubaneswar and throughout Odisha, we deliver healthy, 
          mineral-rich hydration solutions direct to your doorstep.
        </p>
      </section>

      {/* --- HERO BANNER BACKGROUND --- */}
      <div 
        className="PlanBreadcrumb-banner"
        style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${planBannerBg})` }}
      >
        {/* Dark blue bottom strip has been completely removed from here */}

        {/* Text and Nav Controls Container */}
        <div className="PlanBreadcrumb-container">
          <h2 className="PlanBreadcrumb-title">Pricing & Plans</h2>
          
          <div className="PlanBreadcrumb-navigation">
            <a href="/" className="PlanBreadcrumb-link-home">HOME</a>
            <span className="PlanBreadcrumb-divider">/</span>
            <span className="PlanBreadcrumb-link-current">PRICING & PLANS</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PlanBreadcrumb;