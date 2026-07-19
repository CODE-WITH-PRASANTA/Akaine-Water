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

  // CSV डाउनलोड करने का वर्किंग फंक्शन
  const handleDownloadCSV = () => {
    // CSV Headers
    const headers = ['Bottle Size', 'Opening', 'Sealed', 'Broken', 'Current', 'Used'];
    
    // Rows को CSV फॉर्मेट में बदलना
    const csvRows = inventoryRows.map(row => 
      [row.size, row.opening, row.sealed, row.broken, row.current, row.used].join(',')
    );
    
    // Headers और Rows को एक साथ जोड़ना
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    
    // Blob बनाना और डाउनलोड लिंक ट्रिगर करना
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'inventory_report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="inv-dashboard">
      
      {/* ऊपरी दाएं कोने में वर्किंग डाउनलोड बटन */}
      <div className="inv-header-actions">
        <button 
          type="button" 
          className="inv-download-btn"
          onClick={handleDownloadCSV}
        >
          <svg className="inv-download-btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download CSV
        </button>
      </div>
      
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