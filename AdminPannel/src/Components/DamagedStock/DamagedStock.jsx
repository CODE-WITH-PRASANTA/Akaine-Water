import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx'; // npm install xlsx  (SheetJS - used for the real .xlsx export)
import "./DamagedStock.css";
import API from "../../api/axios"; // Same configured Axios instance used by Manage Stock (baseURL includes /api)

// Fixed reason order used for both the summary cards and the table rows
const DAMAGE_REASONS = ['Broken', 'Leakage', 'Lost', 'Customer Damage'];

// Maps each reason -> the exact field name prefix the backend controller reads
// (req.body.broken20L, req.body.leakage10L, req.body.customerDamage5L, etc.)
const REASON_FIELD_PREFIX = {
  Broken: 'broken',
  Leakage: 'leakage',
  Lost: 'lost',
  'Customer Damage': 'customerDamage',
};

const VOLUMES = ['20L', '10L', '5L', '1L'];

// Builds the initial/blank form state with every backend-expected field present
const buildInitialFormState = () => {
  const base = { product: '', category: '' };
  DAMAGE_REASONS.forEach((reason) => {
    const prefix = REASON_FIELD_PREFIX[reason];
    VOLUMES.forEach((vol) => {
      base[`${prefix}${vol}`] = '';
    });
  });
  return base;
};

