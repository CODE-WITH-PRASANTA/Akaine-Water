import React, { useState } from 'react';
import { Plus, X, AlertTriangle, CheckCircle, Package, Edit, Trash2 } from 'lucide-react';
import './ManageStock.css';

const ManageStock = () => {
  // Mock data matching the layout columns in the reference image
  const [stockData, setStockData] = useState([
    { id: 1, product: '20L Jar', available: 450, reserved: 90, isLow: false },
    { id: 2, product: '10L Jar', available: 120, reserved: 20, isLow: true },
    { id: 3, product: '1L Bottle', available: 980, reserved: 120, isLow: false },
    { id: 4, product: '500ml', available: 2200, reserved: 350, isLow: false },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    product: '',
    available: '',
    reserved: '',
    lowStockThreshold: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Evaluate if the item falls under a low stock condition automatically
    const availableNum = parseInt(formData.available) || 0;
    const thresholdNum = parseInt(formData.lowStockThreshold) || 100;
    const isLowStock = availableNum <= thresholdNum;

    const newStockItem = {
      id: Date.now(),
      product: formData.product,
      available: availableNum,
      reserved: parseInt(formData.reserved) || 0,
      isLow: isLowStock
    };

    setStockData([...stockData, newStockItem]);
    setIsModalOpen(false);
    
    // Reset Form Fields
    setFormData({ product: '', available: '', reserved: '', lowStockThreshold: '' });
  };

  return (
    <div className="manage-stock-container">
      
      {/* Table Action Header Section */}
      <div className="manage-stock-header">
        <div className="header-title-wrapper">
          <Package className="header-icon" />
          <h2>Stock Management</h2>
        </div>
        <button className="add-stock-btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          <span>Add New Stock</span>
        </button>
      </div>

      {/* Main Stock Data Table Component Layout */}
      <div className="manage-stock-table-wrapper">
        <table className="manage-stock-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Available</th>
              <th>Reserved</th>
              <th>Low Stock Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((item) => (
              <tr key={item.id}>
                <td className="product-name-cell">{item.product}</td>
                <td>{item.available}</td>
                <td>{item.reserved}</td>
                <td>
                  {item.isLow ? (
                    <span className="status-indicator low-alert">
                      <AlertTriangle size={14} /> Low Stock Alert ⚠️
                    </span>
                  ) : (
                    <span className="status-indicator optimal-alert">
                      <CheckCircle size={14} /> Normal ❌
                    </span>
                  )}
                </td>
                <td className="actions-cell">
                  <button className="table-action-icon edit-btn" title="Edit Item"><Edit size={16} /></button>
                  <button className="table-action-icon delete-btn" title="Delete Item"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dynamic Pop-up Form Modal Component Overlay */}
      {isModalOpen && (
        <div className="manage-stock-modal-overlay">
          <div className="manage-stock-modal-card">
            <div className="modal-card-header">
              <h3>Create New Stock Entry</h3>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="product">Product Name / Description</label>
                <input 
                  type="text" 
                  id="product"
                  name="product" 
                  placeholder="e.g., 20L Jar, 2L Bottle"
                  value={formData.product} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="available">Initial Quantity Available</label>
                  <input 
                    type="number" 
                    id="available"
                    name="available" 
                    placeholder="0"
                    value={formData.available} 
                    onChange={handleInputChange} 
                    min="0"
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reserved">Quantity Reserved</label>
                  <input 
                    type="number" 
                    id="reserved"
                    name="reserved" 
                    placeholder="0"
                    value={formData.reserved} 
                    onChange={handleInputChange} 
                    min="0"
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="lowStockThreshold">Low Stock Alert Trigger Threshold</label>
                <input 
                  type="number" 
                  id="lowStockThreshold"
                  name="lowStockThreshold" 
                  placeholder="Alert when stock falls below this value"
                  value={formData.lowStockThreshold} 
                  onChange={handleInputChange} 
                  min="0"
                  required 
                />
              </div>

              <div className="modal-actions-footer">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Save Stock Item
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