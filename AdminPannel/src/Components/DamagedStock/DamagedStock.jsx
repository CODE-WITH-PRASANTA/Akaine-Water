import React, { useState } from 'react';
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

  const [tableData, setTableData] = useState([
    { reason: 'Broken', v20L: 30, v10L: 15, v5L: 10, v1L: 5, total: 60 },
    { reason: 'Leakage', v20L: 20, v10L: 10, v5L: 5, v1L: 3, total: 38 },
    { reason: 'Lost', v20L: 10, v10L: 5, v5L: 3, v1L: 2, total: 20 },
    { reason: 'Customer Damage', v20L: 10, v10L: 5, v5L: 2, v1L: 2, total: 19 },
  ]);

  // Modal State Control
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for Dropdowns & Manual Input Boxes
  const [formData, setFormData] = useState({
    brokenDropdown: '',
    brokenManual: '',
    leakageDropdown: '',
    leakageManual: '',
    lostDropdown: '',
    lostManual: '',
    customerDamageDropdown: '',
    customerDamageManual: ''
  });

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

  // Handle Form Change for Dropdowns & Text Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Form Submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Damaged Stock Entry Updated Successfully!');
    setIsModalOpen(false);
    setFormData({
      brokenDropdown: '',
      brokenManual: '',
      leakageDropdown: '',
      leakageManual: '',
      lostDropdown: '',
      lostManual: '',
      customerDamageDropdown: '',
      customerDamageManual: ''
    });
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
          
          {/* Header Action Buttons (Download + Add Button) */}
          <div className="dsc-header-actions">
            <button className="dsc-download-btn" onClick={handleDownload}>
              Download
            </button>

            {/* + Add Button */}
            <button className="dsc-add-btn" onClick={() => setIsModalOpen(true)} title="Add Damaged Stock">
              + Add
            </button>
          </div>
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

      {/* POPUP MODAL FORM */}
      {isModalOpen && (
        <div className="dsc-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="dsc-modal-container" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="dsc-modal-header">
              <h3>Add Damaged Stock Entry</h3>
              <button type="button" className="dsc-modal-close-btn" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="dsc-modal-form">
              
              {/* 1. Broken Section */}
              <div className="dsc-form-group">
                <label className="dsc-group-label">Broken</label>
                <div className="dsc-input-flex-row">
                  <select 
                    name="brokenDropdown" 
                    value={formData.brokenDropdown} 
                    onChange={handleInputChange}
                    className="dsc-select-input"
                  >
                    <option value="">Select Option</option>
                    <option value="30">30</option>
                    <option value="15">15</option>
                    <option value="10">10</option>
                    <option value="5">5</option>
                  </select>

                  <input 
                    type="number" 
                    name="brokenManual" 
                    placeholder="Enter manual count" 
                    value={formData.brokenManual} 
                    onChange={handleInputChange}
                    className="dsc-text-input" 
                  />
                </div>
              </div>

              {/* 2. Leakage Section */}
              <div className="dsc-form-group">
                <label className="dsc-group-label">Leakage</label>
                <div className="dsc-input-flex-row">
                  <select 
                    name="leakageDropdown" 
                    value={formData.leakageDropdown} 
                    onChange={handleInputChange}
                    className="dsc-select-input"
                  >
                    <option value="">Select Option</option>
                    <option value="20">20</option>
                    <option value="10">10</option>
                    <option value="5">5</option>
                    <option value="3">3</option>
                  </select>

                  <input 
                    type="number" 
                    name="leakageManual" 
                    placeholder="Enter manual count" 
                    value={formData.leakageManual} 
                    onChange={handleInputChange}
                    className="dsc-text-input" 
                  />
                </div>
              </div>

              {/* 3. Lost Section */}
              <div className="dsc-form-group">
                <label className="dsc-group-label">Lost</label>
                <div className="dsc-input-flex-row">
                  <select 
                    name="lostDropdown" 
                    value={formData.lostDropdown} 
                    onChange={handleInputChange}
                    className="dsc-select-input"
                  >
                    <option value="">Select Option</option>
                    <option value="10">10</option>
                    <option value="5">5</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                  </select>

                  <input 
                    type="number" 
                    name="lostManual" 
                    placeholder="Enter manual count" 
                    value={formData.lostManual} 
                    onChange={handleInputChange}
                    className="dsc-text-input" 
                  />
                </div>
              </div>

              {/* 4. Customer Damage Section */}
              <div className="dsc-form-group">
                <label className="dsc-group-label">Customer Damage</label>
                <div className="dsc-input-flex-row">
                  <select 
                    name="customerDamageDropdown" 
                    value={formData.customerDamageDropdown} 
                    onChange={handleInputChange}
                    className="dsc-select-input"
                  >
                    <option value="">Select Option</option>
                    <option value="10">10</option>
                    <option value="5">5</option>
                    <option value="2">2</option>
                  </select>

                  <input 
                    type="number" 
                    name="customerDamageManual" 
                    placeholder="Enter manual count" 
                    value={formData.customerDamageManual} 
                    onChange={handleInputChange}
                    className="dsc-text-input" 
                  />
                </div>
              </div>

              {/* Modal Footer Buttons */}
              <div className="dsc-modal-footer">
                <button type="button" className="dsc-modal-cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="dsc-modal-submit-btn">
                  Save Stock
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default DamagedStock;