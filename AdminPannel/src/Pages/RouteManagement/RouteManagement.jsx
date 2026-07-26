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
import API from '../../api/axios';

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

const DEFAULT_LOCATION_OPTIONS = [
  'Patia',
  'KIIT Square',
  'Sailashree Vihar',
  'Chandrasekharpur',
  'Jaydev Vihar',
  'Nayapalli',
  'Rasulgarh'
];

const API_BASE_URL = 'http://localhost:5000/api/routeRoutes';

const RouteManagement = () => {
  // Modal & Route States
  const [showModal, setShowModal] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [stops, setStops] = useState([]);
  const [routeLocations, setRouteLocations] = useState(DEFAULT_LOCATION_OPTIONS);
  const [totalDistance, setTotalDistance] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState('0m');
  const [baseHubCoords, setBaseHubCoords] = useState([20.3050, 85.8280]);
  const [loadingStops, setLoadingStops] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  // Leaflet Map Refs
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null); // holds hub/stop markers + polyline so they can be redrawn without recreating the map
  const dateInputRef = useRef(null);

  // Table Data State
  const [tableData, setTableData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [tableError, setTableError] = useState(null);

  const [showTableForm, setShowTableForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // State for delivery partners names from Delivery API
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const [loadingPartners, setLoadingPartners] = useState(false);

  // State for vehicles from Vehicle API
  const [vehicles, setVehicles] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(false);

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
      console.log('Vehicle API Response:', response.data);

      let vehicleData = [];
      if (response.data?.success && Array.isArray(response.data.data)) {
        vehicleData = response.data.data;
      } else if (Array.isArray(response.data)) {
        vehicleData = response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        vehicleData = response.data.data;
      }

      console.log('Processed Vehicle Data:', vehicleData);
      setVehicles(vehicleData);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setVehicles([]);
    } finally {
      setLoadingVehicles(false);
    }
  };

  // --- Fetch Table Records from Backend (/api/routeRoutes/assignments) ---
  // These are the real "Add New Entry" submissions, persisted in MongoDB —
  // NOT derived from stops. Previously the table only showed stop-based
  // placeholder rows because nothing was ever saved to the backend on submit.
  const fetchTableRecords = async () => {
    try {
      setLoadingTable(true);
      setTableError(null);
      console.log('Fetching route assignment records...');

      const response = await fetch(`${API_BASE_URL}/assignments`);
      const result = await response.json();
      console.log('Assignments response:', result);

      if (result.success && Array.isArray(result.data)) {
        const formatted = result.data.map((item) => ({
          id: item._id,
          date: item.date,
          name: item.name,
          order: item.order,
          locations: item.locations || [],
          vehicleNo: item.vehicleNo,
          vehicle: item.vehicle,
          image: item.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
        }));
        setTableData(formatted);
      } else {
        setTableData([]);
      }
    } catch (error) {
      console.error('Error fetching route assignment records:', error);
      setTableError(error.message || 'Failed to fetch data from server');
      setTableData(getFallbackData());
    } finally {
      setLoadingTable(false);
    }
  };

  // Fallback data function
  const getFallbackData = () => {
    return [
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
    ];
  };

  // --- Fetch Active Route ---
  const fetchActiveRoute = async () => {
    setLoadingStops(true);
    try {
      console.log('Fetching active route from:', `${API_BASE_URL}/active`);
      const response = await fetch(`${API_BASE_URL}/active`);
      const result = await response.json();
      console.log('Active route response:', result);

      if (result.success && result.data) {
        const routeData = result.data;
        setStops(routeData.stops || []);
        setTotalDistance(routeData.totalDistance || 0);
        setEstimatedTime(routeData.estimatedTime || '0m');
        if (routeData.hubCoords) {
          setBaseHubCoords(routeData.hubCoords);
        }

        const stopNames = (routeData.stops || []).map(stop => stop.name);
        const mergedLocations = [...new Set([...DEFAULT_LOCATION_OPTIONS, ...stopNames])];
        setRouteLocations(mergedLocations);
        setMapReady(true);
      }
    } catch (err) {
      console.error('Error fetching active route:', err);
      setMapReady(true);
    } finally {
      setLoadingStops(false);
    }
  };

  // Load Initial Data
  useEffect(() => {
    fetchActiveRoute();
    fetchTableRecords();
    fetchDeliveryPartners();
    fetchVehicles();
  }, []);

  /* -----------------------------------------------------------------
     MAP INITIALIZATION — runs once when mapReady flips true.
     This used to run on every `stops` change and call
     mapInstanceRef.current.remove() to recreate the whole map, which
     raced with Leaflet's internal animation frame (fitBounds / marker
     positioning) and threw:
       "Cannot read properties of undefined (reading '_leaflet_pos')"
     Fix: create the map + a single layerGroup ONCE, then only touch
     the layerGroup's contents when stops/hub change (see next effect).
  ----------------------------------------------------------------- */
  useEffect(() => {
    if (!mapReady || !mapContainerRef.current) return;

    let cancelled = false;

    const initMap = () => {
      if (cancelled || !mapContainerRef.current || mapInstanceRef.current) return;
      const L = window.L;
      if (!L) return;

      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: false
      }).setView(baseHubCoords, 13);

      mapInstanceRef.current = map;
      layerGroupRef.current = L.layerGroup().addTo(map);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(map);

      setTimeout(() => {
        if (!cancelled && mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 200);
    };

    const loadLeafletAssets = () => {
      if (window.L) {
        initMap();
        return;
      }

      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(cssLink);

      const jsScript = document.createElement('script');
      jsScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      jsScript.onload = () => {
        if (!cancelled) initMap();
      };
      document.head.appendChild(jsScript);
    };

    loadLeafletAssets();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        layerGroupRef.current = null;
      }
    };
  }, [mapReady]);

  /* -----------------------------------------------------------------
     MARKER / ROUTE REDRAW — runs whenever stops or hub coords change.
     Only clears and repopulates the layerGroup; the map instance
     itself is never destroyed, so there's no race with Leaflet's
     internal position updates.
  ----------------------------------------------------------------- */
  useEffect(() => {
    const L = window.L;
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!L || !map || !layerGroup) return;

    try {
      layerGroup.clearLayers();

      const hubIcon = L.divIcon({
        className: 'route-management-hub-marker',
        html: `<div class="hub-marker-wrapper"><span class="hub-icon">🏠</span></div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      L.marker(baseHubCoords, { icon: hubIcon })
        .addTo(layerGroup)
        .bindPopup('<b>Main Dispatch Hub</b>');

      const routePoints = [baseHubCoords];

      stops.forEach((stop, index) => {
        if (!stop.coords || !Array.isArray(stop.coords) || stop.coords.length !== 2) return;

        const stopIcon = L.divIcon({
          className: 'route-management-stop-marker',
          html: `<div class="stop-marker-wrapper">${index + 1}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        L.marker(stop.coords, { icon: stopIcon })
          .addTo(layerGroup)
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
        }).addTo(layerGroup);

        const bounds = L.latLngBounds(routePoints);
        map.fitBounds(bounds, { padding: [40, 40], animate: false });
      }

      map.invalidateSize();
    } catch (error) {
      console.error('Error redrawing map layers:', error);
    }
  }, [stops, baseHubCoords]);

  // Handle Adding Stop via Backend API (`/add-stop`)
  const handleGenerateRoute = async (e) => {
    e.preventDefault();
    if (!locationInput.trim()) {
      alert('Please enter a location');
      return;
    }

    if (stops.some(s => s.name.toLowerCase() === locationInput.toLowerCase().trim())) {
      alert(`⚠️ Location "${locationInput}" already exists in the route.`);
      return;
    }

    const formattedKey = locationInput.toLowerCase().trim();
    let coords = LOCATION_COORDS[formattedKey];

    if (!coords) {
      const offsetLat = (Math.random() - 0.5) * 0.045;
      const offsetLng = (Math.random() - 0.5) * 0.045;
      coords = [baseHubCoords[0] + offsetLat, baseHubCoords[1] + offsetLng];
    }

    const calculatedDistance = parseFloat((Math.random() * 3 + 1.2).toFixed(1));

    try {
      setLoadingStops(true);
      console.log('Adding stop:', locationInput);

      const response = await fetch(`${API_BASE_URL}/add-stop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: locationInput,
          distance: calculatedDistance,
          coords: coords
        })
      });
      const result = await response.json();
      console.log('Add stop response:', result);

      if (result.success) {
        const updatedStops = result.data.stops;
        setStops(updatedStops);
        setTotalDistance(result.data.totalDistance);
        setEstimatedTime(result.data.estimatedTime);

        const newLocation = locationInput.trim();
        setRouteLocations((prev) => {
          const alreadyExists = prev.some(
            (loc) => loc.toLowerCase() === newLocation.toLowerCase()
          );
          if (alreadyExists) return prev;
          return [...prev, newLocation];
        });

        setLocationInput('');
        setShowModal(false);
        alert(`✅ Location "${locationInput}" added successfully!`);
        await fetchTableRecords();
      } else {
        alert(result.message || 'Failed to add stop');
      }
    } catch (error) {
      console.error('API Error adding stop:', error);
      alert('Error adding location. Please try again.');
    } finally {
      setLoadingStops(false);
    }
  };

  // Handle Removing Stop via Backend API (`/stop/:stopId`)
  const removeStop = async (id) => {
    if (!window.confirm('Are you sure you want to remove this stop?')) return;

    try {
      setLoadingStops(true);
      const response = await fetch(`${API_BASE_URL}/stop/${id}`, {
        method: 'DELETE'
      });
      const result = await response.json();

      if (result.success) {
        setStops(result.data.stops);
        setTotalDistance(result.data.totalDistance);
        setEstimatedTime(result.data.estimatedTime);
        alert('✅ Stop removed successfully!');
        await fetchTableRecords();
      } else {
        alert(result.message || 'Failed to delete stop');
      }
    } catch (error) {
      console.error('API Error deleting stop:', error);
      alert('Error removing stop. Please try again.');
    } finally {
      setLoadingStops(false);
    }
  };

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
      setFormData((prev) => ({ ...prev, locations: [...routeLocations] }));
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

  const handleVehicleSelect = (e) => {
    const selectedVehicleNumber = e.target.value;
    if (selectedVehicleNumber) {
      setFormData((prev) => ({
        ...prev,
        vehicle: selectedVehicleNumber,
        vehicleNo: selectedVehicleNumber
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        vehicle: '',
        vehicleNo: ''
      }));
    }
  };

  // Submit form - Save to backend
  const handleTableSubmit = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.name || !formData.order || !formData.vehicleNo || !formData.vehicle) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      setLoadingTable(true);

      // Prepare data for backend
      const payload = {
        date: formData.date,
        name: formData.name,
        order: formData.order,
        locations: formData.locations.length ? formData.locations : ['General Location'],
        vehicleNo: formData.vehicleNo,
        vehicle: formData.vehicle,
        image: formData.imagePreview || undefined // only send when a new image was picked
      };

      console.log('Saving to backend:', payload);

      if (editingId) {
        const response = await fetch(`${API_BASE_URL}/assignments/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        console.log('Update assignment response:', result);

        if (!result.success) {
          alert(result.message || 'Failed to update record');
          return;
        }

        alert('✅ Record updated successfully!');
        setEditingId(null);
      } else {
        const response = await fetch(`${API_BASE_URL}/assignments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        console.log('Create assignment response:', result);

        if (!result.success) {
          alert(result.message || 'Failed to create record');
          return;
        }

        // Also add the name as a stop if it's a delivery partner
        const isDeliveryPartner = deliveryPartners.some(p => p.name === formData.name);
        if (isDeliveryPartner && !stops.some(s => s.name === formData.name)) {
          try {
            const coords = LOCATION_COORDS[formData.name.toLowerCase()] || [baseHubCoords[0] + (Math.random() - 0.5) * 0.045, baseHubCoords[1] + (Math.random() - 0.5) * 0.045];
            const distance = parseFloat((Math.random() * 3 + 1.2).toFixed(1));

            await fetch(`${API_BASE_URL}/add-stop`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: formData.name,
                distance: distance,
                coords: coords
              })
            });
            // Refresh route data
            await fetchActiveRoute();
          } catch (error) {
            console.error('Error adding as stop:', error);
          }
        }

        alert('✅ Record created successfully!');
      }

      // Refetch from backend so the table always reflects real DB state
      await fetchTableRecords();

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

    } catch (error) {
      console.error('Error saving record:', error);
      alert('Failed to save record. Please try again.');
    } finally {
      setLoadingTable(false);
    }
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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/assignments/${id}`, {
        method: 'DELETE'
      });
      const result = await response.json();

      if (!result.success) {
        alert(result.message || 'Failed to delete record');
        return;
      }

      alert('✅ Record deleted successfully!');
      await fetchTableRecords();
    } catch (error) {
      console.error('Error deleting record:', error);
      alert('Error deleting record. Please try again.');
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
          disabled={loadingStops}
        >
          <FaPlus /> {loadingStops ? 'Loading...' : 'Add Stop'}
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
          {loadingStops ? (
            <div className="route-management-queue-empty">
              <p>Loading stops...</p>
            </div>
          ) : (
            stops.map((stop, index) => (
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
                    disabled={loadingStops}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            ))
          )}

          {!loadingStops && stops.length === 0 && (
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
            Total Distance : <strong>{Number(totalDistance).toFixed(1)} KM</strong>
          </span>
          <span className="route-management-footer__stat-item">
            <FaClock className="route-management-footer__stat-icon" />
            Estimated Time : <strong>{estimatedTime}</strong>
          </span>
        </div>

        <button
          className="route-management-footer__navigate-btn"
          onClick={() => alert(`Initiating navigation sequences for ${stops.length} locations!`)}
          disabled={stops.length === 0}
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
                  disabled={loadingStops}
                >
                  {loadingStops ? 'Adding...' : 'Generate Map Route'}
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

              {/* NAME DROPDOWN - Fetched from Delivery API */}
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
                        checked={formData.locations.length === routeLocations.length}
                        onChange={handleSelectAllLocations}
                      />
                      <strong>Select All ({routeLocations.length})</strong>
                    </label>
                    <hr />
                    {routeLocations.map((loc) => (
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

              {/* VEHICLE SELECTION - Fetched from Vehicle API */}
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
                      const capacity = vehicle.capacity || 'N/A';
                      const status = vehicle.status || 'Active';

                      return (
                        <option key={vehicleId} value={vehicleNumber}>
                          {vehicleNumber} - {driverName} (Capacity: {capacity}, Status: {status})
                        </option>
                      );
                    })
                  ) : (
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

            <button type="submit" className="form-submit-btn" disabled={loadingTable}>
              {loadingTable ? 'Saving...' : (editingId ? 'Update Record' : 'Submit Record')}
            </button>
          </form>
        )}

        {/* Data Table - Connected to Backend */}
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
              ) : tableError ? (
                <tr>
                  <td colSpan="8" className="text-center no-data" style={{ color: '#ef4444' }}>
                    ⚠️ Error: {tableError}
                  </td>
                </tr>
              ) : tableData.length > 0 ? (
                tableData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="table-img"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150';
                        }}
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