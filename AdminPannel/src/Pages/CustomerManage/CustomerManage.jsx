import React, { useState, useEffect, useRef } from 'react';
import './CustomerManage.css';

// Added subscription dates to initial customer mock data
const initialCustomers = [
  { id: 1, name: 'John Doe', phone: '9876543210', address: 'Patia, Bhubaneswar', totalOrders: 12, status: 'Active', avatar: null, subStartDate: '2026-01-10', subEndDate: '2026-07-10' },
  { id: 2, name: 'Alice Smith', phone: '8765432109', address: 'KIIT Square, Bhubaneswar', totalOrders: 8, status: 'Active', avatar: null, subStartDate: '2026-02-15', subEndDate: '2026-08-15' },
  { id: 3, name: 'Robert Brown', phone: '7654321098', address: 'Sailashree Vihar, Bhubaneswar', totalOrders: 15, status: 'Active', avatar: null, subStartDate: '2026-03-01', subEndDate: '2026-09-01' },
  { id: 4, name: 'Michael Lee', phone: '6543210987', address: 'Chandrasekharpur, Bhubaneswar', totalOrders: 6, status: 'Inactive', avatar: null, subStartDate: '', subEndDate: '' },
  { id: 5, name: 'David Wilson', phone: '5432109876', address: 'Jaydev Vihar, Bhubaneswar', totalOrders: 10, status: 'Active', avatar: null, subStartDate: '2026-05-12', subEndDate: '2026-11-12' },
  { id: 6, name: 'Emily Davis', phone: '4321098765', address: 'Nayapalli, Bhubaneswar', totalOrders: 4, status: 'Active', avatar: null, subStartDate: '2026-04-18', subEndDate: '2026-10-18' },
];

