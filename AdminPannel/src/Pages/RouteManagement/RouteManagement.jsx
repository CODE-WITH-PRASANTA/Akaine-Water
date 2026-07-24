import React, { useState, useEffect, useRef } from 'react';
import {
  FaPlus,
  FaTimes,
  FaRoute,
  FaClock,
  FaLocationArrow,
  FaExternalLinkAlt,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaUpload,
  FaCalendarAlt,
  FaTruck
} from 'react-icons/fa';
import './RouteManagement.css';

// Coordinates database for Map Pins
const LOCATION_COORDS = {
  "patia": [20.3540, 85.8330],
  "kiit square": [20.3510, 85.8180],
  "sailashree vihar": [20.3390, 85.8150],
  "chandrasekharpur": [20.3250, 85.8180],
  "jaydev vihar": [20.3015, 85.8192],
  "nayapalli": [20.2940, 85.8120],
  "rasulgarh": [20.2882, 85.8584],
  "master canteen": [20.2660, 85.8430],
  "khandagiri": [20.2580, 85.7870]
};

const LOCATION_OPTIONS = [
  'Patia',
  'KIIT Square',
  'Sailashree Vihar',
  'Chandrasekharpur',
  'Jaydev Vihar',
  'Nayapalli',
  'Rasulgarh'
];

// Dummy Data Options
const NAME_OPTIONS = [
  'Rahul Sharma',
  'Amit Patel',
  'Priya Das',
  'Suresh Kumar',
  'Ananya Ray',
  'Vikram Singh'
];

const VEHICLE_OPTIONS = [
  'Tata Ace (Mini Truck)',
  'Mahindra Bolero Pickup',
  'Eicher Pro 2049',
  'Hero Electric Van',
  'Ashok Leyland Dost'
];

