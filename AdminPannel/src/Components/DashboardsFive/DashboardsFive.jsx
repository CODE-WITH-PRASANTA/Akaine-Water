import React from 'react';
import './DashboardsFive.css';
 
const DashboardsFive = () => {
  // Config values matching the UI data
  const totalProperties = 78;
  
  // Percentages corresponding to visual arc filling (0 to 100 representing a full semi-circle)
  const redPercentage = 70;
  const greenPercentage = 55;
  const yellowPercentage = 80;
 
  // SVG Gauge parameters
  // Semi-circle path stroke math: Circumference = 2 * Math.PI * r. 
  // For a semi-circle track, we use half of that value for the stroke array.
  const radius1 = 90; // Outer track (Red)
  const radius2 = 78; // Middle track (Green)
  const radius3 = 66; // Inner track (Yellow)

  const calculateDashArray = (percentage, radius) => {
    const semiCircumference = Math.PI * radius;
    const filledLength = (percentage / 100) * semiCircumference;
    const emptyLength = semiCircumference - filledLength;
    // Format: "filled empty" with an explicit trailing gap to hide the bottom half of the circle
    return `${filledLength} ${emptyLength + semiCircumference}`;
  };

  return (
    <div className="dash-five-container">
      <div className="dash-five-card">
        
        {/* Header Area */}
        <div className="dash-five-header">
          <h2 className="dash-five-title">Sold out</h2>
          <button className="dash-five-link" aria-label="See details about sold out properties">
            See Details 
            <svg className="dash-five-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Multi-layered Gauge Visualization */}
        <div className="dash-five-visualization">
          <div className="gauge-wrapper">
            <svg viewBox="0 0 220 120" className="gauge-svg">
              
              {/* Outer Track (Red Group) */}
              <circle 
                cx="110" cy="110" r={radius1} 
                className="gauge-track-bg" 
                strokeDasharray={`${Math.PI * radius1} ${Math.PI * radius1}`}
              />
              <circle 
                cx="110" cy="110" r={radius1} 
                className="gauge-track-fill fill-red" 
                strokeDasharray={calculateDashArray(redPercentage, radius1)}
              />

              {/* Middle Track (Green Group) */}
              <circle 
                cx="110" cy="110" r={radius2} 
                className="gauge-track-bg" 
                strokeDasharray={`${Math.PI * radius2} ${Math.PI * radius2}`}
              />
              <circle 
                cx="110" cy="110" r={radius2} 
                className="gauge-track-fill fill-green" 
                strokeDasharray={calculateDashArray(greenPercentage, radius2)}
              />

              {/* Inner Track (Yellow Group) */}
              <circle 
                cx="110" cy="110" r={radius3} 
                className="gauge-track-bg" 
                strokeDasharray={`${Math.PI * radius3} ${Math.PI * radius3}`}
              />
              <circle 
                cx="110" cy="110" r={radius3} 
                className="gauge-track-fill fill-yellow" 
                strokeDasharray={calculateDashArray(yellowPercentage, radius3)}
              />
            </svg>

            {/* Centered Graphic and Metrics Content */}
            <div className="gauge-center-content">
              {/* Custom High-Fidelity House Icon SVG */}
              <svg className="center-house-icon" viewBox="0 0 64 64" fill="none">
                <path d="M8 32l24-22 24 22v24H8V32z" fill="#FFC107" />
                <path d="M44 14v10l8 7.3V14h-8z" fill="#E65100" />
                <path d="M4 30l28-25 28 25-3 3.5L32 9.2 7 33.5 4 30z" fill="#FF6D00" />
                <rect x="36" y="38" width="16" height="12" fill="#90CAF9" />
                <path d="M44 38v12M36 44h16" stroke="#1565C0" strokeWidth="2" />
                <path d="M16 36h12v20H16V36z" fill="#37474F" />
              </svg>
              <div className="center-text-group">
                <span className="center-metric-number">{totalProperties}</span>
                <span className="center-metric-label">Properties</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legend Metrics */}
        <div className="dash-five-legend">
          <div className="legend-item group-red">
            <div className="legend-label-row">
              <span className="legend-dot dot-red"></span>
              <span className="legend-value">10</span>
            </div>
            <span className="legend-caption">&gt; 20 Days</span>
          </div>

          <div className="legend-item group-green">
            <div className="legend-label-row">
              <span className="legend-dot dot-green"></span>
              <span className="legend-value">50</span>
            </div>
            <span className="legend-caption">21 - 40 Days</span>
          </div>

          <div className="legend-item group-yellow">
            <div className="legend-label-row">
              <span className="legend-dot dot-yellow"></span>
              <span className="legend-value">75</span>
            </div>
            <span className="legend-caption">41 - 80 Days</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardsFive;