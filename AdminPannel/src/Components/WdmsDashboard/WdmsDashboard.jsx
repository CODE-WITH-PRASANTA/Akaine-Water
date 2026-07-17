import React, { useState } from 'react';
import { 
  Droplet, 
  Layers, 
  Users, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag,
  UserCheck,
  MapPin,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  Eye,
  Clock,
  Package,
  Truck,
  Filter,
  Search,
  X
} from 'lucide-react';
import './WdmsDashboard.css';

const WdmsDashboard = () => {
  const [showAllStock, setShowAllStock] = useState(false);
  const [showAllDelivery, setShowAllDelivery] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // KPI Cards Data
  const kpiCards = [
    { 
      title: 'Total Water Delivered', 
      value: '12,450 L', 
      subtext: 'This Month', 
      change: '+12%', 
      icon: <Droplet size={24} />, 
      color: 'blue',
      trend: 'up'
    },
    { 
      title: 'Active Stock (20L Jars)', 
      value: '840 units', 
      subtext: 'In Warehouse', 
      change: '-3%', 
      icon: <Layers size={24} />, 
      color: 'teal',
      trend: 'down'
    },
    { 
      title: 'Total Active Customers', 
      value: '1,204', 
      subtext: 'Subscribed profiles', 
      change: '+8%', 
      icon: <Users size={24} />, 
      color: 'indigo',
      trend: 'up'
    },
    { 
      title: 'Pending Orders', 
      value: '42 Orders', 
      subtext: 'Awaiting dispatch', 
      change: 'Action Required', 
      icon: <ShoppingBag size={24} />, 
      color: 'amber',
      trend: 'warning'
    },
    { 
      title: 'Revenue Collected', 
      value: '$8,240', 
      subtext: 'This Month', 
      change: '+15%', 
      icon: <DollarSign size={24} />, 
      color: 'emerald',
      trend: 'up'
    },
    { 
      title: 'Delivery Boys Active', 
      value: '18 / 22', 
      subtext: 'On-field tracking', 
      change: '81% capacity', 
      icon: <UserCheck size={24} />, 
      color: 'purple',
      trend: 'neutral'
    },
  ];

  // Stock Inventory Data
  const stockInventory = [
    { id: 'ST-01', item: '20L Purified Water Jar', capacity: '1,000 units', available: '620 units', status: 'Optimal', percentage: 62 },
    { id: 'ST-02', item: '15L Alkaline Water Jar', capacity: '500 units', available: '180 units', status: 'Low Stock', percentage: 36 },
    { id: 'ST-03', item: '5L Dispenser Bottle', capacity: '300 units', available: '40 units', status: 'Critical', percentage: 13 },
    { id: 'ST-04', item: '10L Mineral Water Can', capacity: '750 units', available: '450 units', status: 'Optimal', percentage: 60 },
    { id: 'ST-05', item: '2L PET Bottle', capacity: '200 units', available: '25 units', status: 'Critical', percentage: 12 },
    { id: 'ST-06', item: '25L Bulk Container', capacity: '120 units', available: '95 units', status: 'Low Stock', percentage: 79 },
  ];

  // Delivery Staff Data
  const deliveryStaff = [
    { name: 'Rahul Sharma', zone: 'North Sector A', assignedOrders: 5, status: 'On Delivery', rating: 4.8, experience: '2 years' },
    { name: 'Amit Mishra', zone: 'Downtown Corporate', assignedOrders: 8, status: 'On Delivery', rating: 4.9, experience: '3 years' },
    { name: 'Subrat Sahoo', zone: 'West Residential', assignedOrders: 0, status: 'Idle (Available)', rating: 4.6, experience: '1 year' },
    { name: 'Priya Patel', zone: 'East Industrial', assignedOrders: 3, status: 'On Delivery', rating: 4.7, experience: '2.5 years' },
    { name: 'Vikram Singh', zone: 'South Township', assignedOrders: 6, status: 'On Delivery', rating: 4.5, experience: '1.5 years' },
    { name: 'Deepak Kumar', zone: 'Central Business', assignedOrders: 0, status: 'Idle (Available)', rating: 4.8, experience: '2 years' },
  ];

  const getDisplayStock = () => {
    let stock = showAllStock ? stockInventory : stockInventory.slice(0, 3);
    if (filterStatus !== 'all') {
      stock = stock.filter(item => item.status.toLowerCase() === filterStatus.toLowerCase());
    }
    if (searchTerm) {
      stock = stock.filter(item => 
        item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return stock;
  };

  const getDisplayDelivery = () => {
    return showAllDelivery ? deliveryStaff : deliveryStaff.slice(0, 3);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Optimal': return 'optimal';
      case 'Low Stock': return 'low-stock';
      case 'Critical': return 'critical';
      default: return 'optimal';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'On Delivery': return '🚚';
      case 'Idle (Available)': return '✅';
      default: return '⏳';
    }
  };

  return (
    <div className="wdms-dashboard">
      
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1 className="dashboard-title">WDMS Dashboard</h1>
          <p className="dashboard-subtitle">Water Delivery Management System Overview</p>
        </div>
      </div>

      {/* SECTION 1: Analytics & Metrics Grid */}
      <section className="wdms-section-metrics">
        <div className="section-header">
          <h2 className="section-title">Key Performance Indicators</h2>
          <div className="section-actions">
            <button className="view-all-btn">
              <Eye size={16} />
              View Reports
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div className="metrics-grid">
          {kpiCards.map((card, index) => (
            <div key={index} className={`kpi-card card-border-${card.color}`}>
              <div className="kpi-card-header">
                <span className={`kpi-icon-wrapper icon-bg-${card.color}`}>
                  {card.icon}
                </span>
                <span className={`kpi-badge badge-${card.color} ${card.trend === 'up' ? 'trend-up' : card.trend === 'down' ? 'trend-down' : ''}`}>
                  {card.change}
                </span>
              </div>
              <div className="kpi-card-body">
                <h3 className="kpi-value">{card.value}</h3>
                <p className="kpi-title">{card.title}</p>
                <p className="kpi-subtext">{card.subtext}</p>
              </div>
              <div className="kpi-progress">
                <div className={`progress-bar progress-${card.color}`} style={{ width: '75%' }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LOWER DATA WRAPPER PANEL */}
      <div className="wdms-split-layout">
        
        {/* SECTION 2: Water Inventory Stock Tracker */}
        <section className="wdms-section-stock">
          <div className="section-panel-header">
            <div className="panel-header-left">
              <h3 className="panel-title">Water Stock Monitor</h3>
              <span className="panel-subtitle">Live warehouse capacity counters</span>
            </div>
            <button 
              className="view-all-btn"
              onClick={() => setShowAllStock(!showAllStock)}
            >
              {showAllStock ? 'Show Less' : 'View All'}
              <ChevronDown size={16} className={showAllStock ? 'rotate' : ''} />
            </button>
          </div>

          {/* Search and Filter */}
          <div className="stock-controls">
            <div className="search-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search stock items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button className="clear-search" onClick={() => setSearchTerm('')}>
                  <X size={16} />
                </button>
              )}
            </div>
            <div className="filter-wrapper">
              <Filter size={18} />
              <select 
                className="filter-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="optimal">Optimal</option>
                <option value="low stock">Low Stock</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="table-responsive-wrapper">
            <table className="stock-table">
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Item Description</th>
                  <th>Total Capacity</th>
                  <th>Available Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {getDisplayStock().length > 0 ? (
                  getDisplayStock().map((item, idx) => (
                    <tr key={idx}>
                      <td><span className="item-id">{item.id}</span></td>
                      <td className="font-semibold">{item.item}</td>
                      <td>{item.capacity}</td>
                      <td>
                        <div className="stock-progress-bar-container">
                          <div className="stock-progress-bg">
                            <div 
                              className={`stock-progress-fill progress-${getStatusColor(item.status)}`}
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                          <span className="stock-counter">{item.available}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`status-pill pill-${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">
                      <div className="no-data-content">
                        <Package size={40} />
                        <p>No stock items found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: Delivery Executive Allocation Matrix */}
        <section className="wdms-section-delivery">
          <div className="section-panel-header">
            <div className="panel-header-left">
              <h3 className="panel-title">Delivery Personnel</h3>
              <span className="panel-subtitle">On-field logistical breakdown</span>
            </div>
            <button 
              className="view-all-btn"
              onClick={() => setShowAllDelivery(!showAllDelivery)}
            >
              {showAllDelivery ? 'Show Less' : 'View All'}
              <ChevronDown size={16} className={showAllDelivery ? 'rotate' : ''} />
            </button>
          </div>

          <div className="delivery-stats-summary">
            <div className="delivery-stat">
              <span className="stat-label">Active</span>
              <span className="stat-value active-count">4</span>
            </div>
            <div className="delivery-stat">
              <span className="stat-label">Idle</span>
              <span className="stat-value idle-count">2</span>
            </div>
            <div className="delivery-stat">
              <span className="stat-label">Total Orders</span>
              <span className="stat-value total-orders">22</span>
            </div>
          </div>

          <div className="delivery-list">
            {getDisplayDelivery().map((boy, idx) => (
              <div key={idx} className="delivery-boy-row">
                <div className="delivery-boy-info">
                  <div className="boy-avatar">
                    {boy.name.charAt(0)}
                  </div>
                  <div>
                    <p className="boy-name">{boy.name}</p>
                    <p className="boy-zone">
                      <MapPin size={12} /> {boy.zone}
                    </p>
                    <p className="boy-rating">
                      ⭐ {boy.rating} · {boy.experience}
                    </p>
                  </div>
                </div>
                <div className="delivery-boy-stats">
                  <span className="orders-count-badge">
                    <ShoppingBag size={12} />
                    {boy.assignedOrders} Orders
                  </span>
                  <span className={`status-indicator indicator-${boy.status.toLowerCase().includes('idle') ? 'idle' : 'active'}`}>
                    {getStatusIcon(boy.status)} {boy.status}
                  </span>
                </div>
              </div>
            ))}
            {getDisplayDelivery().length === 0 && (
              <div className="no-data-content">
                <Truck size={40} />
                <p>No delivery personnel found</p>
              </div>
            )}
          </div>

          <div className="delivery-footer">
            <button className="assign-btn">
              <UserCheck size={16} />
              Assign New Delivery
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default WdmsDashboard;