const CustomerManage = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals visibility states
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCustomerForSub, setSelectedCustomerForSub] = useState(null);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  
  // Add Customer Form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    totalOrders: '',
    avatar: null
  });

  // Edit Subscription Dates Form states
  const [subDatesForm, setSubDatesForm] = useState({
    subStartDate: '',
    subEndDate: ''
  });

  const dropdownRef = useRef(null);

  // Close dropdown menu on outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter lists based on search
  const filteredCustomers = customers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery) ||
    user.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle active/inactive status
  const handleStatusChange = (id, newStatus) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    setActiveDropdownId(null);
  };

  // Profile Image reader
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Handler for onboarding new customers
  const handleAddCustomerSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      totalOrders: parseInt(formData.totalOrders, 10) || 0,
      status: 'Active',
      avatar: formData.avatar,
      subStartDate: '',
      subEndDate: ''
    };

    setCustomers([...customers, newCustomer]);
    setFormData({ name: '', phone: '', address: '', totalOrders: '', avatar: null });
    setShowAddModal(false);
  };

  // Open the Row Details (Subscription Dates) popup
  const handleRowClick = (customer) => {
    setSelectedCustomerForSub(customer);
    setSubDatesForm({
      subStartDate: customer.subStartDate || '',
      subEndDate: customer.subEndDate || ''
    });
  };

  // Save changes to customer subscription schedule
  const handleUpdateSubscriptionDates = (e) => {
    e.preventDefault();
    setCustomers(prev => prev.map(c => 
      c.id === selectedCustomerForSub.id 
        ? { ...c, subStartDate: subDatesForm.subStartDate, subEndDate: subDatesForm.subEndDate } 
        : c
    ));
    setSelectedCustomerForSub(null);
  };

  return (
    <div className="cm-dashboard-card">
      {/* Upper Brand Control Headers */}
      <div className="cm-header-bar">
        <h2 className="cm-header-bar__title">Customer Management</h2>
        <button 
          className="cm-header-bar__plus-btn"
          onClick={() => setShowAddModal(true)}
          title="Add New Customer"
        >
          ＋
        </button>
      </div>

      {/* Filter and Input Elements Panel */}
      <div className="cm-action-panel">
        <div className="cm-search-container">
          <svg className="cm-search-container__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Search customers..." 
            className="cm-search-container__input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="cm-action-panel__sheet-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </button>
      </div>

      {/* Table Interface */}
      <div className="cm-table-responsive">
        <table className="cm-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Total Orders</th>
              <th>Status</th>
              <th className="cm-text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr 
                key={customer.id} 
                className="cm-table__row"
                onClick={() => handleRowClick(customer)}
              >
                <td className="cm-cell-profile">
                  <div className="cm-cell-profile__avatar-wrap">
                    {customer.avatar ? (
                      <img src={customer.avatar} alt={customer.name} className="cm-cell-profile__img" />
                    ) : (
                      <div className="cm-cell-profile__fallback">
                        {customer.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="cm-cell-profile__name">{customer.name}</span>
                    {customer.subStartDate && (
                      <span className="cm-cell-profile__sub-indicator" title="Subscribed">✓ Active Sub</span>
                    )}
                  </div>
                </td>
                <td className="cm-cell-phone">{customer.phone}</td>
                <td className="cm-cell-address">{customer.address}</td>
                <td className="cm-cell-orders">{customer.totalOrders}</td>
                <td>
                  <span className={`cm-status-badge cm-status-badge--${customer.status.toLowerCase()}`}>
                    {customer.status}
                  </span>
                </td>
                <td className="cm-cell-action cm-text-center">
                  <button 
                    className="cm-cell-action__trigger"
                    onClick={(e) => {
                      e.stopPropagation(); // Stops pop-up from firing when managing status
                      setActiveDropdownId(activeDropdownId === customer.id ? null : customer.id);
                    }}
                  >
                    &#8942;
                  </button>
                  
                  {activeDropdownId === customer.id && (
                    <div className="cm-dropdown" ref={dropdownRef}>
                      <button onClick={(e) => { e.stopPropagation(); handleStatusChange(customer.id, 'Active'); }}>Active</button>
                      <button onClick={(e) => { e.stopPropagation(); handleStatusChange(customer.id, 'Inactive'); }}>Inactive</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* POPUP 1: Add New Customer Form */}
      {showAddModal && (
        <div className="cm-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="cm-modal animate-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cm-modal__header">
              <h3>Add New Customer</h3>
              <button className="cm-modal__close" onClick={() => setShowAddModal(false)}>&times;</button>
            </div>
            
            <form onSubmit={handleAddCustomerSubmit} className="cm-modal-form">
              <div className="cm-modal-form__avatar-section">
                <label className="cm-modal-form__avatar-label" htmlFor="avatar-upload">
                  {formData.avatar ? (
                    <img src={formData.avatar} alt="Preview" className="cm-modal-form__avatar-preview" />
                  ) : (
                    <div className="cm-modal-form__avatar-placeholder">
                      <span>📸</span>
                      <small>Upload Photo</small>
                    </div>
                  )}
                </label>
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  style={{ display: 'none' }} 
                />
              </div>

              <div className="cm-modal-form__field">
                <label>Customer Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Enter customer name" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="cm-modal-form__field">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="Enter 10-digit number" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="cm-modal-form__field">
                <label>Address Info</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Street, City details" 
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div className="cm-modal-form__field">
                <label>Total Orders Count</label>
                <input 
                  type="number" 
                  min="0"
                  placeholder="e.g. 10" 
                  value={formData.totalOrders}
                  onChange={e => setFormData({...formData, totalOrders: e.target.value})}
                />
              </div>

              <button type="submit" className="cm-modal-form__submit-btn">Submit Customer Details</button>
            </form>
          </div>
        </div>
      )}

      {/* POPUP 2: Small Subscription Popup (Triggered by entire row click) */}
      {selectedCustomerForSub && (
        <div className="cm-modal-overlay" onClick={() => setSelectedCustomerForSub(null)}>
          <div className="cm-modal cm-modal--mini animate-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cm-modal__header">
              <h3>Subscription Setup</h3>
              <button className="cm-modal__close" onClick={() => setSelectedCustomerForSub(null)}>&times;</button>
            </div>
            
            <p className="cm-modal__subtitle">Update subscription dates for <strong>{selectedCustomerForSub.name}</strong></p>

            <form onSubmit={handleUpdateSubscriptionDates} className="cm-modal-form">
              <div className="cm-modal-form__field">
                <label>Subscription Start Date</label>
                <input 
                  type="date" 
                  value={subDatesForm.subStartDate}
                  onChange={e => setSubDatesForm({...subDatesForm, subStartDate: e.target.value})}
                />
              </div>

              <div className="cm-modal-form__field">
                <label>Subscription End Date</label>
                <input 
                  type="date" 
                  value={subDatesForm.subEndDate}
                  onChange={e => setSubDatesForm({...subDatesForm, subEndDate: e.target.value})}
                />
              </div>

              <button type="submit" className="cm-modal-form__submit-btn cm-modal-form__submit-btn--accent">
                Save Subscription
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManage;