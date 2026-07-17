import React from 'react';
import './Dashboardfourth.css';

// --- Image Imports ---
// Replace these paths with the actual paths to your image assets
import orchardImg from '../../assets/image 1.jpg';
import neverlandImg from '../../assets/image2.jpg';
import seaBreezesImg from '../../assets/image 3.jpg';

// --- File Icon Imports ---
// Replace these paths with the actual icons (from screenshot 2) saved in your project
import pdfIconImg from '../../assets/pdf.png';
import wordIconImg from '../../assets/microsoft.png';
import excelIconImg from '../../assets/excel.png';

// SVG Icons for the property specifications
const BedIcon = () => (
  <svg className="spec-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm12-3h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4zm2 9H3v-2h18v2z"/>
  </svg>
);

const BathIcon = () => (
  <svg className="spec-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm10 5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-3.5 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM22 12v 9c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1v-1H6v1c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1v-9c0-2.76 2.24-5 5-5h1v-2c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2h1c2.76 0 5 2.24 5 5zM4 13h16c0-1.65-1.35-3-3-3H7c-1.65 0-3 1.35-3 3zm16 2H4v3h16v-3z"/>
  </svg>
);

const SofaIcon = () => (
  <svg className="spec-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 11v4c0 1.66-1.34 3-3 3h-1v2H5v-2H4c-1.66 0-3-1.34-3-3v-4c0-1.66 1.34-3 3-3h16c1.66 0 3 1.34 3 3zm-2 0c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4zM6 6h12v2H6V6z"/>
  </svg>
);

// Download Action Icon
const DownloadIcon = () => (
  <svg className="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// File Extension Render Component using Image paths
const FileIcon = ({ type }) => {
  let iconSrc;
  let altText;

  if (type === 'pdf') {
    iconSrc = pdfIconImg;
    altText = 'PDF document icon';
  } else if (type === 'word') {
    iconSrc = wordIconImg;
    altText = 'Word document icon';
  } else if (type === 'excel') {
    iconSrc = excelIconImg;
    altText = 'Excel document icon';
  }

  return (
    <div className="report-file-icon-wrapper">
      <img src={iconSrc} alt={altText} className="report-file-img" />
    </div>
  );
};

const Dashboardfourth = () => {
  // Mock function to simulate download execution
  const handleDownload = (reportName) => {
    alert(`Downloading: ${reportName}`);
  };

  return (
    <div className="dashboard-fourth-container">
      
      {/* 1st Section: My Properties */}
      <div className="dashboard-card properties-card">
        <div className="card-header">
          <h2 className="card-title">My properties</h2>
          <button className="btn-add-new">+ New</button>
        </div>

        <div className="card-content property-list">
          {/* Property 1 */}
          <div className="property-item">
            <div className="property-image-wrapper">
              <img src={orchardImg} alt="Orchard House" className="property-display-img" />
            </div>
            <div className="property-details">
              <h3 className="property-name">Orchard House</h3>
              <div className="property-specs">
                <span><BedIcon /> 3</span>
                <span><BathIcon /> 2</span>
                <span><SofaIcon /> 1</span>
              </div>
              <div className="status-container">
                <span className="status-label">Status:</span>
                <span className="badge status-rented">Rented</span>
              </div>
            </div>
          </div>

          {/* Property 2 */}
          <div className="property-item">
            <div className="property-image-wrapper">
              <img src={neverlandImg} alt="Neverland" className="property-display-img" />
            </div>
            <div className="property-details">
              <h3 className="property-name">Neverland</h3>
              <div className="property-specs">
                <span><BedIcon /> 4</span>
                <span><BathIcon /> 4</span>
                <span><SofaIcon /> 2</span>
              </div>
              <div className="status-container">
                <span className="status-label">Status:</span>
                <span className="badge status-rented">Rented</span>
              </div>
            </div>
          </div>

          {/* Property 3 */}
          <div className="property-item">
            <div className="property-image-wrapper">
              <img src={seaBreezesImg} alt="Sea Breezes" className="property-display-img" />
            </div>
            <div className="property-details">
              <h3 className="property-name">Sea Breezes</h3>
              <div className="property-specs">
                <span><BedIcon /> 3</span>
                <span><BathIcon /> 2</span>
                <span><SofaIcon /> 0</span>
              </div>
              <div className="status-container">
                <span className="status-label">Status:</span>
                <span className="badge status-listed">Listed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2nd Section: Management Reports */}
      <div className="dashboard-card reports-card">
        <div className="card-header">
          <h2 className="card-title">Management Reports</h2>
        </div>

        <div className="card-content reports-list">
          {/* Report 1 */}
          <div className="report-item">
            <div className="report-info-group">
              <FileIcon type="pdf" />
              <div className="report-meta">
                <span className="report-title">Report 8/10/22 - 15/10/22</span>
                <span className="report-date">Created 16/10/22</span>
              </div>
            </div>
            <button 
              className="btn-download" 
              onClick={() => handleDownload('Report 8/10/22 - 15/10/22')}
              aria-label="Download report"
            >
              <DownloadIcon />
            </button>
          </div>

          {/* Report 2 */}
          <div className="report-item">
            <div className="report-info-group">
              <FileIcon type="word" />
              <div className="report-meta">
                <span className="report-title">Report 20/10/22 - 25/10/22</span>
                <span className="report-date">Created 24/10/22</span>
              </div>
            </div>
            <button 
              className="btn-download" 
              onClick={() => handleDownload('Report 20/10/22 - 25/10/22')}
              aria-label="Download report"
            >
              <DownloadIcon />
            </button>
          </div>

          {/* Report 3 */}
          <div className="report-item">
            <div className="report-info-group">
              <FileIcon type="excel" />
              <div className="report-meta">
                <span className="report-title">Report 30/10/22 - 5/11/22</span>
                <span className="report-date">Created 1/11/22</span>
              </div>
            </div>
            <button 
              className="btn-download" 
              onClick={() => handleDownload('Report 30/10/22 - 5/11/22')}
              aria-label="Download report"
            >
              <DownloadIcon />
            </button>
          </div>

          {/* Report 4 */}
          <div className="report-item">
            <div className="report-info-group">
              <FileIcon type="pdf" />
              <div className="report-meta">
                <span className="report-title">Report 10/11/22 - 15/11/22</span>
                <span className="report-date">Created 17/11/22</span>
              </div>
            </div>
            <button 
              className="btn-download" 
              onClick={() => handleDownload('Report 10/11/22 - 15/11/22')}
              aria-label="Download report"
            >
              <DownloadIcon />
            </button>
          </div>

          {/* Report 5 */}
          <div className="report-item">
            <div className="report-info-group">
              <FileIcon type="excel" />
              <div className="report-meta">
                <span className="report-title">Report 20/11/22 - 25/11/22</span>
                <span className="report-date">Created 28/11/22</span>
              </div>
            </div>
            <button 
              className="btn-download" 
              onClick={() => handleDownload('Report 20/11/22 - 25/11/22')}
              aria-label="Download report"
            >
              <DownloadIcon />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboardfourth;