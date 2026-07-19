import React, { useState } from 'react';
import { FaPlus, FaMinus, FaEdit, FaTrashAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './ExtraStock.css';
import jarLeft from '../../assets/jar.jpg'; // Path matching your project setup

const ExtraStock = () => {
  // --- Form State ---
  const [extraProduct, setExtraProduct] = useState('20L');
  const [extraQty, setExtraQty] = useState(1);
  const [reason, setReason] = useState('Customer Requested');

  // --- CRUD & Edit Mode State ---
  const [stockList, setStockList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Pricing helper based on selected size
  const getPricePerJar = (size) => {
    if (size === '20L') return 80;
    if (size === '15L') return 60;
    return 40; // 10L
  };

  const currentTotalAmount = extraQty * getPricePerJar(extraProduct);

  // Handle Form Submit (Create or Update)
  const handleExtraStockSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update item logic
      setStockList(prevList =>
        prevList.map(item =>
          item.id === editId
            ? { 
                ...item, 
                productSize: extraProduct, 
                quantity: extraQty, 
                totalAmount: currentTotalAmount, 
                reason 
              }
            : item
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      // Create item logic
      const newItem = {
        id: Date.now(),
        productSize: extraProduct,
        quantity: extraQty,
        totalAmount: currentTotalAmount,
        reason
      };
      setStockList(prevList => [newItem, ...prevList]);
    }

    // Reset Form fields to defaults
    setExtraProduct('20L');
    setExtraQty(1);
    setReason('Customer Requested');
  };

  // Populate form fields for editing
  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item.id);
    setExtraProduct(item.productSize);
    setExtraQty(item.quantity);
    setReason(item.reason);
  };

  // Delete item logic
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this stock entry?')) {
      setStockList(prevList => prevList.filter(item => item.id !== id));
      
      // Safety adjustment for current page view window if deleted item leaves page blank
      const totalPagesAfterDelete = Math.ceil((stockList.length - 1) / itemsPerPage);
      if (currentPage > totalPagesAfterDelete && totalPagesAfterDelete > 0) {
        setCurrentPage(totalPagesAfterDelete);
      }
    }
  };

  // --- Pagination Logic Engine ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stockList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(stockList.length / itemsPerPage);

  return (
    <div className="extra-stock-container full-page-view">
      <div className="extra-stock-wrapper full-width-stack">
        
        {/* ================= CARD: ADD EXTRA STOCK ================= */}
        <div className="extra-stock-card full-size-card">
          <div className="extra-stock-card-header">
            <h2 className="extra-stock-title">Add Extra Stock</h2>
          </div>

          <form onSubmit={handleExtraStockSubmit} className="extra-stock-form-content">
            <div className="extra-stock-form-left">
              
              <div className="extra-stock-form-group">
                <label className="extra-stock-label">Product Size</label>
                <select 
                  className="extra-stock-select" 
                  value={extraProduct} 
                  onChange={(e) => setExtraProduct(e.target.value)}
                >
                  <option value="20L">20L Water Jar</option>
                  <option value="15L">15L Water Jar</option>
                  <option value="10L">10L Water Jar</option>
                </select>
              </div>

              <div className="extra-stock-form-group">
                <label className="extra-stock-label">Extra Jars</label>
                <div className="extra-stock-counter">
                  <button 
                    type="button" 
                    className="extra-stock-counter-btn"
                    onClick={() => setExtraQty(prev => Math.max(1, prev - 1))}
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="extra-stock-counter-value">{extraQty}</span>
                  <button 
                    type="button" 
                    className="extra-stock-counter-btn"
                    onClick={() => setExtraQty(prev => prev + 1)}
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>

              <div className="extra-stock-form-group">
                <label className="extra-stock-label">Total Amount</label>
                <div className="extra-stock-amount">₹{currentTotalAmount}</div>
              </div>

              <div className="extra-stock-form-group">
                <label className="extra-stock-label">Reason</label>
                <select 
                  className="extra-stock-select" 
                  value={reason} 
                  onChange={(e) => setReason(e.target.value)}
                >
                  <option value="Customer Requested">Customer Requested</option>
                  <option value="Event / Party">Event / Party</option>
                  <option value="Damaged Replacement">Damaged Replacement</option>
                </select>
              </div>

            </div>

            <div className="extra-stock-form-right">
              <img src={jarLeft} alt="Water Jar Extra Stock" className="extra-stock-jar-img" />
            </div>

            <button type="submit" className={`extra-stock-submit-btn blue-btn ${isEditing ? 'edit-mode-btn' : ''}`}>
              {isEditing ? 'Update Stock Details' : 'Add & Update Stock'}
            </button>
          </form>
        </div>

        {/* ================= DATA TABLE SECTION ================= */}
        <div className="table-section-card">
          <h3 className="table-section-title">Extra Stock Ledger Logs</h3>
          <div className="table-responsive-wrapper">
            <table className="custom-data-table">
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Product Size</th>
                  <th>Extra Jars</th>
                  <th>Total Amount</th>
                  <th>Reason</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td><strong>{item.productSize} Water Jar</strong></td>
                      <td>{item.quantity}</td>
                      <td>₹{item.totalAmount}</td>
                      <td>
                        <span className={`reason-badge reason-${item.reason.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                          {item.reason}
                        </span>
                      </td>
                      <td className="table-actions-cell">
                        <button 
                          className="action-btn edit-action" 
                          title="Edit"
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit size={14} />
                        </button>
                        <button 
                          className="action-btn delete-action" 
                          title="Delete"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="empty-table-placeholder">
                      No stock adjustments found. Add entries above to populate ledger.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="table-pagination-container">
              <span className="pagination-info-text">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, stockList.length)} of {stockList.length} entries
              </span>
              <div className="pagination-button-group">
                <button 
                  className="pagination-nav-btn" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                >
                  <FaChevronLeft size={10} /> Prev
                </button>
                {Array.from({ length: totalPages }, (_, idx) => (
                  <button
                    key={idx + 1}
                    className={`pagination-number-btn ${currentPage === idx + 1 ? 'active-page' : ''}`}
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button 
                  className="pagination-nav-btn" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                >
                  Next <FaChevronRight size={10} />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ExtraStock;