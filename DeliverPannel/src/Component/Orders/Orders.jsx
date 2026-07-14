import React, { useState, useEffect, useRef } from 'react';
import './Orders.css';

// Mock Data matching your exact image layout
const initialOrders = [
  { 
    id: '#ORD125', 
    customer: 'Amit Raut', 
    phone: '98765-43210', 
    area: 'Patia, Bhubaneswar', 
    items: 2, 
    amount: 160, 
    status: 'Pending',
    orderedDetails: '2 Jars (20L)',
    emptyReturn: 2,
    paymentMethod: 'UPI'
  },
  { 
    id: '#ORD124', 
    customer: 'Rahul Kumar', 
    phone: '98765-43210', 
    area: 'KIIT Square, Bhubaneswar', 
    items: 3, 
    amount: 240, 
    status: 'Pending',
    orderedDetails: '3 Jars (20L)',
    emptyReturn: 2,
    paymentMethod: 'UPI'
  },
  { 
    id: '#ORD123', 
    customer: 'Rakesh Sahoo', 
    phone: '98765-11111', 
    area: 'Sailashree Vihar, Bhubaneswar', 
    items: 1, 
    amount: 80, 
    status: 'Delivered',
    orderedDetails: '1 Jar (20L)',
    emptyReturn: 1,
    paymentMethod: 'Cash'
  },
  { 
    id: '#ORD122', 
    customer: 'Sanjay Behera', 
    phone: '98765-22222', 
    area: 'Chandrasekharpur, Bhubaneswar', 
    items: 2, 
    amount: 160, 
    status: 'Pending',
    orderedDetails: '2 Jars (20L)',
    emptyReturn: 1,
    paymentMethod: 'UPI'
  },
  { 
    id: '#ORD121', 
    customer: 'Priyo Sharma', 
    phone: '98765-33333', 
    area: 'Patia, Bhubaneswar', 
    items: 2, 
    amount: 160, 
    status: 'Delivered',
    orderedDetails: '2 Jars (20L)',
    emptyReturn: 2,
    paymentMethod: 'UPI'
  },
];

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter orders based on search query
  const filteredOrders = orders.filter(order => 
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setActiveDropdownId(null);
  };

  const toggleDropdown = (e, orderId) => {
    e.stopPropagation(); // Prevent opening the detail modal when clicking dropdown
    setActiveDropdownId(activeDropdownId === orderId ? null : orderId);
  };

  return (
    <div className="orders-theme-blue-container">
      {/* Search Header */}
      <div className="orders-blue-search-wrapper">
        <svg className="blue-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          placeholder="Search here..." 
          className="orders-blue-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Orders Table Wrapper for responsiveness */}
      <div className="orders-blue-table-responsive">
        <table className="orders-blue-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Area</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th className="blue-text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr 
                key={order.id} 
                className="order-blue-row"
                onClick={() => setSelectedOrder(order)}
              >
                <td className="order-blue-id">{order.id}</td>
                <td className="customer-blue-name">{order.customer}</td>
                <td className="order-blue-area">{order.area.split(',')[0]}</td>
                <td className="order-blue-items">{order.items}</td>
                <td className="order-blue-amount">₹{order.amount}</td>
                <td>
                  <span className={`blue-status-badge status-blue-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td className="action-blue-cell blue-text-right">
                  <button 
                    className="action-blue-trigger-btn"
                    onClick={(e) => toggleDropdown(e, order.id)}
                  >
                    &#8942;
                  </button>
                  {activeDropdownId === order.id && (
                    <div className="action-blue-dropdown-menu" ref={dropdownRef}>
                      <button onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, 'Delivered'); }}>Deliver</button>
                      <button onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, 'Returned'); }}>Return</button>
                      <button onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, 'Rejected'); }}>Reject</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="view-all-blue-btn">View All Orders</button>

      {/* Details Popup Modal */}
      {selectedOrder && (
        <div className="modal-blue-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-blue-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-blue-close-btn" onClick={() => setSelectedOrder(null)}>&times;</button>
            
            {/* Customer Profile Header */}
            <div className="modal-blue-profile-section">
              <div className="profile-blue-avatar">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="profile-blue-details">
                <h3>{selectedOrder.customer}</h3>
                <p className="profile-blue-phone">{selectedOrder.phone}</p>
                <p className="profile-blue-area">{selectedOrder.area}</p>
              </div>
            </div>

            {/* Order Details Grid */}
            <div className="modal-blue-order-details">
              <h4>Order Details</h4>
              <div className="details-blue-grid-row">
                <span className="blue-grid-label">Ordered</span>
                <span className="blue-grid-value font-blue-semibold">{selectedOrder.orderedDetails}</span>
              </div>
              <div className="details-blue-grid-row">
                <span className="blue-grid-label">Empty Return</span>
                <span className="blue-grid-value font-blue-semibold">{selectedOrder.emptyReturn}</span>
              </div>
              <div className="details-blue-grid-row">
                <span className="blue-grid-label">Amount</span>
                <span className="blue-grid-value amount-blue-paid-wrapper">
                  ₹{selectedOrder.amount} <span className="paid-blue-badge">Paid</span>
                </span>
              </div>
              <div className="details-blue-grid-row mt-blue-12">
                <span className="blue-grid-label sub-blue-heading">Payment Method</span>
              </div>
              <div className="details-blue-grid-row">
                <span className="blue-grid-value font-blue-bold">{selectedOrder.paymentMethod}</span>
              </div>
            </div>

            {/* Quick Action Contact Buttons */}
            <div className="modal-blue-contact-actions">
              <button className="contact-blue-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call</span>
              </button>
              <button className="contact-blue-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>WhatsApp</span>
              </button>
              <button className="contact-blue-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
                <span>Navigate</span>
              </button>
            </div>

            {/* Sub action utility items */}
            <div className="modal-blue-utility-actions">
              <button className="utility-blue-btn">Add Extra Jar</button>
              <button className="utility-blue-btn">Collect Empty</button>
              <button className="utility-blue-btn">Upload Photo</button>
            </div>

            {/* Main CTA */}
            <button 
              className="modal-blue-submit-btn"
              onClick={() => handleStatusChange(selectedOrder.id, 'Delivered')}
            >
              Mark as Delivered
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;