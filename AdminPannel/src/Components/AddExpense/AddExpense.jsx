
import React, { useState, useRef } from 'react';
import { 
  FiFileText, 
  FiUser, 
  FiGrid, 
  FiPaperclip, 
  FiCalendar, 
  FiChevronDown, 
  FiShoppingCart, 
  FiTruck, 
  FiBriefcase, 
  FiSun, 
  FiHome, 
  FiMoreHorizontal,
  FiUploadCloud,
  FiArrowLeft,
  FiSave,
  FiCheck,
  FiFile,
  FiTrash2,
  FiDownload,
  
} from 'react-icons/fi';
import './AddExpense.css';

// Configuration matrix for the visual classification grids
const VISUAL_CATEGORIES = [
  { id: 'purchase', title: 'Purchase / Stock', desc: 'Raw materials, bottles, caps etc.', icon: FiShoppingCart },
  { id: 'transportation', title: 'Transportation', desc: 'Delivery, Fuel, Vehicle etc.', icon: FiTruck },
  { id: 'salary', title: 'Salary / Wages', desc: 'Staff salary, wages etc.', icon: FiBriefcase },
  { id: 'utilities', title: 'Utilities', desc: 'Electricity, Water, Internet etc.', icon: FiSun },
  { id: 'utilities', title: 'Utilities', desc: 'Electricity, Water, Internet etc.', icon:FiSun },
  { id: 'rent', title: 'Rent', desc: 'Shop, Warehouse Rent etc.', icon: FiHome },
  { id: 'others', title: 'Others', desc: 'Other miscellaneous expenses', icon: FiMoreHorizontal }
];

const DROPDOWN_CATEGORIES = ['Office Supplies', 'Marketing', 'Software Subscriptions', 'Travel', 'Meals & Entertainment'];
const PAYMENT_METHODS = ['Cash', 'Bank Transfer', 'Credit Card', 'Debit Card', 'UPI'];

const INITIAL_STATE = {
  expenseDate: new Date().toISOString().split('T')[0], // Dynamically loads current system date
  expenseCategoryDropdown: '',
  paymentMethod: '',
  expenseTitle: '',
  referenceNo: '',
  amount: '',
  taxAmount: '',
  totalAmount: '0.00',
  notes: '',
  vendorName: '',
  mobileNumber: '',
  email: '',
  selectedCategoryCard: 'purchase'
};

