import React, { useState } from 'react';
import './MyOrder.css';
import { 
  FiSearch, 
  FiFilter, 
  FiCalendar, 
  FiChevronRight, 
  FiChevronLeft, 
  FiClock, 
  FiCheckCircle, 
  FiXCircle, 
  FiShoppingBag,
  FiX
} from 'react-icons/fi';

// Importing product images from src/assets/
import waterJarImg from '../../assets/shop-3.jpg';
import waterBottleImg from '../../assets/shop-3.jpg';

const initialOrders = [
  {
    id: '#AD1024',
    productName: '20L Water Jar',
    pack: 'Pack of 1',
    quantity: '1 Jar',
    orderDate: 'Oct 10, 2023',
    orderTime: '10:30 AM',
    deliveryDate: 'Oct 10, 2023',
    deliveryTime: '2:00 PM - 4:00 PM',
    amount: '$12.00',
    status: 'Delivered',
    image: waterJarImg
  },
  {
    id: '#AD1023',
    productName: '20L Water Jar',
    pack: 'Pack of 2',
    quantity: '2 Jars',
    orderDate: 'Oct 8, 2023',
    orderTime: '09:15 AM',
    deliveryDate: 'Oct 8, 2023',
    deliveryTime: '12:00 PM - 2:00 PM',
    amount: '$24.00',
    status: 'Delivered',
    image: waterJarImg
  },
  {
    id: '#AD1022',
    productName: '20L Water Jar',
    pack: 'Pack of 1',
    quantity: '1 Jar',
    orderDate: 'Oct 6, 2023',
    orderTime: '11:45 AM',
    deliveryDate: 'Oct 6, 2023',
    deliveryTime: '2:00 PM - 4:00 PM',
    amount: '$12.00',
    status: 'In Progress',
    image: waterJarImg
  },
  {
    id: '#AD1021',
    productName: '1L Water Bottle',
    pack: 'Pack of 12',
    quantity: '12 Bottles',
    orderDate: 'Oct 5, 2023',
    orderTime: '08:20 AM',
    deliveryDate: 'Oct 5, 2023',
    deliveryTime: '10:00 AM - 12:00 PM',
    amount: '$8.00',
    status: 'Delivered',
    image: waterBottleImg
  },
  {
    id: '#AD1020',
    productName: '20L Water Jar',
    pack: 'Pack of 3',
    quantity: '3 Jars',
    orderDate: 'Oct 3, 2023',
    orderTime: '07:50 PM',
    deliveryDate: 'Oct 3, 2023',
    deliveryTime: '2:00 PM - 4:00 PM',
    amount: '$36.00',
    status: 'Cancelled',
    image: waterJarImg
  }
];

