import React from 'react';
import './WhiteQuartzBreadcurm.css';

const WhiteQuartzBreadcurm = () => {

  const handleNavClick = (e, targetPath) => {
    e.preventDefault();
    window.location.href = targetPath; 
  };

  return (
    <div className="quartz-banner-wrapper">
      <div className="quartz-banner-overlay"></div>
      <div className="quartz-content-box">
        <h1 className="quartz-main-title">
          WHITE QUARTZ 2
        </h1>

        <nav className="quartz-breadcurmb-nav">
          <a 
            href="/" 
            onClick={(e) => handleNavClick(e, '/')}
            className="quartz-nav-link"
          >
            Home
          </a>
          <span className="quartz-breadcurmb-slash">/</span>
          
          <a 
            href="/product" 
            onClick={(e) => handleNavClick(e, '/product')}
            className="quartz-nav-link"
          >
            Product
          </a>
          <span className="quartz-breadcrumb-slash">/</span>
          
          <span className="quartz-current-page">White Quartz21</span>
        </nav>
      </div>
    </div>
  );
};

export default WhiteQuartzBreadcurm;