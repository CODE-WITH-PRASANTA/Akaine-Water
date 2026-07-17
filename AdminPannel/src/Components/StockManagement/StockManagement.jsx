import React, { useState } from 'react';
import { 
  FiShoppingCart, 
  FiPackage, 
  FiFileText, 
  FiSearch, 
  FiCalendar, 
  FiDownload, 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiChevronLeft, 
  FiChevronRight,
  FiX
} from 'react-icons/fi';
import './StockManagement.css';

const StockManagement = () => {
  // Initial dummy state mapping data perfectly to reference text details
  const [purchases, setPurchases] = useState([
    { id: 1, billNo: 'PUR-2507-001', supplier: 'Aqua Suppliers', date: '23 Jul 2025', products: '20L Bottle, 1L Bottle', quantity: 200, amount: '15,600', status: 'Paid' },
    { id: 2, billNo: 'PUR-2507-002', supplier: 'Pure Water Traders', date: '21 Jul 2025', products: '30L Bottle, 1/2 Bottle', quantity: 150, amount: '12,750', status: 'Paid' },
    { id: 3, billNo: 'PUR-2507-003', supplier: 'Crystal Clear Co.', date: '19 Jul 2025', products: '20L Bottle', quantity: 100, amount: '8,200', status: 'Paid' },
    { id: 4, billNo: 'PUR-2507-004', supplier: 'Aqua Suppliers', date: '16 Jul 2025', products: '1L Bottle, 500ml Bottle', quantity: 300, amount: '6,480', status: 'Partial' },
    { id: 5, billNo: 'PUR-2507-005', supplier: 'Water World Pvt. Ltd.', date: '14 Jul 2025', products: '30L Bottle', quantity: 80, amount: '7,600', status: 'Paid' },
    { id: 6, billNo: 'PUR-2507-006', supplier: 'Pure Water Traders', date: '11 Jul 2025', products: '20L Bottle, 1L Bottle', quantity: 180, amount: '14,920', status: 'Unpaid' },
    { id: 7, billNo: 'PUR-2507-007', supplier: 'Aqua Suppliers', date: '08 Jul 2025', products: '1/2 Bottle, 500ml Bottle', quantity: 250, amount: '5,150', status: 'Paid' },
    { id: 8, billNo: 'PUR-2507-008', supplier: 'Crystal Clear Co.', date: '05 Jul 2025', products: '20L Bottle', quantity: 90, amount: '7,380', status: 'Partial' },
    { id: 9, billNo: 'PUR-2507-009', supplier: 'Water World Pvt. Ltd.', date: '02 Jul 2025', products: '30L Bottle, 1L Bottle', quantity: 120, amount: '10,240', status: 'Paid' },
    { id: 10, billNo: 'PUR-2507-010', supplier: 'Aqua Suppliers', date: '01 Jul 2025', products: '500ml Bottle', quantity: 400, amount: '4,130', status: 'Unpaid' },
  ]);

  // Operational states
  const [searchQuery, setSearchQuery] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Form states for full CRUD actions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    billNo: '',
    supplier: '',
    date: '',
    products: '',
    quantity: '',
    amount: '',
    status: 'Paid'
  });

  // Handle live inputs dynamically
  const filteredPurchases = purchases.filter((item) => {
    const matchesSearch = item.billNo.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.products.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSupplier = supplierFilter === 'All' || item.supplier === supplierFilter;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesSupplier && matchesStatus;
  });

  // Action methods
  const openAddModal = () => {
    setIsEditing(false);
    setFormData({ billNo: `PUR-2507-0${purchases.length + 1}`, supplier: '', date: '25 Jul 2025', products: '', quantity: '', amount: '', status: 'Paid' });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setIsEditing(true);
    setEditingId(item.id);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDelete = (id, billNo) => {
    if (window.confirm(`Are you sure you want to delete purchase record ${billNo}?`)) {
      setPurchases(purchases.filter(p => p.id !== id));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setPurchases(purchases.map(p => p.id === editingId ? { ...formData, quantity: Number(formData.quantity) } : p));
    } else {
      setPurchases([...purchases, { ...formData, id: Date.now(), quantity: Number(formData.quantity) }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="stock-management-container">
      {/* Top Header Row Layout */}
      <div className="stock-management-header-section">
        <div className="stock-management-title-block">
          <h2>Purchase History</h2>
          <p>Dashboard &gt; Stock Management &gt; Purchase History</p>
        </div>
        <div className="stock-management-global-actions">
          <button className="stock-management-btn-export" onClick={() => alert('Exporting data format...')}>
            <FiDownload /> Export
          </button>
          <button className="stock-management-btn-primary" onClick={openAddModal}>
            <FiPlus /> New Purchase
          </button>
        </div>
      </div>

      {/* KPI Statistic Cards Grid Layout */}
      <div className="stock-management-kpi-grid">
        <div className="stock-management-kpi-card">
          <div className="stock-management-icon-wrapper blue-theme">
            <FiShoppingCart size={22} />
          </div>
          <div className="stock-management-kpi-details">
            <span className="stock-management-kpi-label">Total Purchases</span>
            <h3>36</h3>
            <span className="stock-management-kpi-subtext">This Month</span>
          </div>
        </div>

        <div className="stock-management-kpi-card">
          <div className="stock-management-icon-wrapper green-theme">
            <span className="stock-management-rupee-symbol">₹</span>
          </div>
          <div className="stock-management-kpi-details">
            <span className="stock-management-kpi-label">Total Amount</span>
            <h3>₹1,86,450</h3>
            <span className="stock-management-kpi-subtext">This Month</span>
          </div>
        </div>

        <div className="stock-management-kpi-card">
          <div className="stock-management-icon-wrapper purple-theme">
            <FiPackage size={22} />
          </div>
          <div className="stock-management-kpi-details">
            <span className="stock-management-kpi-label">Total Quantity</span>
            <h3>2,450</h3>
            <span className="stock-management-kpi-subtext">This Month</span>
          </div>
        </div>

        <div className="stock-management-kpi-card">
          <div className="stock-management-icon-wrapper orange-theme">
            <FiFileText size={22} />
          </div>
          <div className="stock-management-kpi-details">
            <span className="stock-management-kpi-label">Pending Bills</span>
            <h3>5</h3>
            <span className="stock-management-kpi-subtext">This Month</span>
          </div>
        </div>
      </div>

      {/* Main Filter Toolbar Elements */}
      <div className="stock-management-filter-wrapper">
        <div className="stock-management-filter-left-row">
          <div className="stock-management-input-icon-group pointer-cursor">
            <FiCalendar className="field-icon-left" />
            <input type="text" defaultValue="01/07/2025 - 23/07/2025" readOnly />
          </div>

          <select value={supplierFilter} onChange={(e) => setSupplierFilter(e.target.value)} className="stock-management-dropdown-select">
            <option value="All">All Suppliers</option>
            <option value="Aqua Suppliers">Aqua Suppliers</option>
            <option value="Pure Water Traders">Pure Water Traders</option>
            <option value="Crystal Clear Co.">Crystal Clear Co.</option>
            <option value="Water World Pvt. Ltd.">Water World Pvt. Ltd.</option>
          </select>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="stock-management-dropdown-select">
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>

        <div className="stock-management-search-wrapper">
          <FiSearch className="stock-management-search-icon" />
          <input 
            type="text" 
            placeholder="Search purchase..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Data Content Area */}
      <div className="stock-management-table-container">
        <table className="stock-management-data-table">
          <thead>
            <tr>
              <th width="40">#</th>
              <th>Bill No.</th>
              <th>Supplier Name</th>
              <th>Purchase Date</th>
              <th>Products</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.length > 0 ? (
              filteredPurchases.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="stock-management-semibold-text">{item.billNo}</td>
                  <td>{item.supplier}</td>
                  <td>{item.date}</td>
                  <td className="stock-management-products-column">{item.products}</td>
                  <td>{item.quantity}</td>
                  <td className="stock-management-semibold-text">₹{item.amount}</td>
                  <td>
                    <span className={`stock-management-badge badge-${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="stock-management-action-cell-buttons">
                      <button 
                        className="stock-management-action-btn edit" 
                        title="Edit Record" 
                        onClick={() => openEditModal(item)}
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button 
                        className="stock-management-action-btn delete" 
                        title="Delete Record" 
                        onClick={() => handleDelete(item.id, item.billNo)}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="stock-management-no-records">No purchase entries match your criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination Section Row */}
      <div className="stock-management-pagination-section">
        <span className="stock-management-pagination-info">
          Showing 1 to {filteredPurchases.length} of {purchases.length} entries
        </span>
        <div className="stock-management-pagination-controls">
          <button className="stock-management-pagination-arrow"><FiChevronLeft /></button>
          <button className="stock-management-pagination-number actively-selected">1</button>
          <button className="stock-management-pagination-number">2</button>
          <button className="stock-management-pagination-number">3</button>
          <button className="stock-management-pagination-number">4</button>
          <button className="stock-management-pagination-arrow"><FiChevronRight /></button>
        </div>
      </div>

      {/* Functional Dynamic Modal Box */}
      {isModalOpen && (
        <div className="stock-management-modal-overlay">
          <div className="stock-management-modal-dialog">
            <div className="stock-management-modal-header">
              <h3>{isEditing ? 'Modify Purchase Entry' : 'Register New Purchase Entry'}</h3>
              <button className="stock-management-modal-close" onClick={() => setIsModalOpen(false)}>
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="stock-management-modal-form">
              <div className="form-group-row">
                <div className="stock-management-field-wrapper">
                  <label>Bill Number</label>
                  <input 
                    type="text" 
                    value={formData.billNo} 
                    onChange={(e) => setFormData({...formData, billNo: e.target.value})} 
                    required 
                  />
                </div>
                <div className="stock-management-field-wrapper">
                  <label>Supplier Name</label>
                  <input 
                    type="text" 
                    value={formData.supplier} 
                    onChange={(e) => setFormData({...formData, supplier: e.target.value})} 
                    placeholder="e.g. Aqua Suppliers"
                    required 
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="stock-management-field-wrapper">
                  <label>Purchase Date</label>
                  <input 
                    type="text" 
                    value={formData.date} 
                    onChange={(e) => setFormData({...formData, date: e.target.value})} 
                    placeholder="e.g. 23 Jul 2025"
                    required 
                  />
                </div>
                <div className="stock-management-field-wrapper">
                  <label>Products Description</label>
                  <input 
                    type="text" 
                    value={formData.products} 
                    onChange={(e) => setFormData({...formData, products: e.target.value})} 
                    placeholder="e.g. 20L Bottle"
                    required 
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="stock-management-field-wrapper">
                  <label>Total Quantity</label>
                  <input 
                    type="number" 
                    value={formData.quantity} 
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})} 
                    required 
                  />
                </div>
                <div className="stock-management-field-wrapper">
                  <label>Amount (Total)</label>
                  <input 
                    type="text" 
                    value={formData.amount} 
                    onChange={(e) => setFormData({...formData, amount: e.target.value})} 
                    placeholder="e.g. 15,600"
                    required 
                  />
                </div>
              </div>

              <div className="stock-management-field-wrapper">
                <label>Payment Status</label>
                <select 
                  value={formData.status} 
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="stock-management-modal-select"
                >
                  <option value="Paid">Paid</option>
                  <option value="Partial">Partial</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>

              <div className="stock-management-modal-actions-container">
                <button type="button" className="btn-secondary-action" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary-action">{isEditing ? 'Save Changes' : 'Add Record'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockManagement;