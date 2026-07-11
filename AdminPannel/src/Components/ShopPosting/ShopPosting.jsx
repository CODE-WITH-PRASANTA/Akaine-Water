import React, { useState } from 'react';
import './ShopPosting.css';

const ShopPosting = () => {
  // Initial Mock Data
  const [products, setProducts] = useState([
    { id: 1, name: "Premium Wireless Headphones", email: "supplier1@tech.com", phone: "+1 555-0192", desc: "Noise-canceling over-ear headphones.", price: 199.99, rating: 5, status: "Active" },
    { id: 2, name: "Mechanical Gaming Keyboard", email: "logistics@gear.com", phone: "+1 555-0143", desc: "RGB backlit mechanical keyboard.", price: 89.49, rating: 4, status: "Pending" },
    { id: 3, name: "UltraWide 4K Monitor", email: "displays@screens.com", phone: "+1 555-0188", desc: "34-inch curved productivity monitor.", price: 449.99, rating: 5, status: "Active" },
    { id: 4, name: "Ergonomic Office Chair", email: "sales@comfort.com", phone: "+1 555-0121", desc: "High-back mesh chair with lumbar support.", price: 259.00, rating: 3, status: "Out of Stock" }
  ]);

  // Form State
  const initialFormState = { id: null, name: '', email: '', phone: '', desc: '', price: '', rating: 5, status: 'Active' };
  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedRows, setSelectedRows] = useState([]);

  // Form Validation
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Product Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) tempErrors.phone = "Phone number is required";
    if (!formData.desc.trim()) tempErrors.desc = "Description is required";
    if (!formData.price || formData.price <= 0) tempErrors.price = "Enter a valid price";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form Submission (Add or Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isEditing) {
      // Update existing item
      setProducts(products.map(p => p.id === formData.id ? { ...formData, price: parseFloat(formData.price), rating: parseInt(formData.rating) } : p));
      setIsEditing(false);
    } else {
      // Add new item
      const newProduct = {
        ...formData,
        id: Date.now(),
        price: parseFloat(formData.price),
        rating: parseInt(formData.rating)
      };
      setProducts([...products, newProduct]);
    }
    setFormData(initialFormState);
    setErrors({});
  };

  // Handle Edit Action
  const handleEdit = (product) => {
    setIsEditing(true);
    setFormData(product);
    setErrors({});
  };

  // Handle Delete Action
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
      if (formData.id === id) {
        setFormData(initialFormState);
        setIsEditing(false);
      }
    }
  };

  // Row Selection Toggle
  const toggleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredProducts.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredProducts.map(p => p.id));
    }
  };

  // Filter & Search Logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="dashboard-container">
      {/* Top Header Controls */}
      <header className="dashboard-header">
        <div className="header-title-zone">
          <h1>Shop Posting Portal</h1>
          <p>Manage your inventory catalog, pricing data, and global storefront settings seamlessly.</p>
        </div>
        
        <div className="header-actions">
          <div className="search-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
              type="text" 
              placeholder="Search products, emails..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>

          <select className="filter-dropdown" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          <button className="btn btn-secondary" onClick={() => { setSearchTerm(''); setFilterStatus('All'); }}>
            Reset Filters
          </button>
        </div>
      </header>

      {/* Main split 50/50 Workspace Container */}
      <div className="dashboard-workspace">
        
        {/* Left Side: Dynamic Management Form */}
        <div className="workspace-panel form-panel">
          <div className="panel-header">
            <h2>{isEditing ? "✏️ Edit Product Record" : "➕ Add New Product Entry"}</h2>
            <p>Fill out the data schema specifications below to populate the active storefront registry.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="entry-form">
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Product Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={errors.name ? 'input-error' : ''} placeholder="e.g. Wireless Gaming Mouse" />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Contact Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={errors.email ? 'input-error' : ''} placeholder="vendor@domain.com" />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className={errors.phone ? 'input-error' : ''} placeholder="+1 555-0000" />
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>Price ($ USD)</label>
                <input type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} className={errors.price ? 'input-error' : ''} placeholder="0.00" />
                {errors.price && <span className="error-msg">{errors.price}</span>}
              </div>

              <div className="form-group">
                <label>Star Rating Score</label>
                <select name="rating" value={formData.rating} onChange={handleInputChange}>
                  <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                  <option value="3">⭐⭐⭐ (3 Stars)</option>
                  <option value="2">⭐⭐ (2 Stars)</option>
                  <option value="1">⭐ (1 Star)</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Listing Status</label>
                <div className="radio-group">
                  {['Active', 'Pending', 'Out of Stock'].map((statusOption) => (
                    <label key={statusOption} className="radio-label">
                      <input type="radio" name="status" value={statusOption} checked={formData.status === statusOption} onChange={handleInputChange} />
                      <span>{statusOption}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group full-width">
                <label>Product Specifications & Details</label>
                <textarea name="desc" rows="4" value={formData.desc} onChange={handleInputChange} className={errors.desc ? 'input-error' : ''} placeholder="Describe structural material data, batch codes, delivery constraints..."></textarea>
                {errors.desc && <span className="error-msg">{errors.desc}</span>}
              </div>
            </div>

            <div className="form-actions-row">
              {isEditing && (
                <button type="button" className="btn btn-cancel" onClick={() => { setFormData(initialFormState); setIsEditing(false); setErrors({}); }}>
                  Cancel Edit
                </button>
              )}
              <button type="submit" className="btn btn-primary submit-btn">
                {isEditing ? "Update Product Entry" : "Commit Product Entry"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Responsive Premium Data Table */}
        <div className="workspace-panel table-panel">
          <div className="panel-header flex-header">
            <div>
              <h2>📦 Operational Datatable Inventory</h2>
              <p>Showing {filteredProducts.length} entries matching criteria.</p>
            </div>
          </div>

          <div className="table-scroll-container">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th width="40">
                    <input type="checkbox" checked={filteredProducts.length > 0 && selectedRows.length === filteredProducts.length} onChange={toggleSelectAll} />
                  </th>
                  <th>Product Details</th>
                  <th>Vendor Contact</th>
                  <th>Pricing</th>
                  <th>Stars</th>
                  <th>Status</th>
                  <th align="center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty-state-cell">
                      <div className="empty-state">
                        <p>No products match your search or filters.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className={selectedRows.includes(product.id) ? 'selected-row' : ''}>
                      <td>
                        <input type="checkbox" checked={selectedRows.includes(product.id)} onChange={() => toggleSelectRow(product.id)} />
                      </td>
                      <td>
                        <div className="product-info-cell">
                          <span className="product-title-text">{product.name}</span>
                          <span className="product-desc-text">{product.desc}</span>
                        </div>
                      </td>
                      <td>
                        <div className="contact-info-cell">
                          <span>{product.email}</span>
                          <small>{product.phone}</small>
                        </div>
                      </td>
                      <td>
                        <strong className="price-tag">${product.price.toFixed(2)}</strong>
                      </td>
                      <td>
                        <div className="stars-wrapper">
                          {"★".repeat(product.rating)}{"☆".repeat(5 - product.rating)}
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge status-${product.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {product.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-button-group">
                          <button className="icon-btn edit" title="Edit row Data" onClick={() => handleEdit(product)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                          </button>
                          <button className="icon-btn delete" title="Purge entry" onClick={() => handleDelete(product.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="table-pagination-footer">
            <span>Showing <b>{filteredProducts.length}</b> of <b>{products.length}</b> rows</span>
            <div className="pagination-buttons">
              <button className="btn btn-secondary btn-sm" disabled>Previous</button>
              <button className="btn btn-secondary btn-sm" disabled>Next</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShopPosting;