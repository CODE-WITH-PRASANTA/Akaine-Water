import React, { useState } from 'react';
import './Orders.css';

const initialOrders = [
  { id: '#ORD-1001', customer: 'John Doe', amount: 2450, payment: 'Online', status: 'Delivered', date: '08-05-24', hasSubscription: true },
  { id: '#ORD-1002', customer: 'Alice Smith', amount: 1850, payment: 'COD', status: 'Shipped', date: '08-05-24', hasSubscription: false },
  { id: '#ORD-1003', customer: 'Robert Brown', amount: 3200, payment: 'Online', status: 'Delivered', date: '07-05-24', hasSubscription: true },
  { id: '#ORD-1004', customer: 'Michael Lee', amount: 950, payment: 'COD', status: 'Pending', date: '07-05-24', hasSubscription: false },
  { id: '#ORD-1005', customer: 'David Wilson', amount: 4500, payment: 'Online', status: 'Delivered', date: '06-01-24', hasSubscription: false },
  { id: '#ORD-1006', customer: 'Emily Davis', amount: 1150, payment: 'COD', status: 'Canceled', date: '06-05-24', hasSubscription: false },
];

const dummyDeliveryBoys = ['Rahul Sharma', 'Amit Patel', 'Vikram Singh', 'Deepak Kumar'];

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals visibility states
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  // Form states for new subscriptions
  const [subForm, setSubForm] = useState({ name: '', startDate: '', endDate: '', deliveryBoy: '' });
  
  // Form states for updating dates/times
  const [editForm, setEditForm] = useState({ date: '', time: '12:00' });

  // Filter orders based on layout search bar
  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle saving subscription
  const handleSaveSubscription = (e) => {
    e.preventDefault();
    if (!subForm.name) return;

    // Create a new order entry showcasing the checkmark indicator
    const newOrder = {
      id: `#ORD-${1000 + orders.length + 1}`,
      customer: subForm.name,
      amount: 0,
      payment: 'Online',
      status: 'Pending',
      date: subForm.startDate || new Date().toISOString().split('T')[0],
      hasSubscription: true // Automatically gives the blue checkmark
    };

    setOrders([newOrder, ...orders]);
    setSubForm({ name: '', startDate: '', endDate: '', deliveryBoy: '' });
    setShowSubscriptionModal(false);
  };

  // Handle opening row details edit popup
  const handleRowClick = (order) => {
    setEditingOrder(order);
    setEditForm({ date: order.date, time: '10:30' }); // defaults to existing date
  };

  // Save the updated date and time
  const handleSaveEditRow = (e) => {
    e.preventDefault();
    setOrders(prev => prev.map(o => o.id === editingOrder.id ? { ...o, date: editForm.date } : o));
    setEditingOrder(null);
  };

  return (
    <div className="orders-dashboard-wrapper">
      {/* Top Controls Layout Header */}
      <div className="orders-dashboard-header">
        <h2 className="orders-dashboard-title">Order List</h2>
        <div className="orders-header-utility-icons">
          <button className="utility-icon-btn"><span className="icon">📄</span></button>
          <button className="utility-icon-btn"><span className="icon">🔄</span></button>
          <button className="utility-icon-btn"><span className="icon">⚙️</span></button>
        </div>
      </div>

      {/* Filter and Search Actions Section */}
      <div className="orders-filter-action-bar">
        <div className="orders-left-filters">
          <select className="orders-dropdown-select">
            <option>All Orders</option>
            <option>Pending</option>
            <option>Delivered</option>
          </select>
          <button className="orders-filter-btn">Filter</button>
        </div>

        <div className="orders-right-search-group">
          <div className="orders-search-input-container">
            <span className="search-lens">🔍</span>
            <input 
              type="text" 
              placeholder="Search orders..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className="orders-plus-add-btn" 
            onClick={() => setShowSubscriptionModal(true)}
            title="Add New Subscription"
          >
            ＋
          </button>
        </div>
      </div>

      {/* Main Responsive Table View */}
      <div className="orders-table-scroll-container">
        <table className="orders-main-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="orders-table-clickable-row" onClick={() => handleRowClick(order)}>
                <td className="cell-order-id">{order.id}</td>
                <td className="cell-customer-identity">
                  {order.hasSubscription && (
                    <span className="subscription-checkmark-indicator" title="Active Subscriber">✓</span>
                  )}
                  {order.customer}
                </td>
                <td className="cell-amount">₹{order.amount.toLocaleString('en-IN')}</td>
                <td className="cell-payment">{order.payment}</td>
                <td>
                  <span className={`status-pill-accent status-type-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td className="cell-date">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination component segment */}
      <div className="orders-pagination-footer">
        <button className="page-number-btn active">1</button>
        <button className="page-number-btn">2</button>
        <button className="page-number-btn">3</button>
        <span className="page-ellipsis">...</span>
        <button className="page-number-btn">10</button>
      </div>


      {/* POPUP 1: Add Subscription Modal */}
      {showSubscriptionModal && (
        <div className="popup-modal-overlay" onClick={() => setShowSubscriptionModal(false)}>
          <div className="popup-modal-card animate-popup-slide" onClick={(e) => e.stopPropagation()}>
            <div className="popup-modal-header">
              <h3>Create Subscription</h3>
              <button className="popup-close-x" onClick={() => setShowSubscriptionModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleSaveSubscription} className="popup-modal-body-form">
              <div className="form-input-element">
                <label>Customer Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Enter name"
                  value={subForm.name}
                  onChange={e => setSubForm({...subForm, name: e.target.value})}
                />
              </div>
              <div className="form-grid-two-columns">
                <div className="form-input-element">
                  <label>Start Date</label>
                  <input 
                    type="date" 
                    value={subForm.startDate}
                    onChange={e => setSubForm({...subForm, startDate: e.target.value})}
                  />
                </div>
                <div className="form-input-element">
                  <label>End Date</label>
                  <input 
                    type="date" 
                    value={subForm.endDate}
                    onChange={e => setSubForm({...subForm, endDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-input-element">
                <label>Assign Delivery Boy</label>
                <select 
                  value={subForm.deliveryBoy} 
                  onChange={e => setSubForm({...subForm, deliveryBoy: e.target.value})}
                >
                  <option value="">Select Delivery Partner</option>
                  {dummyDeliveryBoys.map((boy, i) => (
                    <option key={i} value={boy}>{boy}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="popup-primary-action-btn">Save Details</button>
            </form>
          </div>
        </div>
      )}


      {/* POPUP 2: Edit Row Details (Date & Time) */}
      {editingOrder && (
        <div className="popup-modal-overlay" onClick={() => setEditingOrder(null)}>
          <div className="popup-modal-card mini-variant animate-popup-slide" onClick={(e) => e.stopPropagation()}>
            <div className="popup-modal-header">
              <h3>Edit Schedule ({editingOrder.id})</h3>
              <button className="popup-close-x" onClick={() => setEditingOrder(null)}>&times;</button>
            </div>
            <form onSubmit={handleSaveEditRow} className="popup-modal-body-form">
              <div className="form-input-element">
                <label>Change Date</label>
                <input 
                  type="date" 
                  value={editForm.date}
                  onChange={e => setEditForm({...editForm, date: e.target.value})}
                />
              </div>
              <div className="form-input-element">
                <label>Change Time</label>
                <input 
                  type="time" 
                  value={editForm.time}
                  onChange={e => setEditForm({...editForm, time: e.target.value})}
                />
              </div>
              <button type="submit" className="popup-primary-action-btn variant-edit">Update Details</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;