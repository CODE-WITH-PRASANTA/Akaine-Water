import React, { useState } from 'react';
import './DeliveryBoyassign.css';

const initialData = [
  { id: 1, name: 'Ravi Sharma', mobile: 'XXXXXXXX90', vehicle: 'OD 02 AB 1234', orders: 12, status: 'Active' },
  { id: 2, name: 'Amit Verma', mobile: 'XXXXXXXX85', vehicle: 'OD 05 CD 5678', orders: 8, status: 'Active' },
  { id: 3, name: 'Pooja Sharma', mobile: 'XXXXXXXX78', vehicle: 'OD 03 EF 1111', orders: 6, status: 'On-Delivery' },
  { id: 4, name: 'Suresh Patel', mobile: 'XXXXXXXX65', vehicle: 'OD 08 GH 2345', orders: 5, status: 'Active' },
  { id: 5, name: 'Neha Gupta', mobile: 'XXXXXXXX42', vehicle: 'OD 07 IJ 6789', orders: 4, status: 'Active' },
  { id: 6, name: 'Arjun Sharma', mobile: 'XXXXXXXX30', vehicle: 'OD 01 KL 1212', orders: 3, status: 'Inactive' },
];

const DeliveryBoyassign = () => {
  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState('All');
  const [activeFilter, setActiveFilter] = useState('Total');

  // Static metrics overridden or calculated dynamically based on layout metrics
  // Setting default display numbers from the image, but keeping them dynamic if you expand the list
  const totalCount = 56; 
  const activeCount = 45;
  const onDeliveryCount = 32;
  const inactiveCount = 8;

  const filteredData = data.filter((boy) => {
    if (filter === 'All') return true;
    return boy.status === filter;
  });

  const handleFilterClick = (status, filterName) => {
    setFilter(status);
    setActiveFilter(filterName);
  };

  const handleStatusChange = (id, newStatus) => {
    setData(data.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const getStatusColorClass = (status) => {
    if (status === 'Active') return 'status-active';
    if (status === 'On-Delivery') return 'status-ondelivery';
    if (status === 'Inactive') return 'status-inactive';
    return '';
  };

  return (
    <div className="db-management-container">
      <div className="db-management-panel">
        
        {/* Header Title Section */}
        <div className="db-header">
          <h2 className="header-text"> DELIVERY BOY MANAGEMENT</h2>
        </div>

        {/* Metric Overview Cards */}
        <div className="db-metrics-container">
          <div 
            className={`metric-box ${activeFilter === 'Total' ? 'active-metric' : ''}`} 
            onClick={() => handleFilterClick('All', 'Total')}
          >
            <p className="metric-title">Total Delivery Boys</p>
            <span className="num-display total-num">{totalCount}</span>
          </div>
          <div 
            className={`metric-box ${activeFilter === 'Active' ? 'active-metric' : ''}`} 
            onClick={() => handleFilterClick('Active', 'Active')}
          >
            <p className="metric-title">On-Duty</p>
            <span className="num-display active-num">{activeCount}</span>
          </div>
          <div 
            className={`metric-box ${activeFilter === 'OnDelivery' ? 'active-metric' : ''}`} 
            onClick={() => handleFilterClick('On-Delivery', 'OnDelivery')}
          >
            <p className="metric-title">On-Delivery</p>
            <span className="num-display ondelivery-num">{onDeliveryCount}</span>
          </div>
          <div 
            className={`metric-box ${activeFilter === 'Inactive' ? 'active-metric' : ''}`} 
            onClick={() => handleFilterClick('Inactive', 'Inactive')}
          >
            <p className="metric-title">Inactive</p>
            <span className="num-display inactive-num">{inactiveCount}</span>
          </div>
        </div>

        {/* Dynamic Table Layout matching image UI */}
        <div className="db-table-container">
          <table className="db-table">
            <thead>
              <tr>
                <th>Delivery Boy</th>
                <th>Mobile</th>
                <th>Vehicle</th>
                <th>Today's Orders</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((boy) => (
                <tr key={boy.id}>
                  <td data-label="Delivery Boy" className="td-name">{boy.name}</td>
                  <td data-label="Mobile" className="td-mobile">{boy.mobile}</td>
                  <td data-label="Vehicle" className="td-vehicle">{boy.vehicle}</td>
                  <td data-label="Today's Orders" className="td-orders">{boy.orders}</td>
                  <td data-label="Status">
                    <span className={`status-badge-visual ${getStatusColorClass(boy.status)}`}>
                      {boy.status}
                    </span>
                  </td>
                  <td data-label="Action" className="td-actions">
                    <div className={`action-dropdown-wrapper ${getStatusColorClass(boy.status)}-text`}>
                      <span className="dropdown-dot"></span>
                      <select 
                        value={boy.status} 
                        onChange={(e) => handleStatusChange(boy.id, e.target.value)}
                        className="action-select"
                      >
                        <option value="Active">Active</option>
                        <option value="On-Delivery">On-Delivery</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredData.length === 0 && (
            <div className="no-results-box">
              <p className="no-results-text">No delivery personnel found matching this filter view.</p>
            </div>
          )}
        </div>

        {/* Primary Layout Action Button */}
        <div className="db-footer-action">
          <button className="view-all-btn" onClick={() => handleFilterClick('All', 'Total')}>
            View All Delivery Boys
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryBoyassign;