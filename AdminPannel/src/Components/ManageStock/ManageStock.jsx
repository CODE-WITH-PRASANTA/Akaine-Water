import React, { useState, useEffect, useMemo } from 'react';
import * as XLSX from 'xlsx'; // npm install xlsx  (SheetJS - used for the real .xlsx export)
import './ManageStock.css';
import API from "../../api/axios"; // Uses configured Axios instance (baseURL includes /api)

const emptyFormData = {
  product: '',
  productCode: '',
  unit: 'Pcs',
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
  const [stockList, setStockList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(emptyFormData);
  const [savingForm, setSavingForm] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Summary Metrics State (From Backend, when the backend provides one)
  const [backendMetrics, setBackendMetrics] = useState(null);

  // Auto-calculate total metrics from stockList in real-time as a fallback/sync measure
  const calculatedMetrics = useMemo(() => {
    return stockList.reduce(
      (acc, item) => {
        acc.totalOpening += Number(item.opening || 0);
        acc.totalReceived += Number(item.received || 0);
        acc.totalSold += Number(item.sold || 0);
        acc.totalCurrent += Number(item.current || 0);
        return acc;
      },
      { totalOpening: 0, totalReceived: 0, totalSold: 0, totalCurrent: 0 }
    );
  }, [stockList]);

  // Use backend metrics if the current fetch provided them, otherwise fall
  // back to the freshly-calculated ones. calculatedMetrics is always derived
  // straight from stockList, so it's never stale even if backendMetrics is.
  const metrics = backendMetrics || calculatedMetrics;

  // Fetch all stock data on load / on demand
  const fetchStockData = async () => {
    try {
      setLoading(true);
      setFetchError(null);

      const response = await API.get('/manage');

      // Support array response or object with success flag
      const data = response.data.data || (Array.isArray(response.data) ? response.data : []);
      setStockList(data);

      // Reset backendMetrics on every fetch first, so a response that
      // doesn't include metrics never leaves a stale value from a previous
      // fetch sitting around - it correctly falls back to calculatedMetrics.
      setBackendMetrics(response.data.metrics || null);
    } catch (error) {
      console.error('Error fetching stock list:', error);
      const message = error.response?.data?.message || 'Failed to fetch stock items from server.';
      setFetchError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  // Modal Handlers
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData(emptyFormData);
    setIsModalOpen(true);
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setFormData({
      product: item.product || '',
      productCode: item.productCode || '',
      unit: item.unit || 'Pcs',
      purchaseDate: item.purchaseDate ? item.purchaseDate.split('T')[0] : '',
      opening: item.opening ?? 0,
      received: item.received ?? 0,
      sold: item.sold ?? 0,
      current: item.current ?? 0,
      supplierName: item.supplierName || '',
      purchasePrice: item.purchasePrice ?? '',
      sellingPrice: item.sellingPrice ?? '',
      storageLocation: item.storageLocation || '',
      remarks: item.remarks || ''
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  // Delete Stock Item
  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this stock product?')) {
      try {
        const response = await API.delete(`/manage/${id}`);
        if (response.data.success || response.status === 200) {
          alert('Stock item deleted successfully.');
          fetchStockData();
        }
      } catch (error) {
        console.error('Error deleting stock item:', error);
        alert(error.response?.data?.message || 'Failed to delete stock item.');
      }
    }
  };

  // Form Field Input Change with Realtime Auto-Calculation
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

  // Form Submit (Add or Edit)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.product.trim()) {
      alert('Please enter a product name!');
      return;
    }

    if (!formData.unit) {
      alert('Please select a unit!');
      return;
    }

    const payload = {
      product: formData.product.trim(),
      productCode: formData.productCode ? formData.productCode.trim() : undefined,
      unit: formData.unit || 'Pcs',
      purchaseDate: formData.purchaseDate ? formData.purchaseDate : null,
      opening: Number(formData.opening || 0),
      received: Number(formData.received || 0),
      sold: Number(formData.sold || 0),
      current: Number(formData.current || 0),
      supplierName: formData.supplierName ? formData.supplierName.trim() : '',
      purchasePrice: formData.purchasePrice !== '' ? Number(formData.purchasePrice) : 0,
      sellingPrice: formData.sellingPrice !== '' ? Number(formData.sellingPrice) : 0,
      storageLocation: formData.storageLocation ? formData.storageLocation.trim() : '',
      remarks: formData.remarks ? formData.remarks.trim() : ''
    };

    try {
      setSavingForm(true);

      if (editingItem) {
        await API.put(`/manage/${editingItem._id || editingItem.id}`, payload);
        alert('Stock item updated successfully!');
      } else {
        await API.post('/manage', payload);
        alert('Stock item added successfully!');
      }

      handleCloseModal();
      fetchStockData();
    } catch (error) {
      console.error('Error saving stock data details:', error.response?.data || error);
      alert(
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Failed to save stock product. Please check input values.'
      );
    } finally {
      setSavingForm(false);
    }
  };

  // Export to a real .xlsx workbook (SheetJS), built entirely client-side
  // from the data already loaded on screen - guarantees the export exactly
  // matches what's currently displayed, with no dependency on a separate
  // backend CSV/export route or its file format.
  const handleDownloadExcel = () => {
    if (!stockList || stockList.length === 0) {
      alert('No stock data available to export.');
      return;
    }

    try {
      setExporting(true);

      const workbook = XLSX.utils.book_new();

      // --- Sheet 1: Summary ---
      const summaryRows = [
        ['Fresh Water Stock Summary'],
        ['Generated', new Date().toLocaleString()],
        [],
        ['Metric', 'Value'],
        ['Opening Stock', metrics.totalOpening || 0],
        ['Received Stock', metrics.totalReceived || 0],
        ['Sold Stock', metrics.totalSold || 0],
        ['Current Stock', metrics.totalCurrent || 0],
      ];
      const summarySheet = XLSX.utils.aoa_to_sheet(summaryRows);
      summarySheet['!cols'] = [{ wch: 22 }, { wch: 20 }];
      XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

      // --- Sheet 2: Full Stock Detail (matches the report modal table) ---
      const detailRows = stockList.map((item) => ({
        'Product Name': item.product || '',
        'Product Code/SKU': item.productCode || '',
        'Unit': item.unit || 'Pcs',
        'Purchase Date': item.purchaseDate ? item.purchaseDate.split('T')[0] : '',
        'Opening Stock': item.opening ?? 0,
        'Received Stock': item.received ?? 0,
        'Sold Stock': item.sold ?? 0,
        'Current Stock': item.current ?? 0,
        'Supplier Name': item.supplierName || '',
        'Purchase Price (Rs)': item.purchasePrice ?? 0,
        'Selling Price (Rs)': item.sellingPrice ?? 0,
        'Storage Location': item.storageLocation || '',
        'Remarks': item.remarks || '',
      }));
      const detailSheet = XLSX.utils.json_to_sheet(detailRows);
      detailSheet['!cols'] = [
        { wch: 20 }, { wch: 16 }, { wch: 8 }, { wch: 14 }, { wch: 12 },
        { wch: 12 }, { wch: 10 }, { wch: 12 }, { wch: 18 }, { wch: 14 },
        { wch: 14 }, { wch: 18 }, { wch: 24 },
      ];
      XLSX.utils.book_append_sheet(workbook, detailSheet, 'Stock Detail');

      const fileName = `water_stock_report_${new Date().toISOString().slice(0, 10)}.xlsx`;
      XLSX.writeFile(workbook, fileName);
    } catch (error) {
      console.error('Error generating .xlsx export:', error);
      alert('Failed to generate the Excel report. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="ms-dashboard-wrapper">

      {/* Top Header Bar */}
      <div className="ms-top-bar">
        <div className="ms-title-badge">
          STOCK MANAGEMENT & FRESH WATER STOCK
        </div>
        <div className="ms-action-buttons-group">
          <button
            type="button"
            className="ms-btn-csv"
            onClick={handleDownloadExcel}
            disabled={exporting || loading}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            {exporting ? 'Generating...' : 'Download Excel'}
          </button>

          <button type="button" className="ms-btn-add-stock" onClick={handleOpenAddModal}>
            + Add Stock
          </button>
        </div>
      </div>

      {fetchError && !loading && (
        <div className="ms-fetch-error-banner">
          {fetchError} —{' '}
          <button type="button" className="ms-retry-link" onClick={fetchStockData}>
            Retry
          </button>
        </div>
      )}

      {/* Metric Summary Cards Grid */}
      <div className="ms-metrics-grid">
        <div className="ms-metric-card">
          <span className="ms-metric-label">Opening Stock</span>
          <span className="ms-metric-value">
            {loading ? '...' : (metrics.totalOpening || 0).toLocaleString()}
          </span>
        </div>
        <div className="ms-metric-card">
          <span className="ms-metric-label">Received Stock</span>
          <span className="ms-metric-value">
            {loading ? '...' : (metrics.totalReceived || 0).toLocaleString()}
          </span>
        </div>
        <div className="ms-metric-card">
          <span className="ms-metric-label">Sold Stock</span>
          <span className="ms-metric-value">
            {loading ? '...' : (metrics.totalSold || 0).toLocaleString()}
          </span>
        </div>
        <div className="ms-metric-card ms-metric-card-current">
          <span className="ms-metric-label">Current Stock</span>
          <span className="ms-metric-value ms-red-text">
            {loading ? '...' : (metrics.totalCurrent || 0).toLocaleString()}
          </span>
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
              {loading ? (
                <tr>
                  <td colSpan="7" className="ms-empty-row">Loading stock details...</td>
                </tr>
              ) : stockList.length > 0 ? (
                stockList.map((item) => (
                  <tr key={item._id || item.id}>
                    <td className="ms-font-bold">{item.product}</td>
                    <td>{item.opening}</td>
                    <td>{item.received}</td>
                    <td>{item.sold}</td>
                    <td className="ms-font-bold">{item.current}</td>
                    <td>{item.unit}</td>
                    <td>
                      <div className="ms-actions-flex">
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
                          onClick={() => handleDeleteClick(item._id || item.id)}
                          title="Delete Product"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
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

      {/* Footer Banner - Triggers Modal with Detailed Report */}
      <div className="ms-footer-action-row">
        <button
          type="button"
          className="ms-btn-full-report"
          onClick={() => setIsReportModalOpen(true)}
        >
          View Full Stock Report
        </button>
      </div>

      {/* POPUP MODAL (Add & Edit Action) */}
      {isModalOpen && (
        <div className="ms-modal-overlay" onClick={handleCloseModal}>
          <div className="ms-modal-dialog" onClick={(e) => e.stopPropagation()}>

            <div className="ms-modal-header">
              <div className="ms-modal-header-title">
                <div className="ms-water-icon-circle">🚰</div>
                <h3>{editingItem ? 'Edit Water Stock' : 'Add New Water Stock'}</h3>
              </div>
              <button type="button" className="ms-modal-close-x" onClick={handleCloseModal}>
                &times;
              </button>
            </div>

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
                    type="number"
                    step="0.01"
                    name="purchasePrice"
                    placeholder="0.00"
                    value={formData.purchasePrice}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="ms-form-group">
                  <label>Selling Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
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

                {/* Row 4 */}
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

              <div className="ms-modal-footer">
                <button type="button" className="ms-btn-cancel" onClick={handleCloseModal} disabled={savingForm}>
                  Cancel
                </button>
                <button type="submit" className="ms-btn-submit" disabled={savingForm}>
                  💾 {savingForm ? 'Saving...' : (editingItem ? 'Save Changes' : 'Add Product')}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* POPUP MODAL (Full Detailed Report View) */}
      {isReportModalOpen && (
        <div className="ms-modal-overlay" onClick={() => setIsReportModalOpen(false)}>
          <div className="ms-modal-dialog ms-report-dialog" onClick={(e) => e.stopPropagation()}>

            <div className="ms-modal-header">
              <div className="ms-modal-header-title">
                <div className="ms-water-icon-circle">📊</div>
                <h3>Full Detailed Stock Report</h3>
              </div>
              <button type="button" className="ms-modal-close-x" onClick={() => setIsReportModalOpen(false)}>
                &times;
              </button>
            </div>

            <div className="ms-modal-form-body">
              <div className="ms-table-responsive-view" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <table className="ms-custom-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>SKU</th>
                      <th>Date</th>
                      <th>Opening</th>
                      <th>Received</th>
                      <th>Sold</th>
                      <th>Current</th>
                      <th>Supplier</th>
                      <th>Buy Price</th>
                      <th>Sell Price</th>
                      <th>Location</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockList.length > 0 ? (
                      stockList.map((item) => (
                        <tr key={item._id || item.id}>
                          <td className="ms-font-bold">{item.product}</td>
                          <td>{item.productCode || '-'}</td>
                          <td>{item.purchaseDate ? item.purchaseDate.split('T')[0] : '-'}</td>
                          <td>{item.opening || 0}</td>
                          <td>{item.received || 0}</td>
                          <td>{item.sold || 0}</td>
                          <td className="ms-font-bold">{item.current || 0}</td>
                          <td>{item.supplierName || '-'}</td>
                          <td>₹{item.purchasePrice || 0}</td>
                          <td>₹{item.sellingPrice || 0}</td>
                          <td>{item.storageLocation || '-'}</td>
                          <td>{item.remarks || '-'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="12" className="ms-empty-row">No detailed records to render.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="ms-modal-footer">
              <button type="button" className="ms-btn-cancel" onClick={() => setIsReportModalOpen(false)}>
                Close
              </button>
              <button type="button" className="ms-btn-csv" onClick={handleDownloadExcel} disabled={exporting}>
                {exporting ? 'Generating...' : 'Download Excel'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ManageStock;