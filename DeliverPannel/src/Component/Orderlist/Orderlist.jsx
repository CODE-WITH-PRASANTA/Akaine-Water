import React, { useState, useMemo } from 'react';
import './OrderList.css';

// 10 Dummy Records
const DUMMY_DATA = [
  { id: '#ORD125', customer: 'Amit Rout', area: 'Patia', items: 2, amount: 160, status: 'Pending', phone: '9876543210', address: 'KIIT Square, Bhubaneswar', orderedItems: '2 Jars (20L)', emptyReturn: 2, paymentMethod: 'UPI' },
  { id: '#ORD124', customer: 'Rahul Kumar', area: 'KIIT Square', items: 3, amount: 240, status: 'Pending', phone: '9876543210', address: 'KIIT Square, Bhubaneswar', orderedItems: '3 Jars (20L)', emptyReturn: 2, paymentMethod: 'UPI' },
  { id: '#ORD123', customer: 'Rakesh Sahoo', area: 'Sailashree Vihar', items: 1, amount: 80, status: 'Delivered', phone: '9876543211', address: 'Sailashree Vihar, Bhubaneswar', orderedItems: '1 Jar (20L)', emptyReturn: 1, paymentMethod: 'Cash' },
  { id: '#ORD122', customer: 'Sanjay Behera', area: 'Chandrasekharpur', items: 2, amount: 160, status: 'Pending', phone: '9876543212', address: 'Chandrasekharpur, Bhubaneswar', orderedItems: '2 Jars (20L)', emptyReturn: 2, paymentMethod: 'UPI' },
  { id: '#ORD121', customer: 'Priya Sharma', area: 'Patia', items: 2, amount: 160, status: 'Delivered', phone: '9876543213', address: 'Patia, Bhubaneswar', orderedItems: '2 Jars (20L)', emptyReturn: 0, paymentMethod: 'Card' },
  { id: '#ORD120', customer: 'Ananya Mishra', area: 'Jaydev Vihar', items: 4, amount: 320, status: 'Rejected', phone: '9876543214', address: 'Jaydev Vihar, Bhubaneswar', orderedItems: '4 Jars (20L)', emptyReturn: 4, paymentMethod: 'UPI' },
  { id: '#ORD119', customer: 'Deepak Jena', area: 'Khandagiri', items: 1, amount: 80, status: 'Pending', phone: '9876543215', address: 'Khandagiri, Bhubaneswar', orderedItems: '1 Jar (20L)', emptyReturn: 1, paymentMethod: 'Cash' },
  { id: '#ORD118', customer: 'Smruti Ranjan', area: 'Cuttack Road', items: 3, amount: 240, status: 'Delivered', phone: '9876543216', address: 'Cuttack Road, Bhubaneswar', orderedItems: '3 Jars (20L)', emptyReturn: 3, paymentMethod: 'UPI' },
  { id: '#ORD117', customer: 'Tapan Panda', area: 'Vani Vihar', items: 2, amount: 160, status: 'Pending', phone: '9876543217', address: 'Vani Vihar, Bhubaneswar', orderedItems: '2 Jars (20L)', emptyReturn: 2, paymentMethod: 'UPI' },
  { id: '#ORD116', customer: 'Liza Dash', area: 'Old Town', items: 1, amount: 80, status: 'Rejected', phone: '9876543218', address: 'Old Town, Bhubaneswar', orderedItems: '1 Jar (20L)', emptyReturn: 1, paymentMethod: 'Cash' }
];

const ITEMS_PER_PAGE = 5;

