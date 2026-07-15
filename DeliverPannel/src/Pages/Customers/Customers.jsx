import React, { useState } from 'react';
import './Customers.css';
// Ensure your water jar image (e.g., water-jar.png) is in the same directory
import jarImage from '../../assets/w1.png';

const MOCK_CUSTOMERS = Array.from({ length: 15 }, (_, i) => ({
  id: `CUST-100${i + 1}`,
  name: i % 2 === 0 ? `Rahul Kumar` : `Jordan Smith`,
  location: i % 2 === 0 ? `KIIT Square, Bhubaneswar` : `Austin, TX`,
  phone: i % 2 === 0 ? `9876543210` : `1234567890`,
  email: i % 2 === 0 ? `rahul@example.com` : `jordan@example.com`,
  address: i % 2 === 0 ? `KIIT Square, Bhubaneswar` : `789 Oak St`,
  image: `https://picsum.photos/seed/${i + 1}/150`,
  status: "Active",
  ordered: "2 Jars (20L)",
  emptyReturn: "2",
  amount: "₹160",
  paymentStatus: "Paid",
  paymentMethod: "UPI"
}));

const Customers = () => {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // States for sub-popups
  const [isExtraJarOpen, setIsExtraJarOpen] = useState(false);
  const [isCollectEmptyOpen, setIsCollectEmptyOpen] = useState(false);

  // Form states for Extra Jars Form
  const [extraJarCount, setExtraJarCount] = useState(1);
  const [extraJarReason, setExtraJarReason] = useState("Customer Requested");

  // Form states for Collect Empty Form
  const [emptyCondition, setEmptyCondition] = useState("Good");
  const [emptyRemarks, setEmptyRemarks] = useState("");

  const itemsPerPage = 10;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const toggleStatus = (id, newStatus) => {
    setCustomers(prev =>
      prev.map(cust => (cust.id === id ? { ...cust, status: newStatus } : cust))
    );
    setActiveMenuId(null);
  };

  const handleMarkAsDelivered = (id) => {
    alert(`Marked delivery status for Customer ${id}!`);
    setSelectedCustomer(null);
  };

  const handleAddExtraJarSubmit = (e) => {
    e.preventDefault();
    alert(`Added ${extraJarCount} Extra Jar(s) for ${selectedCustomer.name}. Reason: ${extraJarReason}`);
    setIsExtraJarOpen(false);
    setExtraJarCount(1); // Reset
  };

  const handleCollectEmptySubmit = (e) => {
    e.preventDefault();
    alert(`Collected ${selectedCustomer.emptyReturn} Empty Jars. Condition: ${emptyCondition}. Remarks: ${emptyRemarks || 'None'}`);
    setIsCollectEmptyOpen(false);
    setEmptyRemarks(""); // Reset
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="customers-container">
      <header className="customers-header">
        <h1 className="header-title">Customers</h1>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search by name, ID or location..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </header>

      <div className="customers-list">
        {currentItems.length > 0 ? (
          currentItems.map((customer) => (
            <div 
              key={customer.id} 
              className="customer-card"
              onClick={() => setSelectedCustomer(customer)}
            >
              <div className="card-left-section">
                <img src={customer.image} alt={customer.name} className="customer-avatar" />
                
                <div className="customer-identity-group">
                  <div className="identity-primary">
                    <h3 className="customer-name">{customer.name}</h3>
                    <span className="customer-id">{customer.id}</span>
                  </div>
                  <span className="customer-location-middle">📍 {customer.location}</span>
                </div>
              </div>

              <div className="card-right-section" onClick={(e) => e.stopPropagation()}>
                <span className={`status-badge-pill ${customer.status.toLowerCase()}`}>
                  {customer.status}
                </span>

                <div className="action-menu-container">
                  <button 
                    className="action-trigger" 
                    onClick={() => setActiveMenuId(activeMenuId === customer.id ? null : customer.id)}
                  >
                    ⋮
                  </button>
                  
                  {activeMenuId === customer.id && (
                    <div className="action-dropdown">
                      <button 
                        className={`dropdown-item ${customer.status === 'Active' ? 'disabled' : ''}`}
                        onClick={() => toggleStatus(customer.id, 'Active')}
                      >
                        Set Active
                      </button>
                      <button 
                        className={`dropdown-item ${customer.status === 'Inactive' ? 'disabled' : ''}`}
                        onClick={() => toggleStatus(customer.id, 'Inactive')}
                      >
                        Set Inactive
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No customers found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="page-btn"
          >
            « Prev
          </button>
          
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setCurrentPage(idx + 1)}
              className={`page-btn ${currentPage === idx + 1 ? 'active' : ''}`}
            >
              {idx + 1}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="page-btn"
          >
            Next »
          </button>
        </div>
      )}

      {/* Main Details Popup */}
      {selectedCustomer && !isExtraJarOpen && !isCollectEmptyOpen && (
        <div className="modal-overlay" onClick={() => setSelectedCustomer(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCustomer(null)}>×</button>
            
            <div className="modal-user-profile-row">
              <img src={selectedCustomer.image} alt={selectedCustomer.name} className="modal-user-avatar" />
              <div className="modal-user-info-text">
                <h2 className="modal-user-name">{selectedCustomer.name}</h2>
                <span className="modal-user-phone">{selectedCustomer.phone}</span>
                <span className="modal-user-sublocation">{selectedCustomer.location}</span>
              </div>
            </div>

            <div className="modal-details-container">
              <h3 className="section-subtitle">Order Details</h3>
              
              <div className="detail-row">
                <span className="detail-label">Ordered</span>
                <span className="detail-value text-bold">{selectedCustomer.ordered}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Empty Return</span>
                <span className="detail-value text-bold">{selectedCustomer.emptyReturn}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Amount</span>
                <span className="detail-value text-bold">
                  {selectedCustomer.amount} <span className="badge-paid">{selectedCustomer.paymentStatus}</span>
                </span>
              </div>
              
              <div className="payment-method-block">
                <span className="detail-label">Payment Method</span>
                <span className="detail-value text-bold method-type">{selectedCustomer.paymentMethod}</span>
              </div>
            </div>

            <div className="action-button-grid-row">
              <a href={`tel:${selectedCustomer.phone}`} className="grid-action-btn">
                <svg viewBox="0 0 24 24" className="icon-blue">
                  <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02z"/>
                </svg>
                <span>Call</span>
              </a>

              <a 
                href={`https://wa.me/${selectedCustomer.phone.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="grid-action-btn"
              >
                <svg viewBox="0 0 24 24" className="icon-green">
                  <path fill="currentColor" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.66c2.2 0 4.27.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.5-3.66 8.16-8.16 8.16c-1.44 0-2.85-.38-4.1-1.11l-.29-.18l-3.05.8l.81-2.97l-.2-.31a8.18 8.18 0 0 1-1.25-4.39c0-4.5 3.66-8.17 8.17-8.17m-3.6 4.75c-.2-.44-.4-.45-.59-.45c-.15 0-.33-.01-.51-.01c-.18 0-.48.07-.73.34c-.26.27-.98.96-.98 2.35c0 1.39 1.01 2.74 1.15 2.93c.14.19 2 3.05 4.84 4.28c.68.29 1.21.47 1.62.6c.68.22 1.3.19 1.79.11c.54-.08 1.66-.68 1.89-1.34c.23-.66.23-1.23.16-1.34c-.07-.11-.26-.18-.55-.33c-.29-.14-1.69-.84-1.96-.93c-.26-.1-.46-.14-.65.14c-.18.28-.72.93-.88 1.11c-.16.19-.33.21-.61.07c-.29-.15-1.22-.45-2.32-1.43c-.86-.77-1.44-1.72-1.61-2c-.17-.29-.02-.44.13-.59c.13-.13.29-.34.44-.51c.15-.17.2-.29.29-.49c.09-.2.04-.38-.02-.51c-.06-.13-.58-1.4-0.8-1.93"/>
                </svg>
                <span>WhatsApp</span>
              </a>

              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedCustomer.address + ' ' + selectedCustomer.location)}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="grid-action-btn"
              >
                <svg viewBox="0 0 24 24" className="icon-blue">
                  <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5"/>
                </svg>
                <span>Navigate</span>
              </a>
            </div>

            <div className="utility-buttons-row">
              <button className="util-btn" onClick={() => setIsExtraJarOpen(true)}>Add Extra Jar</button>
              <button className="util-btn" onClick={() => setIsCollectEmptyOpen(true)}>Collect Empty</button>
              <button className="util-btn" onClick={() => alert("Upload Photo functionality trigger")}>Upload Photo</button>
            </div>

            <button 
              onClick={() => handleMarkAsDelivered(selectedCustomer.id)}
              className="footer-submit-btn"
            >
              Mark as Delivered
            </button>
          </div>
        </div>
      )}

      {/* Sub-Popup 1: Add Extra Jar Form */}
      {isExtraJarOpen && selectedCustomer && (
        <div className="modal-overlay" onClick={() => setIsExtraJarOpen(false)}>
          <div className="modal-content sub-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsExtraJarOpen(false)}>×</button>
            
            <form onSubmit={handleAddExtraJarSubmit} className="form-layout-with-image">
              <div className="form-left-inputs">
                <div className="sub-form-group">
                  <label className="sub-form-label">Customer Name</label>
                  <input 
                    type="text" 
                    className="sub-form-input static-input" 
                    value={selectedCustomer.name} 
                    readOnly 
                  />
                </div>

                <div className="sub-form-group">
                  <label className="sub-form-label">Extra Jars</label>
                  <div className="counter-container">
                    <button 
                      type="button" 
                      className="counter-btn" 
                      onClick={() => setExtraJarCount(Math.max(1, extraJarCount - 1))}
                    >
                      −
                    </button>
                    <span className="counter-value">{extraJarCount}</span>
                    <button 
                      type="button" 
                      className="counter-btn" 
                      onClick={() => setExtraJarCount(extraJarCount + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="sub-form-group">
                  <label className="sub-form-label">Total Amount</label>
                  <div className="sub-form-amount">₹{extraJarCount * 80}</div>
                </div>

                <div className="sub-form-group">
                  <label className="sub-form-label">Reason</label>
                  <select 
                    className="sub-form-select" 
                    value={extraJarReason} 
                    onChange={(e) => setExtraJarReason(e.target.value)}
                  >
                    <option value="Customer Requested">Customer Requested</option>
                    <option value="Damaged Exchange">Damaged Exchange</option>
                    <option value="Function/Event Addon">Function/Event Addon</option>
                  </select>
                </div>
              </div>

              <div className="form-right-graphics">
                <img 
                  src={jarImage} 
                  alt="Water Jar" 
                  className="jar-display-graphic" 
                />
              </div>

              <button type="submit" className="footer-submit-btn blue-action-btn">
                Add & Update Stock
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Sub-Popup 2: Collect Empty Form */}
      {isCollectEmptyOpen && selectedCustomer && (
        <div className="modal-overlay" onClick={() => setIsCollectEmptyOpen(false)}>
          <div className="modal-content sub-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsCollectEmptyOpen(false)}>×</button>
            
            <form onSubmit={handleCollectEmptySubmit} className="form-layout-with-image">
              <div className="form-left-inputs">
                <div className="sub-form-group">
                  <label className="sub-form-label">Collected</label>
                  <div className="sub-form-static-text">{selectedCustomer.emptyReturn} Jars</div>
                </div>

                <div className="sub-form-group">
                  <label className="sub-form-label">Condition</label>
                  <div className="radio-horizontal-group">
                    {["Good", "Not Returned", "Damaged"].map((cond) => (
                      <label key={cond} className="radio-label-pill">
                        <input 
                          type="radio" 
                          name="condition" 
                          value={cond} 
                          checked={emptyCondition === cond}
                          onChange={() => setEmptyCondition(cond)} 
                        />
                        <span>{cond}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="sub-form-group">
                  <label className="sub-form-label">Remarks (Optional)</label>
                  <input 
                    type="text" 
                    className="sub-form-input text-field-box" 
                    placeholder="Enter remarks here..."
                    value={emptyRemarks}
                    onChange={(e) => setEmptyRemarks(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-right-graphics">
                <img 
                  src={jarImage} 
                  alt="Empty Water Jar" 
                  className="jar-display-graphic handles-variant" 
                />
              </div>

              <button type="submit" className="footer-submit-btn blue-action-btn">
                Save Return
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;