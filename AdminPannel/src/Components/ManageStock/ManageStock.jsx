import React, { useState } from 'react';
import './ManageStock.css';

const initialStockData = [
  {
    id: 1,
    product: '20L Bottle',
    productCode: 'WB-20L-001',
    unit: 'Pcs',
    purchaseDate: '2026-07-01',
    opening: 500,
    received: 200,
    sold: 400,
    current: 100,
    supplierName: 'Pure Water Co.',
    purchasePrice: '50.00',
    sellingPrice: '80.00',
    storageLocation: 'Main Warehouse',
    remarks: 'Regular stock'
  },
  {
    id: 2,
    product: '30L Bottle',
    productCode: 'WB-30L-002',
    unit: 'Pcs',
    purchaseDate: '2026-07-02',
    opening: 300,
    received: 150,
    sold: 250,
    current: 100,
    supplierName: 'Aqua Supplies',
    purchasePrice: '70.00',
    sellingPrice: '110.00',
    storageLocation: 'Main Warehouse',
    remarks: ''
  },
  {
    id: 3,
    product: '1L Bottle',
    productCode: 'WB-1L-003',
    unit: 'Pcs',
    purchaseDate: '2026-07-05',
    opening: 120,
    received: 100,
    sold: 140,
    current: 80,
    supplierName: 'Local Distributor',
    purchasePrice: '10.00',
    sellingPrice: '20.00',
    storageLocation: 'Rack A',
    remarks: ''
  },
  {
    id: 4,
    product: '½ Bottle',
    productCode: 'WB-500-004',
    unit: 'Pcs',
    purchaseDate: '2026-07-08',
    opening: 80,
    received: 30,
    sold: 90,
    current: 20,
    supplierName: 'Local Distributor',
    purchasePrice: '5.00',
    sellingPrice: '10.00',
    storageLocation: 'Rack B',
    remarks: ''
  },
  {
    id: 5,
    product: '500ml Bottle',
    productCode: 'WB-500-005',
    unit: 'Pcs',
    purchaseDate: '2026-07-10',
    opening: 70,
    received: 20,
    sold: 10,
    current: 80,
    supplierName: 'Pure Water Co.',
    purchasePrice: '5.00',
    sellingPrice: '10.00',
    storageLocation: 'Rack C',
    remarks: ''
  }
];

const emptyFormData = {
  product: '',
  productCode: '',
  unit: '',
  purchaseDate: '',
  opening: '0',
  received: '0',
  sold: '0',
  current: '0',
  supplierName: '',
  purchasePrice: '',
  sellingPrice: '',
  storageLocation: '',
  remarks: ''
};

const ManageStock = () => {
  const [stockList, setStockList] = useState(initialStockData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(emptyFormData);

  // Metrics
  const totalOpening = stockList.reduce((sum, item) => sum + Number(item.opening || 0), 0);
  const totalReceived = stockList.reduce((sum, item) => sum + Number(item.received || 0), 0);
  const totalSold = stockList.reduce((sum, item) => sum + Number(item.sold || 0), 0);
  const totalCurrent = stockList.reduce((sum, item) => sum + Number(item.current || 0), 0);

  // Open Modal for Add Stock
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData(emptyFormData);
    setIsModalOpen(true);
  };

  // Open Modal when clicking Edit button (✏️)
  const handleEditClick = (item) => {
    setEditingItem(item);
    setFormData({
      product: item.product || '',
      productCode: item.productCode || '',
      unit: item.unit || 'Pcs',
      purchaseDate: item.purchaseDate || '',
      opening: item.opening || 0,
      received: item.received || 0,
      sold: item.sold || 0,
      current: item.current || 0,
      supplierName: item.supplierName || '',
      purchasePrice: item.purchasePrice || '',
      sellingPrice: item.sellingPrice || '',
      storageLocation: item.storageLocation || '',
      remarks: item.remarks || ''
    });
    setIsModalOpen(true); // Opens the popup form (2nd image style)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this stock product?')) {
      setStockList(stockList.filter(item => item.id !== id));
    }
  };

  // Auto-calculation of Current Stock = Opening + Received - Sold
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (['opening', 'received', 'sold'].includes(name)) {
        const op = Number(updated.opening || 0);
        const rec = Number(updated.received || 0);
        const s = Number(updated.sold || 0);
        updated.current = Math.max(0, op + rec - s);
      }
      return updated;
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formattedItem = {
      id: editingItem ? editingItem.id : Date.now(),
      product: formData.product,
      productCode: formData.productCode,
      unit: formData.unit || 'Pcs',
      purchaseDate: formData.purchaseDate,
      opening: Number(formData.opening || 0),
      received: Number(formData.received || 0),
      sold: Number(formData.sold || 0),
      current: Number(formData.current || 0),
      supplierName: formData.supplierName,
      purchasePrice: formData.purchasePrice,
      sellingPrice: formData.sellingPrice,
      storageLocation: formData.storageLocation,
      remarks: formData.remarks
    };

    if (editingItem) {
      setStockList(stockList.map(item => item.id === editingItem.id ? formattedItem : item));
    } else {
      setStockList([formattedItem, ...stockList]);
    }

    handleCloseModal();
  };

  const handleDownloadCSV = () => {
    const headers = ["Product", "Product Code", "Unit", "Opening", "Received", "Sold", "Current"];
    const rows = stockList.map(i => [
      `"${i.product}"`,
      `"${i.productCode || ''}"`,
      i.unit,
      i.opening,
      i.received,
      i.sold,
      i.current
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "water_stock_inventory.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="ms-dashboard-wrapper">
      
      {/* Top Header Bar */}
      <div className="ms-top-bar">
        <div className="ms-title-badge">
          STOCK MANAGEMENT & FRESH WATER STOCK
        </div>
        <div className="ms-action-buttons-group">
          <button type="button" className="ms-btn-csv" onClick={handleDownloadCSV}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download CSV
          </button>
          
          <button type="button" className="ms-btn-add-stock" onClick={handleOpenAddModal}>
            + Add Stock
          </button>
        </div>
      </div>

      {/* Metric Summary Cards Grid */}
      <div className="ms-metrics-grid">
        <div className="ms-metric-card">
          <span className="ms-metric-label">Opening Stock</span>
          <span className="ms-metric-value">{totalOpening.toLocaleString()}</span>
        </div>
        <div className="ms-metric-card">
          <span className="ms-metric-label">Received Stock</span>
          <span className="ms-metric-value">{totalReceived.toLocaleString()}</span>
        </div>
        <div className="ms-metric-card">
          <span className="ms-metric-label">Sold Stock</span>
          <span className="ms-metric-value">{totalSold.toLocaleString()}</span>
        </div>
        <div className="ms-metric-card ms-metric-card-current">
          <span className="ms-metric-label">Current Stock</span>
          <span className="ms-metric-value ms-red-text">{totalCurrent.toLocaleString()}</span>
        </div>
      </div>

      {/* Main Stock Table */}
      <div className="ms-table-container-card">
        <div className="ms-table-responsive-view">
          <table className="ms-custom-table">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>OPENING</th>
                <th>RECEIVED</th>
                <th>SOLD</th>
                <th>CURRENT</th>
                <th>UNIT</th>
                <th className="ms-text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {stockList.map((item) => (
                <tr key={item.id}>
                  <td className="ms-font-bold">{item.product}</td>
                  <td>{item.opening}</td>
                  <td>{item.received}</td>
                  <td>{item.sold}</td>
                  <td className="ms-font-bold">{item.current}</td>
                  <td>{item.unit}</td>
                  <td>
                    <div className="ms-actions-flex">
                      {/* EDIT BUTTON TRGGERING POPUP FORM */}
                      <button 
                        type="button" 
                        className="ms-action-icon ms-btn-edit" 
                        onClick={() => handleEditClick(item)}
                        title="Edit Product"
                      >
                        ✏️
                      </button>
                      <button 
                        type="button" 
                        className="ms-action-icon ms-btn-delete" 
                        onClick={() => handleDeleteClick(item.id)}
                        title="Delete Product"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {stockList.length === 0 && (
                <tr>
                  <td colSpan="7" className="ms-empty-row">
                    No stock data found. Click "+ Add Stock" to insert items.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="ms-footer-action-row">
        <button type="button" className="ms-btn-full-report" onClick={() => alert('Loading complete inventory statement...')}>
          View Full Stock Report
        </button>
      </div>

      {/* POPUP MODAL (Opens for both Add & Edit actions) */}
      {isModalOpen && (
        <div className="ms-modal-overlay" onClick={handleCloseModal}>
          <div className="ms-modal-dialog" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="ms-modal-header">
              <div className="ms-modal-header-title">
                <div className="ms-water-icon-circle">🚰</div>
                <h3>{editingItem ? 'Edit Water Stock' : 'Add New Water Stock'}</h3>
              </div>
              <button type="button" className="ms-modal-close-x" onClick={handleCloseModal}>
                &times;
              </button>
            </div>

            {/* Modal Form Structure matching image_12af1f.png */}
            <form onSubmit={handleFormSubmit} className="ms-modal-form-body">
              
              <div className="ms-form-grid-4col">
                
                {/* Row 1 */}
                <div className="ms-form-group">
                  <label>Product Name <span className="ms-required">*</span></label>
                  <input 
                    type="text" 
                    name="product" 
                    required 
                    placeholder="e.g. 20L Bottle" 
                    value={formData.product} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="ms-form-group">
                  <label>Product Code / SKU</label>
                  <input 
                    type="text" 
                    name="productCode" 
                    placeholder="e.g. WB-20L-001" 
                    value={formData.productCode} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="ms-form-group">
                  <label>Unit <span className="ms-required">*</span></label>
                  <select name="unit" required value={formData.unit} onChange={handleInputChange}>
                    <option value="" disabled>Select Unit</option>
                    <option value="Pcs">Pcs</option>
                    <option value="Box">Box</option>
                    <option value="Ltr">Ltr</option>
                  </select>
                </div>

                <div className="ms-form-group">
                  <label>Purchase Date</label>
                  <input 
                    type="date" 
                    name="purchaseDate" 
                    value={formData.purchaseDate} 
                    onChange={handleInputChange} 
                  />
                </div>

                {/* Row 2 */}
                <div className="ms-form-group">
                  <label>Opening Stock <span className="ms-required">*</span></label>
                  <input 
                    type="number" 
                    name="opening" 
                    min="0" 
                    placeholder="0" 
                    value={formData.opening} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="ms-form-group">
                  <label>Received Stock <span className="ms-required">*</span></label>
                  <input 
                    type="number" 
                    name="received" 
                    min="0" 
                    placeholder="0" 
                    value={formData.received} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="ms-form-group">
                  <label>Sold Stock <span className="ms-required">*</span></label>
                  <input 
                    type="number" 
                    name="sold" 
                    min="0" 
                    placeholder="0" 
                    value={formData.sold} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="ms-form-group">
                  <label>Current Stock (Auto)</label>
                  <input 
                    type="number" 
                    name="current" 
                    readOnly 
                    className="ms-readonly-input" 
                    value={formData.current} 
                  />
                </div>

                {/* Row 3 */}
                <div className="ms-form-group">
                  <label>Supplier Name</label>
                  <input 
                    type="text" 
                    name="supplierName" 
                    placeholder="Enter supplier name" 
                    value={formData.supplierName} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="ms-form-group">
                  <label>Purchase Price (₹)</label>
                  <input 
                    type="text" 
                    name="purchasePrice" 
                    placeholder="0.00" 
                    value={formData.purchasePrice} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="ms-form-group">
                  <label>Selling Price (₹)</label>
                  <input 
                    type="text" 
                    name="sellingPrice" 
                    placeholder="0.00" 
                    value={formData.sellingPrice} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="ms-form-group">
                  <label>Storage Location</label>
                  <input 
                    type="text" 
                    name="storageLocation" 
                    placeholder="e.g. Main Warehouse" 
                    value={formData.storageLocation} 
                    onChange={handleInputChange} 
                  />
                </div>

                {/* Row 4 - Full Width Remarks */}
                <div className="ms-form-group ms-full-width-cell">
                  <label>Remarks</label>
                  <textarea 
                    name="remarks" 
                    rows="3" 
                    placeholder="Enter any additional notes here..." 
                    value={formData.remarks} 
                    onChange={handleInputChange}
                  ></textarea>
                </div>

              </div>

              {/* Modal Footer Buttons */}
              <div className="ms-modal-footer">
                <button type="button" className="ms-btn-cancel" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="ms-btn-submit">
                  💾 {editingItem ? 'Save Changes' : 'Add Product'}
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