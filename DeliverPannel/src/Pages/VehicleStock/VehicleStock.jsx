import React, { useState } from 'react';
import './VehicleStock.css';

const MOCK_STOCK = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  type: i % 3 === 0 ? "20L Jar" : i % 3 === 1 ? "15L Jar" : "10L Jar",
  quantity: (i + 1) * 5,
  returned: (i + 1) * 4,
}));

const VehicleStock = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(MOCK_STOCK.length / itemsPerPage);
  const currentData = MOCK_STOCK.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="stock-container">
      {/* Top Summary Card */}
      <div className="stock-summary-card">
        <div className="summary-row">
          <div>
            <p className="summary-label">Total Stock</p>
            <h2 className="summary-value">120 <span className="unit">Jars</span></h2>
          </div>
          <div>
            <p className="summary-label">Remaining</p>
            <h2 className="summary-value">48 <span className="unit">Jars</span></h2>
          </div>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: '40%' }}></div>
        </div>
      </div>

      {/* Stock Table */}
      <div className="stock-table-card">
        <h3 className="table-title">Stock by Type</h3>
        
        <div className="table-header">
          <span>Type</span>
          <span>Quantity</span>
          <span>Returned</span>
        </div>

        {currentData.map((item) => (
          <div key={item.id} className="table-row">
            <div className="type-cell">
              <div className="icon-circle">O</div>
              {item.type}
            </div>
            <span className="qty-cell">{item.quantity}</span>
            <span className="ret-cell">{item.returned}</span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button 
            key={i} 
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VehicleStock;