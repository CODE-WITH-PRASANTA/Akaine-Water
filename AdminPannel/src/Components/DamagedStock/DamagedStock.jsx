import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import "./DamagedStock.css";

const DamagedStock = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [tableData, setTableData] = useState([]);
  const [summaryCards, setSummaryCards] = useState([
    { key: 'totalDamaged', label: 'Total Damaged', value: 0, isRed: true },
    { key: 'Broken', label: 'Broken', value: 0 },
    { key: 'Leakage', label: 'Leakage', value: 0 },
    { key: 'Lost', label: 'Lost', value: 0 },
    { key: 'Customer Damage', label: 'Customer Damage', value: 0 },
  ]);

  // Product list from ManageStock
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [volumeList, setVolumeList] = useState(['20L', '10L', '5L', '1L']);

  // Filter state
  const [selectedProductFilter, setSelectedProductFilter] = useState('');

  // Selected volume state added
  const [selectedVolume, setSelectedVolume] = useState('');

  const [formData, setFormData] = useState({
    product: '',
    category: '',
    selectedVolume: '',
    broken: '',
    leakage: '',
    lost: '',
    customerDamage: '',
  });

  // Fetch products from ManageStock on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch damaged stock data when filter changes
  useEffect(() => {
    fetchDamagedStockData();
  }, [selectedProductFilter]);

  // --- Fetch Products from Manage Stock API (/manage) ---
  const fetchProducts = async () => {
    try {
      const response = await API.get('/manage');
      console.log('Products fetched from ManageStock:', response.data);
      
      let products = [];
      if (response.data?.success && Array.isArray(response.data.data)) {
        products = response.data.data;
      } else if (Array.isArray(response.data)) {
        products = response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        products = response.data.data;
      }
      
      setProductList(products);
      
    } catch (error) {
      console.error('Error fetching products from ManageStock:', error);
      // Fallback mock data
      setProductList([
        { _id: '1', product: 'Coca-Cola', productCode: 'CC001', category: 'glass-bottles', volumes: ['20L', '10L', '5L', '1L'] },
        { _id: '2', product: 'Pepsi', productCode: 'PS001', category: 'plastic-bottles', volumes: ['20L', '10L', '5L', '1L'] },
        { _id: '3', product: 'Sprite', productCode: 'SP001', category: 'cans', volumes: ['20L', '10L', '5L', '1L'] },
      ]);
    }
  };

  // --- Handle Product Selection Change ---
  const handleProductChange = (e) => {
    const productId = e.target.value;
    const selectedProduct = productList.find(item => item._id === productId || item.id === productId);

    if (selectedProduct) {
      setCategoryList(selectedProduct.category ? [selectedProduct.category] : []);
      
      const volumes = selectedProduct.volumes || ['20L', '10L', '5L', '1L'];
      setVolumeList(volumes);
    } else {
      setCategoryList([]);
      setVolumeList(['20L', '10L', '5L', '1L']);
    }

    setFormData(prev => ({
      ...prev,
      product: productId,
      category: selectedProduct?.category || '',
      selectedVolume: '',
    }));
    setSelectedVolume('');
  };

  // --- Handle Volume Selection Change ---
  const handleVolumeChange = (e) => {
    const vol = e.target.value;
    setSelectedVolume(vol);
    setFormData(prev => ({
      ...prev,
      selectedVolume: vol
    }));
  };

  // --- Fetch Damaged Stock Data ---
  const fetchDamagedStockData = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedProductFilter) params.product = selectedProductFilter;

      const response = await API.get('/damage', { params });
      console.log('Damaged Stock Data:', response.data);
      
      if (response.data && response.data.success) {
        setTableData(response.data.tableData || getDefaultTableData());
        setSummaryCards(response.data.summaryCards || getDefaultSummaryCards());
      } else {
        setTableData(getDefaultTableData());
        setSummaryCards(getDefaultSummaryCards());
      }
    } catch (error) {
      console.error('Error fetching damaged stock summary:', error);
      setTableData(getDefaultTableData());
      setSummaryCards(getDefaultSummaryCards());
    } finally {
      setLoading(false);
    }
  };

  // --- Default Data Functions ---
  const getDefaultTableData = () => [
    { reason: 'Broken', v20L: 0, v10L: 0, v5L: 0, v1L: 0, total: 0 },
    { reason: 'Leakage', v20L: 0, v10L: 0, v5L: 0, v1L: 0, total: 0 },
    { reason: 'Lost', v20L: 0, v10L: 0, v5L: 0, v1L: 0, total: 0 },
    { reason: 'Customer Damage', v20L: 0, v10L: 0, v5L: 0, v1L: 0, total: 0 },
  ];

  const getDefaultSummaryCards = () => [
    { key: 'totalDamaged', label: 'Total Damaged', value: 0, isRed: true },
    { key: 'Broken', label: 'Broken', value: 0 },
    { key: 'Leakage', label: 'Leakage', value: 0 },
    { key: 'Lost', label: 'Lost', value: 0 },
    { key: 'Customer Damage', label: 'Customer Damage', value: 0 },
  ];

  // --- Handle Form Input Change ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- Handle Form Submit ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.product) {
      alert('Please select a product!');
      return;
    }

    if (!formData.selectedVolume) {
      alert('Please select a volume!');
      return;
    }

    // Check if any quantity is entered
    const hasAnyQuantity = ['broken', 'leakage', 'lost', 'customerDamage'].some(field => {
      return Number(formData[field]) > 0;
    });

    if (!hasAnyQuantity) {
      alert('Please enter at least one quantity for a damage reason!');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        product: formData.product,
        category: formData.category || 'general',
        volumes: volumeList,
        selectedVolume: formData.selectedVolume,
        broken: formData.broken !== '' ? Number(formData.broken) : 0,
        leakage: formData.leakage !== '' ? Number(formData.leakage) : 0,
        lost: formData.lost !== '' ? Number(formData.lost) : 0,
        customerDamage: formData.customerDamage !== '' ? Number(formData.customerDamage) : 0
      };

      const response = await API.post('/damage', payload);
      console.log('Save Response:', response.data);
      
      if (response.data && response.data.success) {
        alert(response.data.message || 'Damaged stock saved successfully!');
        setIsModalOpen(false);
        // Reset form
        setFormData({
          product: '', category: '', selectedVolume: '',
          broken: '', leakage: '', lost: '', customerDamage: '',
        });
        setSelectedVolume('');
        fetchDamagedStockData();
      } else {
        alert(response.data.message || 'Failed to save damaged stock entry.');
      }
    } catch (error) {
      console.error('Error saving entry:', error);
      const serverMessage = error.response?.data?.message || error.response?.data?.error || JSON.stringify(error.response?.data);
      alert(serverMessage ? `Failed: ${serverMessage}` : 'Failed to save damaged stock entry.');
    } finally {
      setSubmitting(false);
    }
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
          <div className="dsc-header-actions">
            <button className="dsc-add-btn" onClick={() => setIsModalOpen(true)}>
              + Add
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="dsc-filter-section" style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <label className="dsc-group-label" style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
              Filter by Product
            </label>
            <select
              value={selectedProductFilter}
              onChange={(e) => setSelectedProductFilter(e.target.value)}
              className="dsc-select-input"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
            >
              <option value="">All Products</option>
              {productList.map((item) => {
                const productId = item._id || item.id;
                const productName = item.product || item.name || 'Unnamed';
                const productCode = item.productCode || '';
                return (
                  <option key={productId} value={productId}>
                    {productName}{productCode ? ` (${productCode})` : ''}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="dsc-cards-grid">
          {summaryCards.map((card, index) => (
            <div className="dsc-card" key={card.key || index}>
              <span className="dsc-card-label">{card.label}</span>
              <span className={`dsc-card-value ${card.isRed ? 'text-red' : ''}`}>
                {loading ? '...' : card.value}
              </span>
            </div>
          ))}
        </div>

        {/* Table */}
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
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                    Loading data...
                  </td>
                </tr>
              ) : tableData.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                    No records found for selected filters.
                  </td>
                </tr>
              ) : (
                tableData.map((row, index) => (
                  <tr key={index}>
                    <td className="text-left font-semibold">{row.reason}</td>
                    <td>{row.v20L}</td>
                    <td>{row.v10L}</td>
                    <td>{row.v5L}</td>
                    <td>{row.v1L}</td>
                    <td className="text-right font-bold">{row.total}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="dsc-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="dsc-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="dsc-modal-header">
              <h3>Add Damaged Stock Entry</h3>
              <button type="button" className="dsc-modal-close-btn" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="dsc-modal-form">
              {/* Product Dropdown - Fetched from ManageStock */}
              <div className="dsc-form-group">
                <label className="dsc-group-label">
                  Product <span className="dsc-required">*</span>
                </label>
                <select
                  name="product"
                  value={formData.product}
                  onChange={handleProductChange}
                  className="dsc-select-input"
                  required
                >
                  <option value="">Select Product</option>
                  {productList.map(item => {
                    const productId = item._id || item.id;
                    const productName = item.product || item.name || 'Unnamed';
                    return (
                      <option key={productId} value={productId}>
                        {productName}{item.productCode ? ` (${item.productCode})` : ''}
                      </option>
                    );
                  })}
                </select>
                {productList.length === 0 && (
                  <small style={{ color: '#f59e0b', display: 'block', marginTop: '4px' }}>
                    ⚠️ No products found. Please add products in Stock Management first.
                  </small>
                )}
              </div>

              {/* Volume Dropdown */}
              <div className="dsc-form-group">
                <label className="dsc-group-label">
                  Volume <span className="dsc-required">*</span>
                </label>
                <select
                  name="selectedVolume"
                  value={selectedVolume}
                  onChange={handleVolumeChange}
                  className="dsc-select-input"
                  required
                >
                  <option value="">Select Volume</option>
                  {volumeList.map((vol, index) => (
                    <option key={index} value={vol}>
                      {vol}
                    </option>
                  ))}
                </select>
              </div>

              {/* Damage Reason Sections with Single Textbox Inputs */}
              <div className="dsc-form-group">
                <label className="dsc-group-label">Broken</label>
                <input
                  type="number"
                  name="broken"
                  placeholder="0"
                  value={formData.broken || ''}
                  onChange={handleInputChange}
                  className="dsc-text-input"
                  min="0"
                />
              </div>

              <div className="dsc-form-group">
                <label className="dsc-group-label">Leakage</label>
                <input
                  type="number"
                  name="leakage"
                  placeholder="0"
                  value={formData.leakage || ''}
                  onChange={handleInputChange}
                  className="dsc-text-input"
                  min="0"
                />
              </div>

              <div className="dsc-form-group">
                <label className="dsc-group-label">Lost</label>
                <input
                  type="number"
                  name="lost"
                  placeholder="0"
                  value={formData.lost || ''}
                  onChange={handleInputChange}
                  className="dsc-text-input"
                  min="0"
                />
              </div>

              <div className="dsc-form-group">
                <label className="dsc-group-label">Customer Damage</label>
                <input
                  type="number"
                  name="customerDamage"
                  placeholder="0"
                  value={formData.customerDamage || ''}
                  onChange={handleInputChange}
                  className="dsc-text-input"
                  min="0"
                />
              </div>

              {/* Modal Footer */}
              <div className="dsc-modal-footer">
                <button
                  type="button"
                  className="dsc-modal-cancel-btn"
                  onClick={() => setIsModalOpen(false)}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="dsc-modal-submit-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : 'Save Stock'}
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