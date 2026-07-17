import React, { useState } from 'react';
import './ManageStock.css'; // Importing the custom stylesheet

const ManageStock = () => {
  // Initial state mimicking the image data
  const [stockList, setStockList] = useState([
    { id: 1, product: '20L Bottle', opening: 500, received: 200, sold: 400, current: 100, unit: 'Pcs' },
    { id: 2, product: '30L Bottle', opening: 300, received: 150, sold: 250, current: 100, unit: 'Pcs' },
    { id: 3, product: '1L Bottle', opening: 120, received: 100, sold: 140, current: 80, unit: 'Pcs' },
    { id: 4, product: '½ Bottle', opening: 80, received: 30, sold: 90, current: 20, unit: 'Pcs' },
    { id: 5, product: '500ml Bottle', opening: 70, received: 20, sold: 10, current: 80, unit: 'Pcs' },
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    product: '',
    opening: '',
    received: '',
    sold: '',
    current: '',
    unit: 'Pcs'
  });

  // Calculate dynamic totals for the summary cards
  const totals = stockList.reduce(
    (acc, item) => {
      acc.opening += Number(item.opening) || 0;
      acc.received += Number(item.received) || 0;
      acc.sold += Number(item.sold) || 0;
      acc.current += Number(item.current) || 0;
      return acc;
    },
    { opening: 0, received: 0, sold: 0, current: 0 }
  );

  // Open modal for adding new item
  const handleAddClick = (e) => {
    e.preventDefault();
    setEditingItem(null);
    setFormData({ product: '', opening: '', received: '', sold: '', current: '', unit: 'Pcs' });
    setIsModalOpen(true);
  };

  // Open modal for editing an existing item
  const handleEditClick = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  // Delete an item
  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setStockList(stockList.filter(item => item.id !== id));
    }
  };

  // Handle Form Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit Add / Edit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.product.trim()) return;

    const formattedData = {
      ...formData,
      opening: Number(formData.opening) || 0,
      received: Number(formData.received) || 0,
      sold: Number(formData.sold) || 0,
      current: Number(formData.current) || 0,
    };

    if (editingItem) {
      setStockList(stockList.map(item => item.id === editingItem.id ? { ...formattedData, id: editingItem.id } : item));
    } else {
      const newItem = {
        ...formattedData,
        id: Date.now()
      };
      setStockList([...stockList, newItem]);
    }

    setIsModalOpen(false);
  };

  // CSV डाउनलोड करने का वर्किंग फंक्शन
  const handleDownloadCSV = () => {
    const headers = ['Product', 'Opening', 'Received', 'Sold', 'Current', 'Unit'];
    
    const csvRows = stockList.map(item => 
      [
        `"${item.product}"`, 
        item.opening, 
        item.received, 
        item.sold, 
        item.current, 
        item.unit
      ].join(',')
    );
    
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'stock_report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="stock-container-wrapper">
      {/* Main Stock Card Container */}
      <div className="stock-card">
        
        {/* Header Section */}
        <div className="stock-header">
          <div className="stock-title-badge">
              STOCK MANAGEMENT & FRESH WATER STOCK
          </div>
          
          {/* राइट साइड एक्शन बटन्स कंटेनर */}
          <div className="stock-header-actions">
            <button 
              type="button" 
              className="btn-download-csv"
              onClick={handleDownloadCSV}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="download-btn-icon">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CSV
            </button>

            <button type="button" onClick={handleAddClick} className="btn-add-stock">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Stock
            </button>
          </div>
        </div>

        <div className="stock-body">
          
          {/* Summary Cards Grid */}
          <div className="summary-grid">
            
            <div className="summary-card">
              <span className="summary-label">Opening Stock</span>
              <span className="summary-value">{totals.opening.toLocaleString()}</span>
            </div>

            <div className="summary-card">
              <span className="summary-label">Received Stock</span>
              <span className="summary-value">{totals.received.toLocaleString()}</span>
            </div>

            <div className="summary-card">
              <span className="summary-label">Sold Stock</span>
              <span className="summary-value">{totals.sold.toLocaleString()}</span>
            </div>

            <div className="summary-card current-stock-card">
              <span className="summary-label">Current Stock</span>
              <span className="summary-value red-text">{totals.current.toLocaleString()}</span>
            </div>

          </div>

          {/* Table Container */}
          <div className="table-wrapper">
            <table className="stock-table">
              <thead>
                <tr>
                  <th className="text-left">Product</th>
                  <th className="text-center">Opening</th>
                  <th className="text-center">Received</th>
                  <th className="text-center">Sold</th>
                  <th className="text-center">Current</th>
                  <th className="text-center">Unit</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stockList.map((item) => (
                  <tr key={item.id}>
                    <td className="text-left product-name">{item.product}</td>
                    <td className="text-center value-cell">{item.opening}</td>
                    <td className="text-center value-cell">{item.received}</td>
                    <td className="text-center value-cell">{item.sold}</td>
                    <td className="text-center value-cell current-value">{item.current}</td>
                    <td className="text-center unit-cell">{item.unit}</td>
                    <td className="text-right actions-cell">
                      <div className="actions-group">
                        <button type="button" onClick={() => handleEditClick(item)} className="btn-action edit" title="Edit">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button type="button" onClick={() => handleDeleteClick(item.id)} className="btn-action delete" title="Delete">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {stockList.length === 0 && (
                  <tr>
                    <td colSpan="7" className="empty-row">
                      No products available. Add a product to get started!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Centered Footer Action Button */}
          <div className="footer-action">
            <button type="button" className="btn-view-report">
              View Full Stock Report
            </button>
          </div>

        </div>
      </div>

      {/* Pop-up Modal Form */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <h3>{editingItem ? 'Edit Product Stock' : 'Add New Water Stock'}</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="btn-modal-close">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Product Name</label>
                <input 
                  type="text" 
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 20L Bottle, 1L Bottle"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Opening Stock</label>
                  <input 
                    type="number" 
                    name="opening"
                    value={formData.opening}
                    onChange={handleChange}
                    min="0"
                    placeholder="0"
                  />
                </div>
                <div className="form-group">
                  <label>Received Stock</label>
                  <input 
                    type="number" 
                    name="received"
                    value={formData.received}
                    onChange={handleChange}
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Sold Stock</label>
                  <input 
                    type="number" 
                    name="sold"
                    value={formData.sold}
                    onChange={handleChange}
                    min="0"
                    placeholder="0"
                  />
                </div>
                <div className="form-group">
                  <label>Current Stock</label>
                  <input 
                    type="number" 
                    name="current"
                    value={formData.current}
                    onChange={handleChange}
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Unit</label>
                <select name="unit" value={formData.unit} onChange={handleChange}>
                  <option value="Pcs">Pcs</option>
                  <option value="Box">Box</option>
                  <option value="Ltr">Ltr</option>
                </select>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingItem ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStock;