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
  FaCalendarAlt
} from 'react-icons/fa';
import './RouteManagement.css';
import API, { IMG_URL } from '../../api/axios';

// Coordinates database for Map Pins (Fallback / Standard Lookup)
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

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150';

const EMPTY_FORM = {
  date: new Date().toISOString().split('T')[0],
  name: '',
  order: '',
  locations: [],
  vehicleNo: '',
  vehicle: '',
  image: null,
  imagePreview: ''
};

const RouteManagement = () => {
  // Modal & Route States
  const [showModal, setShowModal] = useState(false);
  const [locationInput, setLocationInput] = useState('');

  // Initial Stops for the Map Route Planner
  const [stops, setStops] = useState([]);

  // Leaflet Map Refs
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const dateInputRef = useRef(null);
  const baseHubCoords = [20.3050, 85.8280];

  // Table Data State
  const [tableData, setTableData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [showTableForm, setShowTableForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [locationOptions, setLocationOptions] = useState(LOCATION_OPTIONS);
  
  // State for delivery partners names
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const [loadingPartners, setLoadingPartners] = useState(false);

  // State for vehicles from Vehicle API
  const [vehicles, setVehicles] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(false);

  // Load Initial Data
  useEffect(() => {
    fetchTableRecords();
    fetchLocationOptions();
    fetchMapLocations();
    fetchDeliveryPartners();
    fetchVehicles();
  }, []);

  // --- Fetch Delivery Partners from Delivery API ---
  const fetchDeliveryPartners = async () => {
    try {
      setLoadingPartners(true);
      const response = await API.get('/delivery');
      if (response.data?.success) {
        setDeliveryPartners(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching delivery partners:', error);
      setDeliveryPartners([]);
    } finally {
      setLoadingPartners(false);
    }
  };

  // --- Fetch Vehicles from Vehicle API ---
  const fetchVehicles = async () => {
    try {
      setLoadingVehicles(true);
      const response = await API.get('/vehicle');
      console.log('Vehicle API Response:', response.data); // Debug log
      
      // Handle different response formats
      let vehicleData = [];
      if (response.data?.success && Array.isArray(response.data.data)) {
        vehicleData = response.data.data;
      } else if (Array.isArray(response.data)) {
        vehicleData = response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        vehicleData = response.data.data;
      }
      
      console.log('Processed Vehicle Data:', vehicleData); // Debug log
      setVehicles(vehicleData);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setVehicles([]);
    } finally {
      setLoadingVehicles(false);
    }
  };

  // --- API BACKEND LOGIC FUNCTIONS ---

  // 1. Fetch Location Options from Backend
  const fetchLocationOptions = async () => {
    try {
      const response = await API.get("/root");
      const routes = response.data?.data || [];
      const backendLocations = routes.flatMap(route =>
        route.locations?.map(loc => typeof loc === 'object' ? loc.name : loc) || []
      );
      setLocationOptions([
        ...new Set([
          ...LOCATION_OPTIONS,
          ...backendLocations
        ])
      ]);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  // 2. Fetch Map Locations from Backend
  const fetchMapLocations = async () => {
    try {
      const response = await API.get("/root/map");
      const locations = response.data?.data || [];
      setStops(
        locations.map((item, index) => ({
          id: item._id || item.id || Date.now() + index,
          name: item.name,
          coords: item.coords || LOCATION_COORDS[item.name.toLowerCase()] || baseHubCoords,
          distance: item.distance || Number((Math.random() * 5 + 1).toFixed(1))
        }))
      );
    } catch (error) {
      console.error("Map Error:", error);
    }
  };

  // 3. Build Image URL
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return DEFAULT_AVATAR;
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) return imagePath;
    const base = (IMG_URL || '').replace(/\/$/, '');
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${base}${cleanPath}`;
  };

  // 4. GET /api/root
  const fetchTableRecords = async () => {
    try {
      setLoadingTable(true);
      const response = await API.get('/root');
      const rawRecords = response.data?.data || [];

      const formatted = rawRecords.map((item) => ({
        ...item,
        id: item._id || item.id,
        locations: Array.isArray(item.locations) ? item.locations : [],
        image: getFullImageUrl(item.image)
      }));

      setTableData(formatted);
    } catch (error) {
      console.error('Error fetching route records:', error);
      alert(error.response?.data?.message || 'Failed to load routes from the server.');
    } finally {
      setLoadingTable(false);
    }
  };

  // 5. POST or PUT Route Record
  const handleTableSubmit = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.name || !formData.order || !formData.vehicleNo || !formData.vehicle) {
      alert('Please fill out all required fields.');
      return;
    }
    if (formData.locations.length === 0) {
      alert('Please select at least one location.');
      return;
    }
    if (!formData.image && !(editingId && formData.imagePreview)) {
      alert('Please upload an image.');
      return;
    }

    try {
      setSubmitting(true);

      const payload = new FormData();
      payload.append('date', formData.date);
      payload.append('name', formData.name);
      payload.append('order', formData.order);
      payload.append('vehicleNo', formData.vehicleNo);
      payload.append('vehicle', formData.vehicle);
      
      payload.append(
        "locations",
        JSON.stringify(
          formData.locations.map(loc => ({
            name: loc
          }))
        )
      );

      if (formData.image) {
        payload.append('image', formData.image);
      }

      if (editingId) {
        await API.put(`/root/${editingId}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await API.post('/root', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      await fetchTableRecords();
      setEditingId(null);
      setFormData(EMPTY_FORM);
      setShowTableForm(false);
    } catch (error) {
      console.error('Error saving record:', error);
      alert(error.response?.data?.message || 'Failed to save record. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // 6. DELETE /api/root/:id
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      await API.delete(`/root/${id}`);
      setTableData((prev) => prev.filter((item) => item.id !== id && item._id !== id));
    } catch (error) {
      console.error('Error deleting record:', error);
      alert(error.response?.data?.message || 'Failed to delete record.');
    }
  };

  // 7. Add Stop via Map Generation
  const handleGenerateRoute = (e) => {
    e.preventDefault();
    if (!locationInput) {
      alert("Select location");
      return;
    }

    const key = locationInput.toLowerCase();
    const coords = LOCATION_COORDS[key] || [20.3050, 85.8280];

    const newStop = {
      id: Date.now(),
      name: locationInput,
      coords,
      distance: Number((Math.random() * 5 + 1).toFixed(1))
    };

    setStops(prev => [
      ...prev,
      newStop
    ]);

    setLocationOptions(prev => [
      ...new Set([
        ...prev,
        locationInput
      ])
    ]);

    setLocationInput("");
    setShowModal(false);
  };

  // --- MAP RENDER LOGIC ---
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
        if (!stop.coords) return;
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

  const removeStop = (id) => {
    setStops(stops.filter((stop) => stop.id !== id));
  };

  // Metric Computations
  const totalDistance = stops.reduce((sum, stop) => sum + (stop.distance || 0), 0).toFixed(1);
  const totalMinutes = Math.round(stops.length * 8 + totalDistance * 3.2);
  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const estimatedTime = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;

  // Form Handlers
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
      setFormData((prev) => ({
        ...prev,
        locations: [...locationOptions]
      }));
    } else {
      setFormData((prev) => ({ ...prev, locations: [] }));
    }
  };

  const handleLocationCheckboxChange = (location) => {
    setFormData((prev) => {
      const isSelected = prev.locations.includes(location);
      return {
        ...prev,
        locations: isSelected
          ? prev.locations.filter((loc) => loc !== location)
          : [...prev.locations, location]
      };
    });
  };

  const handleEdit = (item) => {
    setEditingId(item._id || item.id);
    setFormData({
      date: item.date || new Date().toISOString().split('T')[0],
      name: item.name || '',
      order: item.order || '',
      locations: item.locations.map(loc => typeof loc === 'object' ? loc.name : loc) || [],
      vehicleNo: item.vehicleNo || '',
      vehicle: item.vehicle || '',
      image: null,
      imagePreview: item.image || ''
    });
    setShowTableForm(true);
  };

  // Handle vehicle selection - auto-fill vehicle number
  const handleVehicleSelect = (e) => {
    const selectedVehicleNumber = e.target.value;
    setFormData((prev) => ({
      ...prev,
      vehicle: selectedVehicleNumber,
      // Auto-fill vehicle number if needed
      vehicleNo: selectedVehicleNumber
    }));
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
                <select
                  className="route-management-modal-form__input"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  required
                >
                  <option value="">Select Location</option>
                  {locationOptions.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
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
              setFormData(EMPTY_FORM);
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

              {/* DATE PICKER */}
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

              {/* NAME DROPDOWN - Fetch from Delivery API */}
              <div className="form-group">
                <label>Name</label>
                <select
                  name="name"
                  className="form-select"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    {loadingPartners ? 'Loading delivery partners...' : 'Select Driver / Personnel'}
                  </option>
                  {deliveryPartners.length > 0 ? (
                    deliveryPartners.map((partner) => (
                      <option key={partner._id} value={partner.name}>
                        {partner.name} {partner.loginId ? `(${partner.loginId})` : ''}
                      </option>
                    ))
                  ) : (
                    // Fallback options if API fails
                    <>
                      <option value="Rahul Sharma">Rahul Sharma</option>
                      <option value="Amit Patel">Amit Patel</option>
                      <option value="Priya Das">Priya Das</option>
                      <option value="Suresh Kumar">Suresh Kumar</option>
                      <option value="Ananya Ray">Ananya Ray</option>
                      <option value="Vikram Singh">Vikram Singh</option>
                    </>
                  )}
                </select>
                {deliveryPartners.length === 0 && !loadingPartners && (
                  <small style={{ color: '#f59e0b', marginTop: '4px', display: 'block' }}>
                    ⚠️ No delivery partners found. Please add partners in Delivery ID section first.
                  </small>
                )}
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
                        checked={
                          formData.locations.length === locationOptions.length &&
                          locationOptions.length > 0
                        }
                        onChange={handleSelectAllLocations}
                      />
                      <strong>Select All</strong>
                    </label>
                    <hr />
                    {locationOptions.map((loc) => (
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

              {/* VEHICLE SELECTION - Auto-populates Vehicle Number */}
              <div className="form-group">
                <label>Select Vehicle</label>
                <select
                  name="vehicle"
                  className="form-select"
                  value={formData.vehicle}
                  onChange={handleVehicleSelect}
                  required
                >
                  <option value="" disabled>
                    {loadingVehicles ? 'Loading vehicles...' : 'Select Vehicle'}
                  </option>
                  {vehicles.length > 0 ? (
                    vehicles.map((vehicle) => {
                      const vehicleId = vehicle._id || vehicle.id;
                      const vehicleNumber = vehicle.number || vehicle.vehicleNo || '';
                      const driverName = vehicle.driver || 'No Driver';
                      const status = vehicle.status || 'Active';
                      
                      return (
                        <option key={vehicleId} value={vehicleNumber}>
                          {vehicleNumber} - {driverName} ({status})
                        </option>
                      );
                    })
                  ) : (
                    // Fallback options if API fails
                    <>
                      <option value="OD-02-AB-1234">OD-02-AB-1234 - Default Vehicle</option>
                      <option value="OD-03-CD-5678">OD-03-CD-5678 - Backup Vehicle</option>
                    </>
                  )}
                </select>
                {vehicles.length === 0 && !loadingVehicles && (
                  <small style={{ color: '#f59e0b', marginTop: '4px', display: 'block' }}>
                    ⚠️ No vehicles found. Please add vehicles in Vehicle Management section first.
                  </small>
                )}
              </div>

              {/* VEHICLE NUMBER - Auto-filled from vehicle selection */}
              <div className="form-group">
                <label>Vehicle Number</label>
                <input
                  type="text"
                  name="vehicleNo"
                  placeholder="Auto-filled from vehicle selection"
                  value={formData.vehicleNo}
                  onChange={handleInputChange}
                  required
                  readOnly
                  style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                />
                <small style={{ color: '#6c757d', marginTop: '4px', display: 'block' }}>
                  Vehicle number is auto-filled when you select a vehicle above
                </small>
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
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="image-preview"
                    onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
                  />
                )}
              </div>
            </div>

            <button type="submit" className="form-submit-btn" disabled={submitting}>
              {submitting ? 'Saving...' : (editingId ? 'Update Record' : 'Submit Record')}
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
              {loadingTable ? (
                <tr>
                  <td colSpan="8" className="text-center no-data">
                    Loading records from server...
                  </td>
                </tr>
              ) : tableData.length > 0 ? (
                tableData.map((item) => (
                  <tr key={item._id || item.id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="table-img"
                        onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
                      />
                    </td>
                    <td className="font-semibold">{item.date}</td>
                    <td>{item.name}</td>
                    <td>{item.order}</td>
                    <td>
                      <div className="location-tags">
                        {item.locations && item.locations.length > 0 ? (
                          item.locations.map((loc, idx) => (
                            <span key={idx} className="location-badge">
                              {typeof loc === 'object' ? loc.name : loc}
                            </span>
                          ))
                        ) : (
                          <span className="location-badge">None</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="vehicle-badge" style={{ fontWeight: 'bold' }}>
                        {item.vehicleNo || 'N/A'}
                      </span>
                    </td>
                    <td>{item.vehicle || 'N/A'}</td>
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
                          onClick={() => handleDelete(item._id || item.id)}
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