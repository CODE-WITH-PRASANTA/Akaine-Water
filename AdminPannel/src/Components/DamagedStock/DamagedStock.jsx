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

  // कार्यशील डाउनलोड हैंडलर फ़ंक्शन
  const handleDownload = () => {
    if (tableData.length === 0) {
      alert("No data available to download!");
      return;
    }

    const headers = ['Reason', '20L', '10L', '5L', '1L', 'Total'];
    const rows = tableData.map(row => [
      row.reason,
      row.v20L,
      row.v10L,
      row.v5L,
      row.v1L,
      row.total
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'Damaged_Stock_Report.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dsc-fullscreen-wrapper">
      <div className="dsc-container">
        {/* Header Section */}
        <div className="dsc-header">
          <div className="dsc-header-left">
            <div className="dsc-badge">5.</div>
            <h2 className="dsc-title">DAMAGED STOCK MANAGEMENT</h2>
          </div>
          {/* वर्किंग डाउनलोड बटन */}
          <button className="dsc-download-btn" onClick={handleDownload}>
            Download
          </button>
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