const RouteManagement = () => {
  // Modal & Route States
  const [showModal, setShowModal] = useState(false);
  const [locationInput, setLocationInput] = useState('');

  // Initial Stops
  const [stops, setStops] = useState([
    { id: 1, name: 'Patia', distance: 2.1, coords: [20.3540, 85.8330] },
    { id: 2, name: 'KIIT Square', distance: 3.4, coords: [20.3510, 85.8180] },
    { id: 3, name: 'Sailashree Vihar', distance: 2.8, coords: [20.3390, 85.8150] },
    { id: 4, name: 'Chandrasekharpur', distance: 3.2, coords: [20.3250, 85.8180] }
  ]);

  // Leaflet Map Refs
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const dateInputRef = useRef(null);
  const baseHubCoords = [20.3050, 85.8280];

  // Initial Table Data
  const [tableData, setTableData] = useState([
    {
      id: 1,
      date: '2026-07-24',
      name: 'Rahul Sharma',
      order: 'Express Delivery',
      locations: ['Patia', 'KIIT Square'],
      vehicleNo: 'OD-02-AX-1234',
      vehicle: 'Tata Ace (Mini Truck)',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
    },
    {
      id: 2,
      date: '2026-07-25',
      name: 'Amit Patel',
      order: 'Standard Cargo',
      locations: ['Sailashree Vihar'],
      vehicleNo: 'OD-02-BZ-5678',
      vehicle: 'Mahindra Bolero Pickup',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    }
  ]);

  const [showTableForm, setShowTableForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Table Form Controls
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    name: '',
    order: '',
    locations: [],
    vehicleNo: '',
    vehicle: '',
    image: null,
    imagePreview: ''
  });

  // Load Map Dynamic Rendering
  useEffect(() => {
    const loadLeafletAssets = () => {
      if (window.L) {
        renderInteractiveMap();
        return;
      }

      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(cssLink);

      const jsScript = document.createElement('script');
      jsScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      jsScript.onload = () => renderInteractiveMap();
      document.head.appendChild(jsScript);
    };

    const renderInteractiveMap = () => {
      const L = window.L;
      if (!L || !mapContainerRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: false
      }).setView(baseHubCoords, 13);

      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(map);

      // Hub Marker Icon
      const hubIcon = L.divIcon({
        className: 'route-management-hub-marker',
        html: `<div class="hub-marker-wrapper"><span class="hub-icon">🏠</span></div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      L.marker(baseHubCoords, { icon: hubIcon })
        .addTo(map)
        .bindPopup('<b>Main Dispatch Hub</b>');

      const routePoints = [baseHubCoords];

      stops.forEach((stop, index) => {
        const stopIcon = L.divIcon({
          className: 'route-management-stop-marker',
          html: `<div class="stop-marker-wrapper">${index + 1}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        L.marker(stop.coords, { icon: stopIcon })
          .addTo(map)
          .bindPopup(`<b>Stop ${index + 1}: ${stop.name}</b>`);

        routePoints.push(stop.coords);
      });

      routePoints.push(baseHubCoords);

      if (routePoints.length > 1) {
        L.polyline(routePoints, {
          color: '#2563eb',
          weight: 4,
          opacity: 0.85,
          lineJoin: 'round'
        }).addTo(map);

        const bounds = L.latLngBounds(routePoints);
        map.fitBounds(bounds, { padding: [40, 40] });
      }
    };

    loadLeafletAssets();
  }, [stops]);

  // Handle Adding Stop from Modal
  const handleGenerateRoute = (e) => {
    e.preventDefault();
    if (!locationInput.trim()) return;

    const formattedKey = locationInput.toLowerCase().trim();
    let coords = LOCATION_COORDS[formattedKey];

    if (!coords) {
      const offsetLat = (Math.random() - 0.5) * 0.045;
      const offsetLng = (Math.random() - 0.5) * 0.045;
      coords = [baseHubCoords[0] + offsetLat, baseHubCoords[1] + offsetLng];
    }

    const calculatedDistance = parseFloat((Math.random() * 3 + 1.2).toFixed(1));

    const newStop = {
      id: Date.now(),
      name: locationInput,
      distance: calculatedDistance,
      coords: coords
    };

    setStops([...stops, newStop]);
    setLocationInput('');
    setShowModal(false);
  };

  const removeStop = (id) => {
    setStops(stops.filter((stop) => stop.id !== id));
  };

  // Helper Metrics Calculations
  const totalDistance = stops.reduce((sum, stop) => sum + stop.distance, 0).toFixed(1);
  const totalMinutes = Math.round(stops.length * 8 + totalDistance * 3.2);
  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const estimatedTime = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;

  // --- Table Form Operations ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectAllLocations = (e) => {
    if (e.target.checked) {
      setFormData((prev) => ({ ...prev, locations: [...LOCATION_OPTIONS] }));
    } else {
      setFormData((prev) => ({ ...prev, locations: [] }));
    }
  };

  const handleLocationCheckboxChange = (location) => {
    setFormData((prev) => {
      const isSelected = prev.locations.includes(location);
      if (isSelected) {
        return { ...prev, locations: prev.locations.filter((loc) => loc !== location) };
      } else {
        return { ...prev, locations: [...prev.locations, location] };
      }
    });
  };

  const handleTableSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.name || !formData.order || !formData.vehicleNo || !formData.vehicle) {
      alert('Please fill out all required fields.');
      return;
    }

    if (editingId) {
      setTableData((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                date: formData.date,
                name: formData.name,
                order: formData.order,
                locations: formData.locations,
                vehicleNo: formData.vehicleNo,
                vehicle: formData.vehicle,
                image: formData.imagePreview || item.image
              }
            : item
        )
      );
      setEditingId(null);
    } else {
      const newItem = {
        id: Date.now(),
        date: formData.date,
        name: formData.name,
        order: formData.order,
        locations: formData.locations.length ? formData.locations : ['General Location'],
        vehicleNo: formData.vehicleNo,
        vehicle: formData.vehicle,
        image: formData.imagePreview || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
      };
      setTableData([...tableData, newItem]);
    }

    // Reset Form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      name: '',
      order: '',
      locations: [],
      vehicleNo: '',
      vehicle: '',
      image: null,
      imagePreview: ''
    });
    setShowTableForm(false);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      date: item.date,
      name: item.name,
      order: item.order,
      locations: item.locations,
      vehicleNo: item.vehicleNo,
      vehicle: item.vehicle,
      image: null,
      imagePreview: item.image
    });
    setShowTableForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setTableData(tableData.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="route-management-wrapper">
      {/* Route Planner Header section */}
      <div className="route-management-header">
        <div className="route-management-header__title-box">
          <span className="route-management-header__count-badge">{stops.length}</span>
          <h2 className="route-management-header__title">Route Planner</h2>
        </div>
        <button
          className="route-management-header__add-btn"
          onClick={() => setShowModal(true)}
        >
          <FaPlus /> Add Stop
        </button>
      </div>

      {/* Main Content Workspace Split Panel */}
      <div className="route-management-workspace">
        {/* Left Map View */}
        <div className="route-management-map-container">
          <div ref={mapContainerRef} className="route-management-map-canvas"></div>

          <div className="route-management-floating-search">
            <div className="route-management-floating-search__details">
              <span className="route-management-floating-search__main-text">Bhubaneswar</span>
              <span className="route-management-floating-search__sub-text">Bhubaneswar, Odisha, India</span>
            </div>
            <div className="route-management-floating-search__actions">
              <button className="route-management-floating-search__btn" title="Open Map Link">
                <FaExternalLinkAlt />
              </button>
              <button className="route-management-floating-search__btn active" title="Get Directions">
                <FaLocationArrow />
              </button>
            </div>
          </div>
        </div>

        {/* Right Pane Sidebar Cards */}
        <div className="route-management-sidebar-queue">
          {stops.map((stop, index) => (
            <div key={stop.id} className="route-management-queue-card">
              <div className="route-management-queue-card__left">
                <div className="route-management-queue-card__num-indicator">{index + 1}</div>
                <div className="route-management-queue-card__info-group">
                  <h4 className="route-management-queue-card__name">{stop.name}</h4>
                </div>
              </div>
              <div className="route-management-queue-card__right">
                <span className="route-management-queue-card__distance">{stop.distance} KM</span>
                <button
                  className="route-management-queue-card__remove-btn"
                  onClick={() => removeStop(stop.id)}
                  title="Remove stop"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          ))}

          {stops.length === 0 && (
            <div className="route-management-queue-empty">
              <p>No stops assigned. Click "+ Add Stop" to populate checkpoints.</p>
            </div>
          )}
        </div>
      </div>

      {/* Control Summary Footer Metrics */}
      <div className="route-management-footer">
        <div className="route-management-footer__stats-group">
          <span className="route-management-footer__stat-item">
            <FaRoute className="route-management-footer__stat-icon" />
            Total Distance : <strong>{totalDistance} KM</strong>
          </span>
          <span className="route-management-footer__stat-item">
            <FaClock className="route-management-footer__stat-icon" />
            Estimated Time : <strong>{estimatedTime}</strong>
          </span>
        </div>

        <button
          className="route-management-footer__navigate-btn"
          onClick={() => alert(`Initiating navigation sequences for ${stops.length} locations!`)}
        >
          <FaLocationArrow /> Start Navigation
        </button>
      </div>

      {/* Add Stop Modal */}
      {showModal && (
        <div className="route-management-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="route-management-modal-pane" onClick={(e) => e.stopPropagation()}>
            <div className="route-management-modal-header">
              <h3 className="route-management-modal-title">Assign New Route Mapping</h3>
              <button
                className="route-management-modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleGenerateRoute} className="route-management-modal-form">
              <div className="route-management-modal-form__group">
                <label className="route-management-modal-form__label">Target Hub Location / Address</label>
                <input
                  type="text"
                  className="route-management-modal-form__input"
                  placeholder="e.g. Patia Square, Bhubaneswar"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  required
                />
                <span className="route-management-modal-form__tip">
                  The integrated Map display above will center automatically to this address coordinates on submit.
                </span>
              </div>

              <div className="route-management-modal-actions">
                <button
                  type="button"
                  className="route-management-modal-actions__cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="route-management-modal-actions__submit"
                >
                  Generate Map Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- TABLE MANAGEMENT SECTION --- */}
      <div className="route-management-table-section">
        <div className="route-management-table-header">
          <h3>Route Assignment Directory</h3>
          <button
            className="route-management-table-add-btn"
            onClick={() => {
              setEditingId(null);
              setFormData({
                date: new Date().toISOString().split('T')[0],
                name: '',
                order: '',
                locations: [],
                vehicleNo: '',
                vehicle: '',
                image: null,
                imagePreview: ''
              });
              setShowTableForm(!showTableForm);
            }}
          >
            <FaPlus /> {showTableForm ? 'Close Form' : 'Add Data'}
          </button>
        </div>

        {/* Collapsible Add / Edit Form */}
        {showTableForm && (
          <form className="route-management-table-form" onSubmit={handleTableSubmit}>
            <h4 className="form-heading">{editingId ? 'Edit Entry' : 'Add New Entry'}</h4>
            <div className="form-grid">
              
              {/* DATE PICKER WITH WORKING CALENDAR ICON */}
              <div className="form-group date-input-wrapper">
                <label>Date</label>
                <div 
                  className="calendar-field" 
                  onClick={() => dateInputRef.current && dateInputRef.current.showPicker && dateInputRef.current.showPicker()}
                >
                  <input
                    ref={dateInputRef}
                    type="date"
                    name="date"
                    className="custom-date-input"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                  <FaCalendarAlt className="calendar-icon" />
                </div>
              </div>

              {/* NAME DROPDOWN */}
              <div className="form-group">
                <label>Name</label>
                <select
                  name="name"
                  className="form-select"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select Driver / Personnel</option>
                  {NAME_OPTIONS.map((driver) => (
                    <option key={driver} value={driver}>
                      {driver}
                    </option>
                  ))}
                </select>
              </div>

              {/* ORDER INPUT */}
              <div className="form-group">
                <label>Order</label>
                <input
                  type="text"
                  name="order"
                  placeholder="Order Type/Details"
                  value={formData.order}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* CHECKBOX MULTI-SELECT DROPDOWN FOR LOCATION */}
              <div className="form-group custom-dropdown-group">
                <label>Location</label>
                <div className="custom-dropdown-header" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <span>
                    {formData.locations.length === 0
                      ? 'Select Locations'
                      : `${formData.locations.length} Selected`}
                  </span>
                  <FaChevronDown />
                </div>

                {isDropdownOpen && (
                  <div className="custom-dropdown-menu">
                    <label className="dropdown-option select-all">
                      <input
                        type="checkbox"
                        checked={formData.locations.length === LOCATION_OPTIONS.length}
                        onChange={handleSelectAllLocations}
                      />
                      <strong>Select All</strong>
                    </label>
                    <hr />
                    {LOCATION_OPTIONS.map((loc) => (
                      <label key={loc} className="dropdown-option">
                        <input
                          type="checkbox"
                          checked={formData.locations.includes(loc)}
                          onChange={() => handleLocationCheckboxChange(loc)}
                        />
                        {loc}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* VEHICLE NUMBER INPUT */}
              <div className="form-group">
                <label>Vehicle Number</label>
                <input
                  type="text"
                  name="vehicleNo"
                  placeholder="e.g. OD-02-AX-1234"
                  value={formData.vehicleNo}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* VEHICLE TYPE DROPDOWN */}
              <div className="form-group">
                <label>Vehicle</label>
                <select
                  name="vehicle"
                  className="form-select"
                  value={formData.vehicle}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select Vehicle Type</option>
                  {VEHICLE_OPTIONS.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              {/* IMAGE FILE UPLOAD INPUT */}
              <div className="form-group file-upload-group">
                <label>Upload Image</label>
                <label htmlFor="image-file-input" className="file-upload-label">
                  <FaUpload /> {formData.image ? formData.image.name : 'Choose File'}
                </label>
                <input
                  id="image-file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                {formData.imagePreview && (
                  <img src={formData.imagePreview} alt="Preview" className="image-preview" />
                )}
              </div>
            </div>

            <button type="submit" className="form-submit-btn">
              {editingId ? 'Update Record' : 'Submit Record'}
            </button>
          </form>
        )}

        {/* Data Table */}
        <div className="route-management-table-container">
          <table className="route-management-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Date</th>
                <th>Name</th>
                <th>Order</th>
                <th>Location</th>
                <th>Vehicle No.</th>
                <th>Vehicle</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.image} alt={item.name} className="table-img" />
                    </td>
                    <td className="font-semibold">{item.date}</td>
                    <td>{item.name}</td>
                    <td>{item.order}</td>
                    <td>
                      <div className="location-tags">
                        {item.locations && item.locations.length > 0 ? (
                          item.locations.map((loc, idx) => (
                            <span key={idx} className="location-badge">
                              {loc}
                            </span>
                          ))
                        ) : (
                          <span className="location-badge">None</span>
                        )}
                      </div>
                    </td>
                    <td><span className="vehicle-badge">{item.vehicleNo}</span></td>
                    <td>{item.vehicle}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn edit"
                          onClick={() => handleEdit(item)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDelete(item.id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center no-data">
                    No data records available. Click "+ Add Data" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RouteManagement;