import React from "react";
import "./AkaineGalaryBreadcurm.css";

const AkaineGalaryBreadcurm = () => {
  const handleHomeClick = (e) => {
    e.preventDefault();
    window.location.href = "/";
    // If using react-router-dom:
    // navigate("/");
  };

  return (
    <div className="galary-banner-section">
      <div className="galary-banner-content">
        <h1 className="galary-main-title">Gallery</h1>

        <nav className="galary-breadcrumb-nav">
          <a
            href="/"
            onClick={handleHomeClick}
            className="galary-home-link"
          >
            Home
          </a>

          <span className="galary-breadcrumb-separator">//</span>

          <span className="galary-current-text">Gallery</span>
        </nav>
      </div>
    </div>
  );
};

export default AkaineGalaryBreadcurm;