const AddExpense = () => {
  const [expenseData, setExpenseData] = useState(INITIAL_STATE);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  // Adjusted inline reference trigger binding safely
  const fileInputRef = useRef(null);

  // Form input change engine with automated precision floating point math calculation maps
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setExpenseData(prev => {
      const nextState = { ...prev, [name]: value };
      
      // Compute financial totals instantly upon base or tax input variations
      if (name === 'amount' || name === 'taxAmount') {
        const amt = parseFloat(nextState.amount) || 0;
        const tax = parseFloat(nextState.taxAmount) || 0;
        nextState.totalAmount = (amt + tax).toFixed(2);
      }
      return nextState;
    });
  };

  const handleCategoryCardSelect = (id) => {
    setExpenseData(prev => ({ ...prev, selectedCategoryCard: id }));
  };

  // Modern File Upload Pipeline
  const handleFileValidationAndIngestion = (file) => {
    if (!file) return;
    
    // Strict 5MB structural configuration constraint check
    if (file.size > 5 * 1024 * 1024) {
      alert('Security Policy Alert: The selected documentation file exceeds our professional 5MB storage ceiling.');
      return;
    }
    setUploadedFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileValidationAndIngestion(e.dataTransfer.files[0]);
    }
  };

  const openDatePicker = () => {
    const picker = document.getElementById('expenseDateInput');
    if (picker) {
      typeof picker.showPicker === 'function' ? picker.showPicker() : picker.focus();
    }
  };

  // Function to download the current expense data log structure
  const handleDownloadPayload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ ...expenseData, uploadedFileName: uploadedFile ? uploadedFile.name : null }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Expense_Log_${expenseData.expenseDate || 'Draft'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    console.log('Structured Submission Payload Data:', { ...expenseData, uploadedFile });
    alert('Expense record finalized and logged successfully.');
  };

  const handleResetRollback = () => {
    if (window.confirm('Are you absolutely certain you want to clear this entry state? All typed metrics will be dropped.')) {
      setExpenseData(INITIAL_STATE);
      setUploadedFile(null);
    }
  };

  return (
    <div className="add-expense-container">
      <form onSubmit={handleSaveSubmit} className="add-expense-form">
        
        {/* SEGMENT 1: Core Informational Matrix Parameters */}
        <section className="add-expense-card">
          <div className="add-expense-card-header">
            <div className="add-expense-icon-wrapper blue-bg">
              <FiFileText className="add-expense-section-icon" />
            </div>
            <div>
              <h3>Expense Information</h3>
              <p>Enter basic transactional details regarding the expense asset logs</p>
            </div>
          </div>
          
          <div className="add-expense-grid grid-3">
            <div className="add-expense-field">
              <label htmlFor="expenseDateInput">Expense Date <span className="required">*</span></label>
              <div className="add-expense-input-icon-wrapper">
                <input 
                  type="date" 
                  id="expenseDateInput"
                  name="expenseDate"
                  value={expenseData.expenseDate}
                  onChange={handleInputChange}
                  required 
                />
                <FiCalendar className="add-expense-input-right-icon clickable" onClick={openDatePicker} />
              </div>
            </div>
            
            <div className="add-expense-field">
              <label htmlFor="expenseCategoryDropdown">Expense Sub-Category <span className="required">*</span></label>
              <div className="add-expense-input-icon-wrapper">
                <select 
                  id="expenseCategoryDropdown"
                  name="expenseCategoryDropdown"
                  value={expenseData.expenseCategoryDropdown}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled hidden>Select Category</option>
                  {DROPDOWN_CATEGORIES.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
                <FiChevronDown className="add-expense-input-right-icon pointer-events-none" />
              </div>
            </div>

            <div className="add-expense-field">
              <label htmlFor="paymentMethod">Payment Framework <span className="required">*</span></label>
              <div className="add-expense-input-icon-wrapper">
                <select 
                  id="paymentMethod"
                  name="paymentMethod"
                  value={expenseData.paymentMethod}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled hidden>Select Payment Method</option>
                  {PAYMENT_METHODS.map((method, idx) => (
                    <option key={idx} value={method}>{method}</option>
                  ))}
                </select>
                <FiChevronDown className="add-expense-input-right-icon pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="add-expense-grid grid-2">
            <div className="add-expense-field">
              <label htmlFor="expenseTitle">Expense Description / Purpose <span className="required">*</span></label>
              <input 
                type="text" 
                id="expenseTitle"
                name="expenseTitle"
                placeholder="e.g., Q3 Cloud Hosting Server Cost Setup" 
                value={expenseData.expenseTitle}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="add-expense-field">
              <label htmlFor="referenceNo">Reference / Bill Receipt ID</label>
              <input 
                type="text" 
                id="referenceNo"
                name="referenceNo"
                placeholder="e.g., INV-2026-897B" 
                value={expenseData.referenceNo}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="add-expense-grid grid-2">
            <div className="add-expense-inner-split">
              <div className="add-expense-field">
                <label htmlFor="amount">Base Amount (₹) <span className="required">*</span></label>
                <input 
                  type="number" 
                  id="amount"
                  name="amount"
                  placeholder="0.00" 
                  step="0.01"
                  min="0"
                  value={expenseData.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="add-expense-field">
                <label htmlFor="taxAmount">Tax Component (₹)</label>
                <input 
                  type="number" 
                  id="taxAmount"
                  name="taxAmount"
                  placeholder="0.00" 
                  step="0.01"
                  min="0"
                  value={expenseData.taxAmount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="add-expense-field">
                <label htmlFor="totalAmount">Aggregate Total (₹)</label>
                <input 
                  type="text" 
                  id="totalAmount"
                  name="totalAmount"
                  value={expenseData.totalAmount}
                  disabled 
                  className="disabled-total-box"
                />
              </div>
            </div>
            
            <div className="add-expense-field">
              <label htmlFor="notes">Internal Remarks Log</label>
              <textarea 
                id="notes"
                name="notes"
                placeholder="Provide situational context details..."
                rows="4"
                value={expenseData.notes}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </section>

        {/* SEGMENT 2: Vendor / B2B Merchant Ledger Accounts */}
        <section className="add-expense-card">
          <div className="add-expense-card-header">
            <div className="add-expense-icon-wrapper blue-bg">
              <FiUser className="add-expense-section-icon" />
            </div>
            <div>
              <h3>Vendor / Supplier Ledger Information</h3>
              <p>Bind account parameters to specific merchant system nodes</p>
            </div>
          </div>

          <div className="add-expense-grid grid-3">
            <div className="add-expense-field">
              <label htmlFor="vendorName">Corporate Entity Name</label>
              <input 
                type="text" 
                id="vendorName"
                name="vendorName"
                placeholder="Merchant Company Name" 
                value={expenseData.vendorName}
                onChange={handleInputChange}
              />
            </div>
            <div className="add-expense-field">
              <label htmlFor="mobileNumber">Direct Line Contact Number</label>
              <input 
                type="tel" 
                id="mobileNumber"
                name="mobileNumber"
                placeholder="10-Digit Mobile Number" 
                value={expenseData.mobileNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="add-expense-field">
              <label htmlFor="email">Accounts Mailing Email Address</label>
              <input 
                type="email" 
                id="email"
                name="email"
                placeholder="accounts@vendor.com" 
                value={expenseData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        {/* SEGMENT 3: Department Class Selection Matrices */}
        <section className="add-expense-card">
          <div className="add-expense-card-header">
            <div className="add-expense-icon-wrapper blue-bg">
              <FiGrid className="add-expense-section-icon" />
            </div>
            <div>
              <h3>Functional Allocation Class</h3>
              <p>Select the overarching classification code corresponding to your department ledger targets</p>
            </div>
          </div>

          <div className="add-expense-category-row">
            {VISUAL_CATEGORIES.map((category) => {
              const IconComponent = category.icon;
              const isActive = expenseData.selectedCategoryCard === category.id;
              return (
                <div 
                  key={category.id}
                  className={`add-expense-cat-card ${isActive ? 'active' : ''}`}
                  onClick={() => handleCategoryCardSelect(category.id)}
                  role="radio"
                  aria-checked={isActive}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCategoryCardSelect(category.id); }}
                >
                  {isActive && <div className="card-badge-check"><FiCheck /></div>}
                  <IconComponent className="cat-card-icon" />
                  <h4>{category.title}</h4>
                  <p>{category.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SEGMENT 4: File Evidence Receipts Ingestion Dropzone */}
        <section className="add-expense-card">
          <div className="add-expense-card-header">
            <div className="add-expense-icon-wrapper blue-bg">
              <FiPaperclip className="add-expense-section-icon" />
            </div>
            <div>
              <h3>Audit Receipt / Legal Voucher Evidence</h3>
              <p>Upload files for validation and taxation clearance protocols</p>
            </div>
          </div>

          <div className="add-expense-upload-container">
            <div 
              className={`add-expense-upload-box ${isDragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                accept=".png, .jpg, .jpeg, .pdf" 
                onChange={(e) => handleFileValidationAndIngestion(e.target.files[0])} 
                style={{ display: 'none' }} 
              />
              <FiUploadCloud className="upload-cloud-icon" />
              <p><span>Click here to ingest</span> or drop documentation asset blocks</p>
              <span className="upload-subtext">Verified Extension Classes: PNG, JPG, JPEG, PDF (Size Cap: 5MB)</span>
            </div>

            <div className="add-expense-uploaded-display">
              <label>Asset Attachment Stage Status</label>
              <div className={`uploaded-file-status ${uploadedFile ? 'has-file' : ''}`}>
                {uploadedFile ? (
                  <div className="file-status-wrapper">
                    <span className="file-info-sub">
                      <FiFile className="file-icon-attached" /> 
                      {uploadedFile.name} 
                      <span className="file-size-badge">({(uploadedFile.size / 1024).toFixed(1)} KB)</span>
                    </span>
                    <button 
                      type="button" 
                      className="remove-file-action" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedFile(null);
                      }}
                      title="Purge attachment stream"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ) : (
                  <span className="no-file-placeholder-text">No documentation asset bound. Secure environment ready.</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SUBMISSION INTERACTION CONTROL LAYER */}
        <footer className="add-expense-actions-bar">
          <button 
            type="button" 
            className="btn-cancel" 
            onClick={handleResetRollback}
          >
            <FiArrowLeft className="btn-icon" /> Cancel
          </button>
          
          {/* New Download Action Button Added Safely inside the Layout Framework */}
          <button 
            type="button" 
            className="btn-download-draft" 
            onClick={handleDownloadPayload}
            title="Download Log Data"
          >
            <FiDownload className="btn-icon" /> Download Log
          </button>
          
          <button 
            type="submit" 
            className="btn-save"
          >
            <FiSave className="btn-icon" /> Save Expenses
          </button>
        </footer>

      </form>
    </div>
  );
};

export default AddExpense;