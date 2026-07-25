import React from 'react';
import { 
  Truck, 
  ShoppingBag, 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  Wallet 
} from 'lucide-react';
import './NextDelivery.css';

const NextDelivery = () => {
  const recentOrders = [
    { id: '#AD1024', date: 'Oct 10, 2023', items: '2 x 20L Jar', amount: '$24.00', status: 'Delivered' },
    { id: '#AD1023', date: 'Oct 5, 2023', items: '3 x 20L Jar', amount: '$36.00', status: 'Delivered' },
    { id: '#AD1022', date: 'Sep 30, 2023', items: '2 x 20L Jar', amount: '$24.00', status: 'Delivered' },
    { id: '#AD1021', date: 'Sep 25, 2023', items: '1 x 20L Jar', amount: '$12.00', status: 'Cancelled' },
    { id: '#AD1022', date: 'Sep 30, 2023', items: '2 x 20L Jar', amount: '$24.00', status: 'Delivered' },
    { id: '#AD1021', date: 'Sep 25, 2023', items: '1 x 20L Jar', amount: '$12.00', status: 'Cancelled' },
  ];

  return (
    <div className="dashboard-container">
      
      {/* 1. Next Delivery Section */}
      <div className="dashboard-card next-delivery-card">
        <div className="card-header">
          <div className="header-title-wrapper">
            <span className="header-icon"><Truck size={20} /></span>
            <h2 className="card-title">Next Delivery</h2>
          </div>
        </div>

        <div className="delivery-content">
          <div className="product-display">
            {/* Replace src with your water jar image asset path */}
            <img 
              src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&auto=format&fit=crop&q=80" 
              alt="20L Water Jar" 
              className="product-image" 
            />
            <div className="product-info-group">
              <h3 className="product-name">20L Water Jar</h3>
              <span className="qty-badge">Qty: 2</span>
            </div>
          </div>

          <div className="delivery-details">
            <div className="detail-item">
              <Calendar className="detail-icon" size={18} />
              <div className="detail-text">
                <span className="detail-label">Delivery Date</span>
                <span className="detail-value">Oct 15, 2023</span>
              </div>
            </div>

            <div className="detail-item">
              <Clock className="detail-icon" size={18} />
              <div className="detail-text">
                <span className="detail-label">Delivery Time</span>
                <span className="detail-value">9:00 AM - 11:00 AM</span>
              </div>
            </div>

            <div className="detail-item">
              <MapPin className="detail-icon" size={18} />
              <div className="detail-text">
                <span className="detail-label">Delivery Address</span>
                <span className="detail-value">221B Baker Street, London, UK</span>
              </div>
            </div>
          </div>

          <button className="primary-btn">
            <Calendar size={16} /> Reschedule Delivery
          </button>
        </div>
      </div>

      {/* 2. Recent Orders Section */}
      <div className="dashboard-card recent-orders-card">
        <div className="card-header">
          <div className="header-title-wrapper">
            <span className="header-icon"><ShoppingBag size={20} /></span>
            <h2 className="card-title">Recent Orders</h2>
          </div>
          <button className="view-all-link">View All</button>
        </div>

        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index}>
                  <td>
                    <a href="#order" className="order-id-link">{order.id}</a>
                  </td>
                  <td>{order.date}</td>
                  <td>{order.items}</td>
                  <td>{order.amount}</td>
                  <td>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Account Summary Section */}
      <div className="dashboard-card account-summary-card">
        <div className="card-header">
          <div className="header-title-wrapper">
            <span className="header-icon"><User size={20} /></span>
            <h2 className="card-title">Account Summary</h2>
          </div>
        </div>

        <div className="summary-content">
          <div className="summary-item">
            <span className="summary-label">Member Since</span>
            <span className="summary-value">Jan 10, 2023</span>
          </div>

          <div className="summary-item">
            <span className="summary-label">Total Orders</span>
            <span className="summary-value">24</span>
          </div>

          <div className="summary-item">
            <span className="summary-label">Total Spent</span>
            <span className="summary-value">$276.00</span>
          </div>

          <div className="summary-item">
            <span className="summary-label">Wallet Balance</span>
            <span className="summary-value">$15.50</span>
          </div>

          <button className="primary-btn" style={{ marginTop: 'auto' }}>
            <Wallet size={16} /> Recharge Wallet
          </button>
        </div>
      </div>

    </div>
  );
};

export default NextDelivery;