import React, { useState, useEffect, useRef } from 'react';
import { FiUser, FiTrash2, FiChevronDown } from 'react-icons/fi';
import './Vehicles.css';

const Vehicles = () => {
  // Initial state populated with the reference data
  const [vehicles, setVehicles] = useState([
    { id: 1, number: 'OD-02 AB 1234', driver: 'Amit Verma', capacity: '100 Bottles', status: 'Active' },
    { id: 2, number: 'OD-05 CD 5678', driver: 'Priya Sahoo', capacity: '150 Bottles', status: 'Active' },
    { id: 3, number: 'OD-08 EF 3456', driver: 'Suresh Das', capacity: '80 Bottles', status: 'Maintenance' },
    { id: 4, number: 'OD-11 GH 7890', driver: 'Rahul Nayak', capacity: '100 Bottles', status: 'Active' },
  ]);

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

  // Updates status from the custom dropdown menu item click
  const handleStatusSelect = (id, newStatus) => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
    );
    setActiveDropdownId(null); // Close dropdown menu
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.number.trim() || !formData.driver.trim() || !formData.capacity.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const formattedCapacity = formData.capacity.toLowerCase().includes('bottles') 
      ? formData.capacity 
      : `${formData.capacity} Bottles`;

    const newVehicle = {
      id: Date.now(),
      number: formData.number,
      driver: formData.driver,
      capacity: formattedCapacity,
      status: formData.status
    };

    setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
    setIsModalOpen(false);
  };

  const handleDeleteClick = (id, vehicleNum) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete vehicle ${vehicleNum}?`);
    if (confirmDelete) {
      setVehicles((prevVehicles) => prevVehicles.filter((v) => v.id !== id));
    }
  };

  // डाउनलोड फ़ंक्शन जो डेटा को CSV में बदल कर डाउनलोड करता है
  const handleDownload = () => {
    if (vehicles.length === 0) {
      alert("No vehicle data available to download!");
      return;
    }

    const headers = ['Vehicle No.', 'Driver', 'Capacity', 'Status'];
    const rows = vehicles.map(vehicle => [
      vehicle.number,
      vehicle.driver,
      vehicle.capacity,
      vehicle.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'Vehicle_Management_Report.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="vehicles-container">
      <div className="vehicles-card">
        {/* टाइटल और डाउनलोड बटन के लिए हेडर रैपर */}
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
              {vehicles.length > 0 ? (
                vehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td className="vehicles-fw-medium">{vehicle.number}</td>
                    <td>{vehicle.driver}</td>
                    <td>{vehicle.capacity}</td>
                    <td>
                      <span className={`vehicles-status-badge vehicles-badge-${vehicle.status.toLowerCase()}`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td>
                      <div className="vehicles-actions" ref={activeDropdownId === vehicle.id ? dropdownRef : null}>
                        
                        {/* Profile Option Wrapper */}
                        <div className="vehicles-profile-dropdown-wrapper">
                          <button 
                            className={`vehicles-action-btn vehicles-profile-trigger ${activeDropdownId === vehicle.id ? 'active' : ''}`}
                            title="Profile & Status Menu"
                            onClick={() => toggleDropdown(vehicle.id)}
                          >
                            <FiUser size={16} />
                            <FiChevronDown size={12} className="vehicles-dropdown-arrow" />
                          </button>

                          {/* Render Dynamic Click-based Dropdown */}
                          {activeDropdownId === vehicle.id && (
                            <div className="vehicles-custom-dropdown-menu">
                              <div className="dropdown-header">Change Status</div>
                              <button 
                                type="button"
                                className="dropdown-item option-active"
                                onClick={() => handleStatusSelect(vehicle.id, 'Active')}
                              >
                                Active
                              </button>
                              <button 
                                type="button"
                                className="dropdown-item option-inactive"
                                onClick={() => handleStatusSelect(vehicle.id, 'Inactive')}
                              >
                                Inactive
                              </button>
                              <button 
                                type="button"
                                className="dropdown-item option-maintenance"
                                onClick={() => handleStatusSelect(vehicle.id, 'Maintenance')}
                              >
                                Maintenance
                              </button>
                            </div>
                          )}
                        </div>

                        <button 
                          className="vehicles-action-btn delete-btn" 
                          title="Delete Vehicle"
                          onClick={() => handleDeleteClick(vehicle.id, vehicle.number)}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="vehicles-no-data">No vehicles registered. Click 'Add Vehicle' below.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="vehicles-footer">
          <button className="vehicles-add-btn" onClick={handleAddClick}>
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