const OrderList = () => {
  const [orders, setOrders] = useState(DUMMY_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Status Action Handler
  const updateStatus = (id, newStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => order.id === id ? { ...order, status: newStatus } : order)
    );
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  // Filtered Records based on search string
  const filteredOrders = useMemo(() => {
    return orders.filter(order =>
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.area.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [orders, searchQuery]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Functional action click shortcuts
  const handleCall = (phone) => window.location.href = `tel:${phone}`;
  const handleWhatsApp = (phone) => window.open(`https://wa.me/${phone}`, '_blank');
  const handleNavigate = (address) => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');

  return (
    <div className="order-dashboard-container">
      {/* Table Main Wrapper Layout */}
      <div className="order-card-wrapper">
        <h2 className="section-title">Order List</h2>
        
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search here..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); 
            }}
            className="search-input"
          />
        </div>

        <div className="table-responsive">
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Area</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id-cell" onClick={() => setSelectedOrder(order)}>
                    {order.id}
                  </td>
                  <td className="customer-cell" onClick={() => setSelectedOrder(order)}>
                    {order.customer}
                  </td>
                  <td>{order.area}</td>
                  <td className="bold-text">{order.items}</td>
                  <td className="bold-text">{order.amount}</td>
                  <td>
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons-cell">
                      <button className="btn-action btn-deliver" onClick={() => updateStatus(order.id, 'Delivered')}>Deliver</button>
                      <button className="btn-action btn-pending" onClick={() => updateStatus(order.id, 'Pending')}>Pending</button>
                      <button className="btn-action btn-reject" onClick={() => updateStatus(order.id, 'Rejected')}>Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedOrders.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="pagination-container">
          <button 
            className="pagination-btn" 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx + 1}
                className={`page-number-btn ${currentPage === idx + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <button 
            className="pagination-btn" 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        <button className="view-all-btn">View All Orders</button>
      </div>

      {/* Popup / Modal Details Section */}
      {selectedOrder && (
        <div className="modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSelectedOrder(null)}>×</button>
            
            <h2 className="section-title">Order Details</h2>
            
            <div className="customer-profile-section">
              <div className="avatar-placeholder">
                <span className="avatar-icon">👤</span>
              </div>
              <div className="customer-meta">
                <h3>{selectedOrder.customer}</h3>
                <p className="phone-text">{selectedOrder.phone}</p>
                <p className="address-text">{selectedOrder.address}</p>
              </div>
            </div>

            <div className="order-details-body">
              <h4>Order Details</h4>
              <div className="details-row">
                <span>Ordered</span>
                <span className="bold-text">{selectedOrder.orderedItems}</span>
              </div>
              <div className="details-row">
                <span>Empty Return</span>
                <span className="bold-text">{selectedOrder.emptyReturn}</span>
              </div>
              <div className="details-row">
                <span>Amount</span>
                <span className="amount-value">₹{selectedOrder.amount} <small className="paid-tag">Paid</small></span>
              </div>

              <div className="payment-method-section">
                <h4>Payment Method</h4>
                <p className="bold-text text-uppercase">{selectedOrder.paymentMethod}</p>
              </div>
            </div>

            {/* Top Primary Actions */}
            <div className="grid-action-buttons">
              <button className="grid-btn" onClick={() => handleCall(selectedOrder.phone)}>
                <span className="btn-icon call-color">📞</span>
                <span>Call</span>
              </button>
              <button className="grid-btn" onClick={() => handleWhatsApp(selectedOrder.phone)}>
                <span className="btn-icon whatsapp-color">💬</span>
                <span>WhatsApp</span>
              </button>
              <button className="grid-btn" onClick={() => handleNavigate(selectedOrder.address)}>
                <span className="btn-icon navigate-color">📍</span>
                <span>Navigate</span>
              </button>
            </div>

            {/* Secondary Action Options */}
            <div className="grid-secondary-buttons">
              <button className="secondary-btn" onClick={() => alert('Add Extra Jar triggered')}>Add Extra Jar</button>
              <button className="secondary-btn" onClick={() => alert('Collect Empty triggered')}>Collect Empty</button>
              <button className="secondary-btn" onClick={() => alert('Upload Photo triggered')}>Upload Photo</button>
            </div>

            {/* Main Primary Bottom Action Trigger */}
            <button 
              className={`primary-submit-btn status-bg-${selectedOrder.status.toLowerCase()}`}
              onClick={() => {
                updateStatus(selectedOrder.id, 'Delivered');
                alert('Order status marked as Delivered!');
              }}
            >
              Mark as Delivered ({selectedOrder.status})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;