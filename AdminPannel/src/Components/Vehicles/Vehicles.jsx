import React, { useState, useEffect, useRef } from 'react';
import { FiUser, FiTrash2, FiChevronDown } from 'react-icons/fi';
import API from '../../api/axios'; // Adjust import path if needed
import './Vehicles.css';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Track which row's profile dropdown menu is currently open
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Form Fields State (For registering new vehicles)
  const [formData, setFormData] = useState({
    number: '',
    driver: '',
    capacity: '',
    status: 'Active'
  });

  // Fetch all vehicles from backend API
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await API.get('/vehicle');
      
      // Extract array from standard response format
      const data = response.data.data || (Array.isArray(response.data) ? response.data : []);
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      alert(error.response?.data?.message || 'Failed to fetch vehicles from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Close dropdown menu if user clicks anywhere outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setFormData({ number: '', driver: '', capacity: '', status: 'Active' });
    setIsModalOpen(true);
  };

  // Toggles the specific dropdown menu when clicking the profile option
  const toggleDropdown = (id) => {
    setActiveDropdownId(activeDropdownId === id ? null : id);
  };

  // Updates status in backend database
  const handleStatusSelect = async (id, newStatus) => {
    try {
      const response = await API.put(`/vehicle/${id}`, { status: newStatus });
      if (response.data.success || response.status === 200) {
        setVehicles((prevVehicles) =>
          prevVehicles.map((v) => (v._id === id ? { ...v, status: newStatus } : v))
        );
      }
    } catch (error) {
      console.error('Error updating vehicle status:', error);
      alert(error.response?.data?.message || 'Failed to update vehicle status.');
    } finally {
      setActiveDropdownId(null);
    }
  };

  // Create new vehicle in database
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.number.trim() || !formData.driver.trim() || !formData.capacity.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await API.post('/vehicle', formData);
      if (response.data.success || response.status === 201) {
        alert('Vehicle registered successfully!');
        setIsModalOpen(false);
        fetchVehicles(); // Refresh vehicle list
      }
    } catch (error) {
      console.error('Error registering vehicle:', error);
      alert(error.response?.data?.message || 'Failed to register vehicle.');
    }
  };

  // Delete vehicle from database
  const handleDeleteClick = async (id, vehicleNum) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete vehicle ${vehicleNum}?`);
    if (confirmDelete) {
      try {
        const response = await API.delete(`/vehicle/${id}`);
        if (response.data.success || response.status === 200) {
          setVehicles((prevVehicles) => prevVehicles.filter((v) => v._id !== id));
        }
      } catch (error) {
        console.error('Error deleting vehicle:', error);
        alert(error.response?.data?.message || 'Failed to delete vehicle.');
      }
    }
  };

  // Download CSV report directly from backend API
  const handleDownload = async () => {
    try {
      const response = await API.get('/vehicle/export-csv', {
        responseType: 'blob' // Binary blob response for CSV download
      });

      const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.href = url;
      link.setAttribute('download', `Vehicle_Management_Report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.warn('Backend CSV endpoint failed. Falling back to client-side CSV generation:', error);

      if (vehicles.length === 0) {
        alert("No vehicle data available to download!");
        return;
      }

      const headers = ['Vehicle No.', 'Driver', 'Capacity', 'Status'];
      const rows = vehicles.map(vehicle => [
        `"${vehicle.number}"`,
        `"${vehicle.driver}"`,
        `"${vehicle.capacity}"`,
        `"${vehicle.status}"`
      ]);

      const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.setAttribute('href', url);
      link.setAttribute('download', 'Vehicle_Management_Report.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="vehicles-container">
      <div className="vehicles-card">
        {/* Title and Download Button Header */}
        <div className="vehicles-header">
          <h2 className="vehicles-title">VEHICLE MANAGEMENT</h2>
          <button className="vehicles-download-btn" onClick={handleDownload}>
            Download
          </button>
        </div>
        
        <div className="vehicles-table-wrapper">
          <table className="vehicles-table">
            <thead>
              <tr>
                <th>Vehicle No.</th>
                <th>Driver</th>
                <th>Capacity</th>
                <th>Status</th>
                <th className="vehicles-text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="vehicles-no-data">Loading vehicle details...</td>
                </tr>
              ) : vehicles.length > 0 ? (
                vehicles.map((vehicle) => {
                  const vehicleId = vehicle._id || vehicle.id;
                  return (
                    <tr key={vehicleId}>
                      <td className="vehicles-fw-medium">{vehicle.number}</td>
                      <td>{vehicle.driver}</td>
                      <td>{vehicle.capacity}</td>
                      <td>
                        <span className={`vehicles-status-badge vehicles-badge-${(vehicle.status || '').toLowerCase()}`}>
                          {vehicle.status}
                        </span>
                      </td>
                      <td>
                        <div 
                          className="vehicles-actions" 
                          ref={activeDropdownId === vehicleId ? dropdownRef : null}
                        >
                          {/* Profile Option Wrapper */}
                          <div className="vehicles-profile-dropdown-wrapper">
                            <button 
                              type="button"
                              className={`vehicles-action-btn vehicles-profile-trigger ${activeDropdownId === vehicleId ? 'active' : ''}`}
                              title="Profile & Status Menu"
                              onClick={() => toggleDropdown(vehicleId)}
                            >
                              <FiUser size={16} />
                              <FiChevronDown size={12} className="vehicles-dropdown-arrow" />
                            </button>

                            {/* Dynamic Click-based Dropdown */}
                            {activeDropdownId === vehicleId && (
                              <div className="vehicles-custom-dropdown-menu">
                                <div className="dropdown-header">Change Status</div>
                                <button 
                                  type="button"
                                  className="dropdown-item option-active"
                                  onClick={() => handleStatusSelect(vehicleId, 'Active')}
                                >
                                  Active
                                </button>
                                <button 
                                  type="button"
                                  className="dropdown-item option-inactive"
                                  onClick={() => handleStatusSelect(vehicleId, 'Inactive')}
                                >
                                  Inactive
                                </button>
                                <button 
                                  type="button"
                                  className="dropdown-item option-maintenance"
                                  onClick={() => handleStatusSelect(vehicleId, 'Maintenance')}
                                >
                                  Maintenance
                                </button>
                              </div>
                            )}
                          </div>

                          <button 
                            type="button"
                            className="vehicles-action-btn delete-btn" 
                            title="Delete Vehicle"
                            onClick={() => handleDeleteClick(vehicleId, vehicle.number)}
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="vehicles-no-data">
                    No vehicles registered. Click 'Add Vehicle' below.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="vehicles-footer">
          <button type="button" className="vehicles-add-btn" onClick={handleAddClick}>
            Add Vehicle
          </button>
        </div>
      </div>

      {/* Modal Popup for Add */}
      {isModalOpen && (
        <div className="vehicles-modal-overlay">
          <div className="vehicles-modal">
            <div className="vehicles-modal-header">
              <h3>Add New Vehicle</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="vehicles-form">
              <div className="vehicles-form-group">
                <label htmlFor="number">Vehicle Number</label>
                <input
                  type="text" id="number" name="number"
                  placeholder="e.g. OD-02 AB 1234"
                  value={formData.number} onChange={handleInputChange} required
                />
              </div>

              <div className="vehicles-form-group">
                <label htmlFor="driver">Driver Name</label>
                <input
                  type="text" id="driver" name="driver"
                  placeholder="e.g. Amit Verma"
                  value={formData.driver} onChange={handleInputChange} required
                />
              </div>

              <div className="vehicles-form-group">
                <label htmlFor="capacity">Capacity (Bottles)</label>
                <input
                  type="text" id="capacity" name="capacity"
                  placeholder="e.g. 100"
                  value={formData.capacity} onChange={handleInputChange} required
                />
              </div>

              <div className="vehicles-form-group">
                <label htmlFor="status">Status</label>
                <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              <div className="vehicles-modal-actions">
                <button type="button" className="vehicles-cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="vehicles-submit-btn">
                  Register Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehicles;