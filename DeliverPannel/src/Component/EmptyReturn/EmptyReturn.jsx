import React, { useState } from 'react';
import { FaPlus, FaMinus, FaEdit, FaTrashAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './EmptyReturn.css';
import jarRight from '../../assets/jar.jpg'; // Path matching your project setup

const EmptyReturn = () => {
  // --- Form State ---
  const [customerId, setCustomerId] = useState('');
  const [returnProduct, setReturnProduct] = useState('20L');
  const [returnQty, setReturnQty] = useState(1);
  const [condition, setCondition] = useState('Good');
  const [remarks, setRemarks] = useState('');
  
  // --- CRUD & Edit Mode State ---
  const [returnsList, setReturnsList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Handle Form Submit (Create or Update)
  const handleEmptyReturnSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update item logic
      setReturnsList(prevList =>
        prevList.map(item =>
          item.id === editId
            ? { ...item, customerId, productSize: returnProduct, quantity: returnQty, condition, remarks }
            : item
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      // Create item logic
      const newItem = {
        id: Date.now(),
        customerId,
        productSize: returnProduct,
        quantity: returnQty,
        condition,
        remarks: remarks || '-'
      };
      setReturnsList(prevList => [newItem, ...prevList]);
    }

    // Reset Form fields
    setCustomerId('');
    setReturnProduct('20L');
    setReturnQty(1);
    setCondition('Good');
    setRemarks('');
  };

  // Populate form fields for editing
  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item.id);
    setCustomerId(item.customerId);
    setReturnProduct(item.productSize);
    setReturnQty(item.quantity);
    setCondition(item.condition);
    setRemarks(item.remarks === '-' ? '' : item.remarks);
  };

  // Delete handler
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setReturnsList(prevList => prevList.filter(item => item.id !== id));
      // Adjust page view if current page becomes completely empty due to delete
      const totalPagesAfterDelete = Math.ceil((returnsList.length - 1) / itemsPerPage);
      if (currentPage > totalPagesAfterDelete && totalPagesAfterDelete > 0) {
        setCurrentPage(totalPagesAfterDelete);
      }
    }
  };

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = returnsList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(returnsList.length / itemsPerPage);

  return (
    <div className="empty-return-container full-page-view">
      <div className="empty-return-wrapper full-width-stack">
        
        {/* ================= CARD: EMPTY BOTTLE RETURN ================= */}
        <div className="empty-return-card full-size-card">
          <div className="empty-return-card-header">
            <h2 className="empty-return-title">Empty Bottle Return</h2>
          </div>

          <form onSubmit={handleEmptyReturnSubmit} className="empty-return-form-content">
            <div className="empty-return-form-left">
              
              <div className="empty-return-form-group">
                <label className="empty-return-label">Customer ID</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter Customer ID" 
                  className="empty-return-input"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                />
              </div>

              <div className="empty-return-form-group">
                <label className="empty-return-label">Product Name</label>
                <div className="empty-return-checkbox-group">
                  {['20L', '15L', '10L'].map((size) => (
                    <label key={size} className="empty-return-checkbox-label">
                      <input 
                        type="checkbox" 
                        className="empty-return-checkbox" 
                        checked={returnProduct === size}
                        onChange={() => setReturnProduct(size)}
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="empty-return-form-group">
                <label className="empty-return-label">Quantity</label>
                <div className="empty-return-counter">
                  <button 
                    type="button" 
                    className="empty-return-counter-btn"
                    onClick={() => setReturnQty(prev => Math.max(1, prev - 1))}
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="empty-return-counter-value">{returnQty}</span>
                  <button 
                    type="button" 
                    className="empty-return-counter-btn"
                    onClick={() => setReturnQty(prev => prev + 1)}
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>

              <div className="empty-return-form-group">
                <label className="empty-return-label">Condition</label>
                <div className="empty-return-radio-group">
                  {['Good', 'Not Returned', 'Average'].map((cond) => (
                    <label key={cond} className="empty-return-radio-label">
                      <input 
                        type="radio" 
                        name="condition"
                        value={cond}
                        className="empty-return-radio" 
                        checked={condition === cond}
                        onChange={(e) => setCondition(e.target.value)}
                      />
                      <span>{cond}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="empty-return-form-group">
                <label className="empty-return-label">Remarks (Optional)</label>
                <input 
                  type="text" 
                  placeholder="Enter remarks..." 
                  className="empty-return-input"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>

            </div>

            <div className="empty-return-form-right">
              <img src={jarRight} alt="Water Jar Return" className="empty-return-jar-img" />
            </div>

            <button type="submit" className={`empty-return-submit-btn blue-btn ${isEditing ? 'edit-mode-btn' : ''}`}>
              {isEditing ? 'Update Return Details' : 'Save Return'}
            </button>
          </form>
        </div>

        {/* ================= DATA TABLE SECTION ================= */}
        <div className="table-section-card">
          <h3 className="table-section-title">Return Records Logs</h3>
          <div className="table-responsive-wrapper">
            <table className="custom-data-table">
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Customer ID</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Condition</th>
                  <th>Remarks</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td><strong>{item.customerId}</strong></td>
                      <td>{item.productSize} Water Jar</td>
                      <td>{item.quantity}</td>
                      <td>
                        <span className={`status-badge cond-${item.condition.toLowerCase().replace(' ', '-')}`}>
                          {item.condition}
                        </span>
                      </td>
                      <td>{item.remarks}</td>
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
                    <td colSpan="7" className="empty-table-placeholder">
                      No matching records found. Submit entry records above.
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
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, returnsList.length)} of {returnsList.length} entries
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

export default EmptyReturn;