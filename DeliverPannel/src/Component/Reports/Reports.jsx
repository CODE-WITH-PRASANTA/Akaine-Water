import React from 'react';
import './Reports.css';

const Reports = () => {
  const data = {
    dateRange: "15 May 2025 - 15 May 2025",
    metrics: [
      { label: "Orders Assigned", value: 52 },
      { label: "Delivered", value: 49 },
      { label: "Pending", value: 3 },
      { label: "Extra Jars Sold", value: 8 },
    ],
    details: [
      { label: "Cash Collected", value: "₹14,850" },
      { label: "Online Payments", value: "₹8,200" },
      { label: "Empty Jars Returned", value: 47 },
      { label: "Remaining Stock", value: 23 },
    ]
  };

  return (
    <div className="rpt-container">
      <div className="rpt-card">
        {/* Date Header */}
        <div className="rpt-header">
          <span className="calendar-icon">📅</span>
          {data.dateRange}
        </div>

        {/* Top Metrics Grid */}
        <div className="rpt-metrics-grid">
          {data.metrics.map((item, idx) => (
            <div key={idx} className="rpt-metric-item">
              <p>{item.label}</p>
              <h3>{item.value}</h3>
            </div>
          ))}
        </div>

        {/* Detailed List */}
        <div className="rpt-details">
          {data.details.map((item, idx) => (
            <div key={idx} className="rpt-detail-row">
              <span>{item.label}</span>
              <span className="rpt-val">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Footer Button */}
        <button className="rpt-download-btn">Download Report</button>
      </div>
    </div>
  );
};

export default Reports;