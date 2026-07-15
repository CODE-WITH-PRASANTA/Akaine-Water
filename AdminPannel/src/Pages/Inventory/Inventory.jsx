import React from 'react';
import './Inventory.css';

const Inventory = () => {
  // Mock data built to match the metrics panel precisely
  const metricsData = [
    { label: 'Calibrated', value: '1,200', modifier: 'calibrated' },
    { label: 'Washed', value: '950', modifier: 'washed' },
    { label: 'Ready', value: '800', modifier: 'ready' },
    { label: 'Broken', value: '1200', modifier: 'broken' }, // Text matching raw data values
    { label: 'Missing', value: '40', modifier: 'missing' }
  ];

  // Mock data matching the table layout rows precisely
  const inventoryRows = [
    { size: '20L Bottle', opening: 500, sealed: 400, broken: 310, current: 90, used: 10 },
    { size: '10L Bottle', opening: 400, sealed: 300, broken: 250, current: 50, used: 10 },
    { size: '5L Bottle',  opening: 200, sealed: 160, broken: 120, current: 30, used: 10 },
    { size: '1L Bottle',  opening: 70,  sealed: 50,  broken: 30,  current: 20, used: 10 },
  ];

  const handleViewReport = () => {
    alert('Navigating to full inventory analytical statement panel...');
  };

  return (
    <div className="inv-dashboard">
      
      {/* Upper Metrics Card Counters Grid Layout */}
      <div className="inv-metrics-grid">
        {metricsData.map((metric, idx) => (
          <div key={idx} className="inv-metric-card">
            <span className="inv-metric-card__label">{metric.label}</span>
            <span className={`inv-metric-card__value inv-metric-card__value--${metric.modifier}`}>
              {metric.value}
            </span>
          </div>
        ))}
      </div>

      {/* Main Stock Allocation Breakdown Table Card Section */}
      <div className="inv-content-card">
        <div className="inv-table-responsive">
          <table className="inv-table">
            <thead>
              <tr>
                <th>Bottle Size</th>
                <th>Opening</th>
                <th>Sealed</th>
                <th>Broken</th>
                <th>Current</th>
                <th>Used</th>
              </tr>
            </thead>
            <tbody>
              {inventoryRows.map((row, index) => (
                <tr key={index} className="inv-table__row">
                  <td className="inv-cell-title">{row.size}</td>
                  <td>{row.opening}</td>
                  <td>{row.sealed}</td>
                  <td>{row.broken}</td>
                  <td className="inv-cell-highlight">{row.current}</td>
                  <td>{row.used}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Call To Action Block Trigger Banner */}
        <div className="inv-footer-action">
          <button 
            type="button" 
            className="inv-footer-action__btn"
            onClick={handleViewReport}
          >
            View Full Report
          </button>
        </div>
      </div>

    </div>
  );
};

export default Inventory;