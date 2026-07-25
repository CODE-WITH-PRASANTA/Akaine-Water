import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import './DeliveryBoyassign.css';

const DeliveryBoyassign = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('All');
  const [activeFilter, setActiveFilter] = useState('Total');
  const [loading, setLoading] = useState(false);

  const [metrics, setMetrics] = useState({
    totalCount: 0,
    activeCount: 0,
    onDeliveryCount: 0,
    inactiveCount: 0
  });

  // Calculate dynamic count summary
  const calculateMetrics = (list) => {
    const totalCount = list.length;
    const activeCount = list.filter((b) => b.status === 'Active').length;
    const onDeliveryCount = list.filter((b) => b.status === 'On-Delivery').length;
    const inactiveCount = list.filter((b) => b.status === 'Inactive').length;

    setMetrics({
      totalCount,
      activeCount,
      onDeliveryCount,
      inactiveCount
    });
  };

  // Fetch registered delivery partners directly from /delivery
  const fetchDeliveryBoys = async () => {
    setLoading(true);
    try {
      const response = await API.get('/delivery');
      if (response.data?.success) {
        const rawPartners = response.data.data || [];

        // Map backend schema to view format
        const mappedPartners = rawPartners.map((boy) => ({
          _id: boy._id,
          name: boy.name || 'Unnamed',
          mobile: boy.phone || boy.mobile || 'N/A',
          vehicle: boy.vehicle || 'Bike',
          orders: boy.orders || 0,
          status: boy.status || 'Active'
        }));

        setData(mappedPartners);
        calculateMetrics(mappedPartners);
      }
    } catch (error) {
      console.error('Error fetching delivery boys:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveryBoys();
  }, []);

  // Filter list based on selected filter button
  const filteredData = data.filter((boy) => {
    if (filter === 'All') return true;
    return boy.status === filter;
  });

  const handleFilterClick = (status, filterName) => {
    setFilter(status);
    setActiveFilter(filterName);
  };

  // Handle Action Status Change (Optimistic UI update + API call)
  const handleStatusChange = async (id, newStatus) => {
    // 1. Immediately update local state for smooth UI transition
    const updatedData = data.map((boy) =>
      boy._id === id ? { ...boy, status: newStatus } : boy
    );
    setData(updatedData);
    calculateMetrics(updatedData);

    // 2. Persist change in database
    try {
      const res = await API.put(`/delivery/${id}`, { status: newStatus });
      if (!res.data?.success) {
        // Fallback re-fetch if response reports failure
        fetchDeliveryBoys();
      }
    } catch (error) {
      console.error('Status update failed:', error);
      alert('Failed to update status on server.');
      fetchDeliveryBoys(); // Revert to server state on error
    }
  };

  // Delete Delivery Partner
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this delivery partner?')) return;
    try {
      const res = await API.delete(`/delivery/${id}`);
      if (res.data?.success) {
        fetchDeliveryBoys();
      }
    } catch (error) {
      console.error('Delete operation failed:', error);
      alert('Failed to delete delivery partner');
    }
  };

  const getStatusColorClass = (status) => {
    if (status === 'Active') return 'status-active';
    if (status === 'On-Delivery') return 'status-ondelivery';
    if (status === 'Inactive') return 'status-inactive';
    return '';
  };

  // Export Filtered Table to CSV
  const handleDownload = () => {
    if (filteredData.length === 0) {
      alert('No data available to download!');
      return;
    }

    const headers = ['Delivery Boy', 'Mobile', 'Vehicle', "Today's Orders", 'Status'];
    const rows = filteredData.map((boy) => [
      boy.name,
      boy.mobile,
      boy.vehicle,
      boy.orders,
      boy.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((val) => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.setAttribute('href', url);
    link.setAttribute('download', `Delivery_Boy_Report_${filter}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="db-management-container">
      <div className="db-management-panel">
        <div className="db-header">
          <h2 className="header-text">DELIVERY BOY MANAGEMENT</h2>
          <button className="download-btn" onClick={handleDownload}>
            Download CSV
          </button>
        </div>

        {/* Dynamic Metric Display */}
        <div className="db-metrics-container">
          <div
            className={`metric-box ${activeFilter === 'Total' ? 'active-metric' : ''}`}
            onClick={() => handleFilterClick('All', 'Total')}
          >
            <p className="metric-title">Total Delivery Boys</p>
            <span className="num-display total-num">{metrics.totalCount}</span>
          </div>
          <div
            className={`metric-box ${activeFilter === 'Active' ? 'active-metric' : ''}`}
            onClick={() => handleFilterClick('Active', 'Active')}
          >
            <p className="metric-title">On-Duty</p>
            <span className="num-display active-num">{metrics.activeCount}</span>
          </div>
          <div
            className={`metric-box ${activeFilter === 'OnDelivery' ? 'active-metric' : ''}`}
            onClick={() => handleFilterClick('On-Delivery', 'OnDelivery')}
          >
            <p className="metric-title">On-Delivery</p>
            <span className="num-display ondelivery-num">{metrics.onDeliveryCount}</span>
          </div>
          <div
            className={`metric-box ${activeFilter === 'Inactive' ? 'active-metric' : ''}`}
            onClick={() => handleFilterClick('Inactive', 'Inactive')}
          >
            <p className="metric-title">Inactive</p>
            <span className="num-display inactive-num">{metrics.inactiveCount}</span>
          </div>
        </div>

        {/* Table View */}
        <div className="db-table-container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>Loading data...</div>
          ) : (
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
                  <tr key={boy._id}>
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
                          onChange={(e) => handleStatusChange(boy._id, e.target.value)}
                          className="action-select"
                        >
                          <option value="Active">Active</option>
                          <option value="On-Delivery">On-Delivery</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                      <button 
                        onClick={() => handleDelete(boy._id)} 
                        style={{ marginLeft: '10px', color: 'red', cursor: 'pointer', border: 'none', background: 'transparent' }}
                        title="Delete record"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && filteredData.length === 0 && (
            <div className="no-results-box">
              <p className="no-results-text">No delivery personnel found matching this filter view.</p>
            </div>
          )}
        </div>

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