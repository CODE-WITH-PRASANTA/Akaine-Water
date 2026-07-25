import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import './DeliveryBoyassign.css';

const DeliveryBoyassign = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('All');
  const [activeFilter, setActiveFilter] = useState('Total');
  const [loading, setLoading] = useState(false);
  const [routeData, setRouteData] = useState([]); // NEW: Store route data

  const [metrics, setMetrics] = useState({
    totalCount: 0,
    activeCount: 0,
    onDeliveryCount: 0,
    inactiveCount: 0,
    assignedCount: 0, // NEW: Assigned to routes
    unassignedCount: 0 // NEW: Not assigned to any route
  });

  // Calculate dynamic count summary
  const calculateMetrics = (list) => {
    const totalCount = list.length;
    const activeCount = list.filter((b) => b.status === 'Active').length;
    const onDeliveryCount = list.filter((b) => b.status === 'On-Delivery').length;
    const inactiveCount = list.filter((b) => b.status === 'Inactive').length;

    // NEW: Calculate assigned vs unassigned
    const assignedNames = routeData.map(route => route.name);
    const assignedCount = list.filter((b) => assignedNames.includes(b.name)).length;
    const unassignedCount = totalCount - assignedCount;

    setMetrics({
      totalCount,
      activeCount,
      onDeliveryCount,
      inactiveCount,
      assignedCount,
      unassignedCount
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
          status: boy.status || 'Active',
          // NEW: Add route assignment info
          assignedRoute: boy.assignedRoute || null
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

  // NEW: Fetch Route Management data
  const fetchRouteData = async () => {
    try {
      const response = await API.get('/root');
      if (response.data?.success) {
        const routes = response.data.data || [];
        setRouteData(routes);
        calculateMetrics(data); // Recalculate metrics with route data
      }
    } catch (error) {
      console.error('Error fetching route data:', error);
    }
  };

  useEffect(() => {
    fetchDeliveryBoys();
    fetchRouteData(); // NEW: Fetch route data on mount
  }, []);

  // NEW: Fetch route data whenever delivery data changes
  useEffect(() => {
    if (data.length > 0) {
      fetchRouteData();
    }
  }, [data.length]);

  // Filter list based on selected filter button
  const filteredData = data.filter((boy) => {
    if (filter === 'All') return true;
    if (filter === 'Assigned') {
      const assignedNames = routeData.map(route => route.name);
      return assignedNames.includes(boy.name);
    }
    if (filter === 'Unassigned') {
      const assignedNames = routeData.map(route => route.name);
      return !assignedNames.includes(boy.name);
    }
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

  // NEW: Assign delivery boy to a route
  const handleAssignRoute = async (deliveryId, routeId, routeName) => {
    try {
      // Update the delivery partner with assigned route
      const res = await API.put(`/delivery/${deliveryId}`, { 
        assignedRoute: routeId,
        routeName: routeName
      });
      
      if (res.data?.success) {
        // Update local state
        const updatedData = data.map((boy) =>
          boy._id === deliveryId ? { ...boy, assignedRoute: routeId } : boy
        );
        setData(updatedData);
        calculateMetrics(updatedData);
        alert(`Successfully assigned to route: ${routeName}`);
      }
    } catch (error) {
      console.error('Route assignment failed:', error);
      alert('Failed to assign route. Please try again.');
    }
  };

  // NEW: Unassign delivery boy from route
  const handleUnassignRoute = async (deliveryId) => {
    if (!window.confirm('Unassign this delivery boy from their current route?')) return;
    
    try {
      const res = await API.put(`/delivery/${deliveryId}`, { 
        assignedRoute: null,
        routeName: null
      });
      
      if (res.data?.success) {
        const updatedData = data.map((boy) =>
          boy._id === deliveryId ? { ...boy, assignedRoute: null } : boy
        );
        setData(updatedData);
        calculateMetrics(updatedData);
        alert('Successfully unassigned from route');
      }
    } catch (error) {
      console.error('Route unassignment failed:', error);
      alert('Failed to unassign route. Please try again.');
    }
  };

  const getStatusColorClass = (status) => {
    if (status === 'Active') return 'status-active';
    if (status === 'On-Delivery') return 'status-ondelivery';
    if (status === 'Inactive') return 'status-inactive';
    return '';
  };

  // NEW: Get route assignments for a delivery boy
  const getAssignedRoute = (boyName) => {
    const assignedRoute = routeData.find(route => route.name === boyName);
    return assignedRoute || null;
  };

  // Export Filtered Table to CSV
  const handleDownload = () => {
    if (filteredData.length === 0) {
      alert('No data available to download!');
      return;
    }

    const headers = ['Delivery Boy', 'Mobile', 'Vehicle', "Today's Orders", 'Status', 'Assigned Route'];
    const rows = filteredData.map((boy) => {
      const route = getAssignedRoute(boy.name);
      return [
        boy.name,
        boy.mobile,
        boy.vehicle,
        boy.orders,
        boy.status,
        route ? `${route.order || 'N/A'}` : 'Unassigned'
      ];
    });

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

        {/* Dynamic Metric Display - UPDATED with Route metrics */}
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
          {/* NEW: Assigned Metrics */}
          <div
            className={`metric-box ${activeFilter === 'Assigned' ? 'active-metric' : ''}`}
            onClick={() => handleFilterClick('Assigned', 'Assigned')}
          >
            <p className="metric-title">Assigned to Routes</p>
            <span className="num-display total-num" style={{ color: '#10b981' }}>{metrics.assignedCount}</span>
          </div>
          <div
            className={`metric-box ${activeFilter === 'Unassigned' ? 'active-metric' : ''}`}
            onClick={() => handleFilterClick('Unassigned', 'Unassigned')}
          >
            <p className="metric-title">Unassigned</p>
            <span className="num-display total-num" style={{ color: '#f59e0b' }}>{metrics.unassignedCount}</span>
          </div>
        </div>

        {/* Table View - UPDATED with Route Assignment column */}
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
                  <th>Assigned Route</th> {/* NEW COLUMN */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((boy) => {
                  const assignedRoute = getAssignedRoute(boy.name);
                  const isAssigned = assignedRoute !== null;
                  
                  return (
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
                      <td data-label="Assigned Route">
                        {isAssigned ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="route-badge" style={{
                              backgroundColor: '#dbeafe',
                              color: '#1e40af',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}>
                              {assignedRoute.order || 'Route Assigned'}
                            </span>
                            <button
                              onClick={() => handleUnassignRoute(boy._id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#ef4444',
                                cursor: 'pointer',
                                fontSize: '14px'
                              }}
                              title="Unassign from route"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <select
                            onChange={(e) => {
                              const selectedRouteId = e.target.value;
                              if (selectedRouteId) {
                                const route = routeData.find(r => r._id === selectedRouteId);
                                if (route) {
                                  handleAssignRoute(boy._id, selectedRouteId, route.name);
                                }
                              }
                            }}
                            value=""
                            style={{
                              padding: '4px 8px',
                              borderRadius: '4px',
                              border: '1px solid #d1d5db',
                              backgroundColor: 'white',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="">Assign Route</option>
                            {routeData.map((route) => (
                              <option key={route._id} value={route._id}>
                                {route.order || 'Route'} - {route.name}
                              </option>
                            ))}
                          </select>
                        )}
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
                  );
                })}
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