const DamagedStock = () => {
  // Backend-driven state
  const [damagedRecords, setDamagedRecords] = useState([]);
  const [backendSummary, setBackendSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  // Table rows - built entirely from the backend summary.breakdown, which the
  // controller populates per reason as { "20L": n, "10L": n, "5L": n, "1L": n }.
  // "Total" comes from summary[reason] (a running total maintained server-side).
  const tableData = DAMAGE_REASONS.map((reason) => {
    const breakdown = backendSummary?.breakdown?.[reason] || {};
    return {
      reason,
      v20L: breakdown['20L'] ?? 0,
      v10L: breakdown['10L'] ?? 0,
      v5L: breakdown['5L'] ?? 0,
      v1L: breakdown['1L'] ?? 0,
      total: backendSummary?.[reason] ?? 0,
    };
  });

  // Modal State Control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Product List fetched from Manage Stock (used ONLY inside this modal's Product dropdown)
  const [productList, setProductList] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  const fetchProductList = async () => {
    try {
      setProductsLoading(true);
      const response = await API.get('/manage');
      const data = response.data.data || (Array.isArray(response.data) ? response.data : []);
      setProductList(data);
    } catch (error) {
      console.error('Error fetching product list from Manage Stock:', error);
    } finally {
      setProductsLoading(false);
    }
  };

  // Fetch the product list whenever the Add Damaged Stock modal is opened
  useEffect(() => {
    if (isModalOpen) {
      fetchProductList();
    }
  }, [isModalOpen]);

  // Fetch damaged stock summary + records from the backend (GET /api/damage)
  const fetchDamagedStock = async () => {
    try {
      setLoading(true);
      const response = await API.get('/damage');

      const records = response.data.data || [];
      const summary = response.data.summary || null;

      setDamagedRecords(records);
      setBackendSummary(summary);
    } catch (error) {
      console.error('Error fetching damaged stock summary:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load damaged stock data on mount
  useEffect(() => {
    fetchDamagedStock();
  }, []);

  // Derive summary cards from backend summary (all real, backend-calculated values)
  const summaryCards = [
    { key: 'totalDamaged', label: 'Total Damaged', value: backendSummary?.totalDamaged ?? 0, isRed: true },
    { key: 'Broken', label: 'Broken', value: backendSummary?.Broken ?? 0 },
    { key: 'Leakage', label: 'Leakage', value: backendSummary?.Leakage ?? 0 },
    { key: 'Lost', label: 'Lost', value: backendSummary?.Lost ?? 0 },
    { key: 'Customer Damage', label: 'Customer Damage', value: backendSummary?.['Customer Damage'] ?? 0 },
  ];

  // Form State - one field per backend-expected key (product, category, and
  // <reasonPrefix><volume> for every reason x volume combination)
  const [formData, setFormData] = useState(buildInitialFormState());

  const handleViewReport = () => {
    alert('Loading full stock management report...');
  };

  // Builds a proper multi-sheet .xlsx workbook from the live backend data and
  // triggers a browser download. Runs entirely client-side via SheetJS, since
  // the backend's /damage/download route is currently just a stub
  // (res.send("CSV Export")) and isn't a real file export yet.
  const handleDownload = () => {
    if (tableData.length === 0) {
      alert('No data available to download!');
      return;
    }

    try {
      setDownloading(true);

      const workbook = XLSX.utils.book_new();

      // --- Sheet 1: Summary (matches the summary cards shown on screen) ---
      const summaryRows = [
        ['Damaged Stock Summary'],
        [],
        ['Metric', 'Value'],
        ['Total Damaged', backendSummary?.totalDamaged ?? 0],
        ['Broken', backendSummary?.Broken ?? 0],
        ['Leakage', backendSummary?.Leakage ?? 0],
        ['Lost', backendSummary?.Lost ?? 0],
        ['Customer Damage', backendSummary?.['Customer Damage'] ?? 0],
      ];
      const summarySheet = XLSX.utils.aoa_to_sheet(summaryRows);
      summarySheet['!cols'] = [{ wch: 22 }, { wch: 14 }];
      XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

      // --- Sheet 2: Breakdown (matches the on-screen table exactly) ---
      const breakdownHeader = ['Reason', '20L', '10L', '5L', '1L', 'Total'];
      const breakdownRows = tableData.map((row) => [
        row.reason,
        row.v20L,
        row.v10L,
        row.v5L,
        row.v1L,
        row.total,
      ]);
      const breakdownSheet = XLSX.utils.aoa_to_sheet([breakdownHeader, ...breakdownRows]);
      breakdownSheet['!cols'] = [
        { wch: 18 }, { wch: 8 }, { wch: 8 }, { wch: 8 }, { wch: 8 }, { wch: 10 },
      ];
      XLSX.utils.book_append_sheet(workbook, breakdownSheet, 'Breakdown');

      // --- Sheet 3: Raw Records (one row per saved damaged-stock document) ---
      if (damagedRecords.length > 0) {
        const recordRows = [];
        damagedRecords.forEach((record) => {
          (record.damages || []).forEach((d) => {
            recordRows.push({
              Product: record.product,
              Category: record.category,
              Reason: d.reason,
              '20L': d.v20L,
              '10L': d.v10L,
              '5L': d.v5L,
              '1L': d.v1L,
              Total: d.total,
              CreatedAt: record.createdAt
                ? new Date(record.createdAt).toLocaleString()
                : '',
            });
          });
        });
        const recordsSheet = XLSX.utils.json_to_sheet(recordRows);
        recordsSheet['!cols'] = [
          { wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 6 },
          { wch: 6 }, { wch: 6 }, { wch: 6 }, { wch: 8 }, { wch: 20 },
        ];
        XLSX.utils.book_append_sheet(workbook, recordsSheet, 'Raw Records');
      }

      const fileName = `Damaged_Stock_Report_${new Date().toISOString().slice(0, 10)}.xlsx`;
      XLSX.writeFile(workbook, fileName);
    } catch (error) {
      console.error('Error generating .xlsx report:', error);
      alert('Failed to generate the Excel report. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  // Handle Form Change for Volume Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Form Submission - POSTs the full payload to /api/damage in the
  // exact shape addDamagedStock expects: product, category, and
  // <reasonPrefix><volume> for each reason x volume combo.
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.product) {
      alert('Please select a product!');
      return;
    }

    if (!formData.category) {
      alert('Please select a category!');
      return;
    }

    // Check at least one volume field has a value > 0, so we don't save an
    // entirely empty damage entry
    const hasAnyQuantity = DAMAGE_REASONS.some((reason) => {
      const prefix = REASON_FIELD_PREFIX[reason];
      return VOLUMES.some((vol) => Number(formData[`${prefix}${vol}`]) > 0);
    });

    if (!hasAnyQuantity) {
      alert('Please enter at least one quantity (20L, 10L, 5L, or 1L) for a damage reason!');
      return;
    }

    try {
      setSubmitting(true);

      await API.post('/damage', formData);

      alert('Damaged Stock Entry Updated Successfully!');
      setIsModalOpen(false);
      setFormData(buildInitialFormState());

      // Refresh summary cards + table totals with the newly saved entry
      fetchDamagedStock();
    } catch (error) {
      console.error('Error saving damaged stock entry:', error.response?.data || error);
      alert(
        error.response?.data?.message ||
        'Failed to save damaged stock entry. Please check input values.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Renders the 4 volume inputs (20L/10L/5L/1L) for a single reason section.
  // Each input keeps a persistent unit label above it (not just a
  // placeholder), so the field stays identifiable once a value is typed in.
  const renderVolumeInputs = (reason) => {
    const prefix = REASON_FIELD_PREFIX[reason];
    return (
      <div className="dsc-input-flex-row">
        {VOLUMES.map((vol) => (
          <div className="dsc-vol-field" key={vol}>
            <span className="dsc-vol-label">{vol}</span>
            <input
              type="number"
              name={`${prefix}${vol}`}
              placeholder="0"
              value={formData[`${prefix}${vol}`]}
              onChange={handleInputChange}
              className="dsc-text-input"
              min="0"
            />
          </div>
        ))}
      </div>
    );
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
            <button className="dsc-download-btn" onClick={handleDownload} disabled={downloading || loading}>
              {downloading ? 'Generating...' : 'Download'}
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
            <div className="dsc-card" key={card.key || index}>
              <span className="dsc-card-label">{card.label}</span>
              <span className={`dsc-card-value ${card.isRed ? 'text-red' : ''}`}>
                {loading ? '...' : card.value}
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
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-left">Loading damaged stock...</td>
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

              {/* Product Dropdown - fetched live from Manage Stock */}
              <div className="dsc-form-group">
                <label className="dsc-group-label">Product <span className="dsc-required">*</span></label>
                <div className="dsc-input-flex-row">
                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    className="dsc-select-input dsc-category-select"
                    required
                    disabled={productsLoading}
                  >
                    <option value="">
                      {productsLoading ? 'Loading products...' : 'Select Product'}
                    </option>
                    {productList.map((item) => (
                      <option key={item._id || item.id} value={item._id || item.id}>
                        {item.product}{item.productCode ? ` (${item.productCode})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="dsc-form-group">
                <label className="dsc-group-label">Category <span className="dsc-required">*</span></label>
                <div className="dsc-input-flex-row">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="dsc-select-input dsc-category-select"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="glass-bottles">Glass Bottles</option>
                    <option value="plastic-bottles">Plastic Bottles</option>
                    <option value="cans">Cans</option>
                    <option value="cartons">Cartons</option>
                    <option value="jerrycans">Jerrycans</option>
                    <option value="drums">Drums</option>
                    <option value="flexi-tanks">Flexi Tanks</option>
                    <option value="ibc-totes">IBC Totes</option>
                    <option value="pails">Pails</option>
                    <option value="sachets">Sachets</option>
                  </select>
                </div>
              </div>

              {/* 1. Broken Section - 20L / 10L / 5L / 1L inputs, mapped to
                  broken20L, broken10L, broken5L, broken1L exactly as the
                  backend controller reads them */}
              <div className="dsc-form-group">
                <label className="dsc-group-label">Broken</label>
                {renderVolumeInputs('Broken')}
              </div>

              {/* 2. Leakage Section */}
              <div className="dsc-form-group">
                <label className="dsc-group-label">Leakage</label>
                {renderVolumeInputs('Leakage')}
              </div>

              {/* 3. Lost Section */}
              <div className="dsc-form-group">
                <label className="dsc-group-label">Lost</label>
                {renderVolumeInputs('Lost')}
              </div>

              {/* 4. Customer Damage Section */}
              <div className="dsc-form-group">
                <label className="dsc-group-label">Customer Damage</label>
                {renderVolumeInputs('Customer Damage')}
              </div>

              {/* Modal Footer Buttons */}
              <div className="dsc-modal-footer">
                <button type="button" className="dsc-modal-cancel-btn" onClick={() => setIsModalOpen(false)} disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className="dsc-modal-submit-btn" disabled={submitting}>
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