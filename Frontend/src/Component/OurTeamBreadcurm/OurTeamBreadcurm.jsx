import React from "react";
import "./OurTeamBreadcurm.css";

const OurTeamBreadcurm = () => {
  const handleHomeClick = (e) => {
    e.preventDefault();
    window.location.href = "/";
    // If using react-router-dom:
    // navigate("/");
  };

  return (
    <div className="ourteam-banner-section">
      <div className="ourteam-banner-content">
        <h1 className="ourteam-main-title">Our Team</h1>

        <nav className="ourteam-breadcrumb-nav">
          <a
            href="/"
            onClick={handleHomeClick}
            className="ourteam-home-link"
          >
            Home
          </a>

          <span className="ourteam-breadcrumb-separator">//</span>

          <span className="ourteam-current-text">Our Team</span>
        </nav>
      </div>
    </div>
  );
};

export default OurTeamBreadcurm;