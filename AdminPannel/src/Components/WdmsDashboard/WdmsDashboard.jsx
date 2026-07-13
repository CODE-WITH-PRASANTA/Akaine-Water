import React from 'react';
import { 
  Droplet, 
  Layers, 
  Users, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag,
  UserCheck,
  MapPin,
  AlertCircle
} from 'lucide-react';
import './WdmsDashboard.css';

const WdmsDashboard = () => {
  // Sample analytics data for the 6 high-impact KPI cards
  const kpiCards = [
    { title: 'Total Water Delivered', value: '12,450 L', subtext: 'This Month', change: '+12%', icon: <Droplet size={24} />, color: 'blue' },
    { title: 'Active Stock (20L Jars)', value: '840 units', subtext: 'In Warehouse', change: '-3%', icon: <Layers size={24} />, color: 'teal' },
    { title: 'Total Active Customers', value: '1,204', subtext: 'Subscribed profiles', change: '+8%', icon: <Users size={24} />, color: 'indigo' },
    { title: 'Pending Orders', value: '42 Orders', subtext: 'Awaiting dispatch', change: 'Action Required', icon: <ShoppingBag size={24} />, color: 'amber' },
    { title: 'Revenue Collected', value: '$8,240', subtext: 'This Month', change: '+15%', icon: <DollarSign size={24} />, color: 'emerald' },
    { title: 'Delivery Boys Active', value: '18 / 22', subtext: 'On-field tracking', change: '81% capacity', icon: <UserCheck size={24} />, color: 'purple' },
  ];

  // Sample data for Section 2: Water Stock Level Tracking Table
  const stockInventory = [
    { id: 'ST-01', item: '20L Purified Water Jar', capacity: '1,000 units', available: '620 units', status: 'Optimal' },
    { id: 'ST-02', item: '15L Alkaline Water Jar', capacity: '500 units', available: '180 units', status: 'Low Stock' },
    { id: 'ST-03', item: '5L Dispenser Bottle', capacity: '300 units', available: '40 units', status: 'Critical' },
  ];

  // Sample data for Section 3: Delivery Boys Live Assign Panel
  const deliveryStaff = [
    { name: 'Rahul Sharma', zone: 'North Sector A', assignedOrders: 5, status: 'On Delivery' },
    { name: 'Amit Mishra', zone: 'Downtown Corporate', assignedOrders: 8, status: 'On Delivery' },
    { name: 'Subrat Sahoo', zone: 'West Residential', assignedOrders: 0, status: 'Idle (Available)' },
  ];

  return (
    <div className="wdms-dashboard">
      
      {/* SECTION 1: Analytics & Metrics Grid (Occupies ~70vh footprint on big viewports) */}
      <section className="wdms-section-metrics">
        <h2 className="section-title">WDMS Dashboard Overview</h2>
        <div className="metrics-grid">
          {kpiCards.map((card, index) => (
            <div key={index} className={`kpi-card card-border-${card.color}`}>
              <div className="kpi-card-header">
                <span className={`kpi-icon-wrapper icon-bg-${card.color}`}>
                  {card.icon}
                </span>
                <span className={`kpi-badge badge-${card.color}`}>{card.change}</span>
              </div>
              <div className="kpi-card-body">
                <h3 className="kpi-value">{card.value}</h3>
                <p className="kpi-title">{card.title}</p>
                <p className="kpi-subtext">{card.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LOWER DATA WRAPPER PANEL FOR SPLIT UTILITIES */}
      <div className="wdms-split-layout">
        
        {/* SECTION 2: Water Inventory Stock Tracker */}
        <section className="wdms-section-stock">
          <div className="section-panel-header">
            <h3 className="panel-title">Water Stock Monitor</h3>
            <span className="panel-subtitle">Live warehouse capacity counters</span>
          </div>
          <div className="table-responsive-wrapper">
            <table className="stock-table">
              <thead>
                <tr>
                  <th>Item Description</th>
                  <th>Total Capacity</th>
                  <th>Available Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stockInventory.map((item, idx) => (
                  <tr key={idx}>
                    <td className="font-semibold text-white">{item.item}</td>
                    <td>{item.capacity}</td>
                    <td>
                      <div className="stock-progress-bar-container">
                        <span className="stock-counter">{item.available}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-pill pill-${item.status.toLowerCase().replace(' ', '-')}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: Delivery Executive Allocation Matrix */}
        <section className="wdms-section-delivery">
          <div className="section-panel-header">
            <h3 className="panel-title">Delivery Personnel Assign Status</h3>
            <span className="panel-subtitle">On-field logistical breakdown</span>
          </div>
          <div className="delivery-list">
            {deliveryStaff.map((boy, idx) => (
              <div key={idx} className="delivery-boy-row">
                <div className="delivery-boy-info">
                  <p className="boy-name">{boy.name}</p>
                  <p className="boy-zone">
                    <MapPin size={12} /> {boy.zone}
                  </p>
                </div>
                <div className="delivery-boy-stats">
                  <span className="orders-count-badge">
                    {boy.assignedOrders} Orders
                  </span>
                  <span className={`status-indicator indicator-${boy.status.toLowerCase().includes('idle') ? 'idle' : 'active'}`}>
                    {boy.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default WdmsDashboard;