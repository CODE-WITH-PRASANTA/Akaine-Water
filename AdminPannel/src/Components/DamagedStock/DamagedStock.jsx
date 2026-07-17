import React from 'react';
import './DamagedStock.css';

const DamagedStock = () => {
  // Hardcoded data matching your image exactly
  const summaryCards = [
    { label: 'Total Damaged', value: '120', isRed: true },
    { label: 'Broken', value: '60' },
    { label: 'Leakage', value: '30' },
    { label: 'Lost', value: '20' },
    { label: 'Customer Damage', value: '10' },
  ];

  const tableData = [
    { reason: 'Broken', v20L: 30, v10L: 15, v5L: 10, v1L: 5, total: 60 },
    { reason: 'Leakage', v20L: 20, v10L: 10, v5L: 5, v1L: 3, total: 38 },
    { reason: 'Lost', v20L: 10, v10L: 5, v5L: 3, v1L: 2, total: 20 }, // Fixed duplicate v5L key
    { reason: 'Customer Damage', v20L: 10, v10L: 5, v5L: 2, v1L: 2, total: 19 },
  ];

  const handleViewReport = () => {
    alert('Loading full stock management report...');
  };

  return (
    <div className="dsc-fullscreen-wrapper">
      <div className="dsc-container">
        {/* Header Section */}
        <div className="dsc-header">
          <div className="dsc-badge">5.</div>
          <h2 className="dsc-title">DAMAGED STOCK MANAGEMENT</h2>
        </div>

        {/* Summary Cards Grid */}
        <div className="dsc-cards-grid">
          {summaryCards.map((card, index) => (
            <div className="dsc-card" key={index}>
              <span className="dsc-card-label">{card.label}</span>
              <span className={`dsc-card-value ${card.isRed ? 'text-red' : ''}`}>
                {card.value}
              </span>
            </div>
          ))}
        </div>

        {/* Responsive Table Wrapper */}
        <div className="dsc-table-responsive">
          <table className="dsc-table">
            <thead>
              <tr>
                <th className="text-left">Reason</th>
                <th>20L</th>
                <th>10L</th>
                <th>5L</th>
                <th>1L</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className="text-left font-semibold">{row.reason}</td>
                  <td>{row.v20L}</td>
                  <td>{row.v10L}</td>
                  <td>{row.v5L}</td>
                  <td>{row.v1L}</td>
                  <td className="text-right font-bold">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Button */}
        <div className="dsc-footer">
          <button className="dsc-btn" onClick={handleViewReport}>
            View Full Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default DamagedStock;