const MyOrder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedProduct, setSelectedProduct] = useState('All Products');
  const [activeOrderDetails, setActiveOrderDetails] = useState(null);

  // Stats Data
  const stats = [
    {
      title: 'Total Orders',
      count: 24,
      subtext: 'All Time Orders',
      icon: <FiShoppingBag className="myorder-stat-icon bag" />,
      colorClass: 'blue-bg'
    },
    {
      title: 'Delivered',
      count: 18,
      subtext: 'Orders Delivered',
      icon: <FiCheckCircle className="myorder-stat-icon check" />,
      colorClass: 'green-bg'
    },
    {
      title: 'In Progress',
      count: 3,
      subtext: 'Orders In Progress',
      icon: <FiClock className="myorder-stat-icon clock" />,
      colorClass: 'orange-bg'
    },
    {
      title: 'Cancelled',
      count: 3,
      subtext: 'Orders Cancelled',
      icon: <FiXCircle className="myorder-stat-icon x" />,
      colorClass: 'red-bg'
    }
  ];

  // Filtering Logic
  const filteredOrders = initialOrders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      selectedStatus === 'All Status' || order.status === selectedStatus;

    const matchesProduct = 
      selectedProduct === 'All Products' || order.productName === selectedProduct;

    return matchesSearch && matchesStatus && matchesProduct;
  });

  return (
    <div className="myorder-container">
      {/* Top Stat Cards */}
      <div className="myorder-stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="myorder-stat-card">
            <div className={`myorder-icon-wrapper ${stat.colorClass}`}>
              {stat.icon}
            </div>
            <div className="myorder-stat-info">
              <span className="myorder-stat-title">{stat.title}</span>
              <h2 className="myorder-stat-count">{stat.count}</h2>
              <span className="myorder-stat-subtext">{stat.subtext}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Wrapper */}
      <div className="myorder-table-card">
        {/* Controls Header */}
        <div className="myorder-controls-bar">
          <div className="myorder-search-box">
            <FiSearch className="myorder-search-icon" />
            <input
              type="text"
              placeholder="Search by Order ID or Product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="myorder-filters-group">
            <select 
              className="myorder-select-dropdown"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All Status">All Status</option>
              <option value="Delivered">Delivered</option>
              <option value="In Progress">In Progress</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select 
              className="myorder-select-dropdown"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="All Products">All Products</option>
              <option value="20L Water Jar">20L Water Jar</option>
              <option value="1L Water Bottle">1L Water Bottle</option>
            </select>

            <div className="myorder-date-picker">
              <FiCalendar className="myorder-date-icon" />
              <span>Select Date Range</span>
            </div>

            <button className="myorder-filter-btn" title="Filter Options">
              <FiFilter />
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="myorder-table-wrapper">
          <table className="myorder-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Order Date</th>
                <th>Delivery Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="myorder-id-cell">{order.id}</td>
                    <td>
                      <div className="myorder-product-cell">
                        <img 
                          src={order.image} 
                          alt={order.productName} 
                          className="myorder-product-img" 
                        />
                        <div>
                          <div className="myorder-product-title">{order.productName}</div>
                          <div className="myorder-product-sub">{order.pack}</div>
                        </div>
                      </div>
                    </td>
                    <td>{order.quantity}</td>
                    <td>
                      <div className="myorder-datetime">
                        <div>{order.orderDate}</div>
                        <div className="myorder-time">{order.orderTime}</div>
                      </div>
                    </td>
                    <td>
                      <div className="myorder-datetime">
                        <div>{order.deliveryDate}</div>
                        <div className="myorder-time">{order.deliveryTime}</div>
                      </div>
                    </td>
                    <td className="myorder-amount-cell">{order.amount}</td>
                    <td>
                      <span className={`myorder-status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="myorder-action-btn"
                        onClick={() => setActiveOrderDetails(order)}
                      >
                        View Details <FiChevronRight />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="myorder-empty-row">
                    No orders found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="myorder-pagination-footer">
          <span className="myorder-showing-text">
            Showing {filteredOrders.length} to {filteredOrders.length} of 24 orders
          </span>

          <div className="myorder-pagination-btns">
            <button className="myorder-page-btn arrow" aria-label="Previous page"><FiChevronLeft /></button>
            <button className="myorder-page-btn active">1</button>
            <button className="myorder-page-btn">2</button>
            <button className="myorder-page-btn">3</button>
            <button className="myorder-page-btn">4</button>
            <button className="myorder-page-btn">5</button>
            <button className="myorder-page-btn arrow" aria-label="Next page"><FiChevronRight /></button>
          </div>
        </div>
      </div>

      {/* Action View Details Modal */}
      {activeOrderDetails && (
        <div className="myorder-modal-overlay" onClick={() => setActiveOrderDetails(null)}>
          <div className="myorder-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="myorder-modal-header">
              <h3>Order Details ({activeOrderDetails.id})</h3>
              <button className="myorder-close-btn" onClick={() => setActiveOrderDetails(null)}>
                <FiX />
              </button>
            </div>
            <div className="myorder-modal-body">
              <div className="myorder-modal-row">
                <strong>Product:</strong> {activeOrderDetails.productName} ({activeOrderDetails.pack})
              </div>
              <div className="myorder-modal-row">
                <strong>Quantity:</strong> {activeOrderDetails.quantity}
              </div>
              <div className="myorder-modal-row">
                <strong>Order Date:</strong> {activeOrderDetails.orderDate} at {activeOrderDetails.orderTime}
              </div>
              <div className="myorder-modal-row">
                <strong>Delivery Date:</strong> {activeOrderDetails.deliveryDate} ({activeOrderDetails.deliveryTime})
              </div>
              <div className="myorder-modal-row">
                <strong>Total Amount:</strong> {activeOrderDetails.amount}
              </div>
              <div className="myorder-modal-row">
                <strong>Status:</strong> 
                <span className={`myorder-status-badge ${activeOrderDetails.status.toLowerCase().replace(' ', '-')}`}>
                  {activeOrderDetails.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrder;