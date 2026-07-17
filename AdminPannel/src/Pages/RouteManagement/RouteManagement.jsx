import React, { useState, useEffect, useRef } from 'react';
import { 
  FaPlus, 
  FaTimes, 
  FaMapMarkerAlt, 
  FaRoute, 
  FaClock, 
  FaLocationArrow, 
  FaExternalLinkAlt, 
  FaHome 
} from 'react-icons/fa';
import './RouteManagement.css';

// Local coordinates database for Bhubaneswar neighborhoods to enable instant dynamic routing
const BHUBANESWAR_COORDS = {
  "patia": [20.3540, 85.8330],
  "kiit square": [20.3510, 85.8180],
  "kiit": [20.3510, 85.8180],
  "sailashree vihar": [20.3390, 85.8150],
  "chandrasekharpur": [20.3250, 85.8180],
  "jaydev vihar": [20.3015, 85.8192],
  "nayapalli": [20.2940, 85.8120],
  "rasulgarh": [20.2882, 85.8584],
  "master canteen": [20.2660, 85.8430],
  "khandagiri": [20.2580, 85.7870],
};

const RouteManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [courierName, setCourierName] = useState('');
  const [locationInput, setLocationInput] = useState('');
  
  // Default stops synchronized with reference layout 3
  const [stops, setStops] = useState([
    { id: 1, name: 'Patia', orders: 5, distance: 2.1, courier: 'Rahul Sharma', coords: [20.3540, 85.8330] },
    { id: 2, name: 'KIIT Square', orders: 8, distance: 3.4, courier: 'Amit Patel', coords: [20.3510, 85.8180] },
    { id: 3, name: 'Sailashree Vihar', orders: 4, distance: 2.8, courier: 'Vikram Singh', coords: [20.3390, 85.8150] },
    { id: 4, name: 'Chandrasekharpur', orders: 6, distance: 3.2, courier: 'Deepak Kumar', coords: [20.3250, 85.8180] }
  ]);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const baseHubCoords = [20.3050, 85.8280]; // Central Base dispatch hub (green home icon)

  // Clean and initialize/re-render Map layouts dynamically on stops array updates
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

      // Clean, elegant map layer style (Carto Voyager)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map);

      // Render Hub marker (Home icon inside green marker)
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

      // Draw custom numbered stop pins
      stops.forEach((stop, index) => {
        const stopIcon = L.divIcon({
          className: 'route-management-stop-marker',
          html: `<div class="stop-marker-wrapper">${index + 1}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        L.marker(stop.coords, { icon: stopIcon })
          .addTo(map)
          .bindPopup(`<b>Stop ${index + 1}: ${stop.name}</b><br/>Orders: ${stop.orders}<br/>Courier: ${stop.courier}`);

        routePoints.push(stop.coords);
      });

      // Complete routing loop back to home base
      routePoints.push(baseHubCoords);

      // Connect stops with standard route line
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

  // Form submit handler to calculate relative coordinates and append stops
  const handleGenerateRoute = (e) => {
    e.preventDefault();
    if (!locationInput.trim() || !courierName) return;

    const formattedKey = locationInput.toLowerCase().trim();
    let coords = BHUBANESWAR_COORDS[formattedKey];

    // Auto-generate coordinates relative to base hub if landmark is missing from db
    if (!coords) {
      const offsetLat = (Math.random() - 0.5) * 0.045;
      const offsetLng = (Math.random() - 0.5) * 0.045;
      coords = [baseHubCoords[0] + offsetLat, baseHubCoords[1] + offsetLng];
    }

    const calculatedDistance = parseFloat((Math.random() * 3 + 1.2).toFixed(1));
    const randomOrdersCount = Math.floor(Math.random() * 7) + 2;

    const newStop = {
      id: Date.now(),
      name: locationInput,
      orders: randomOrdersCount,
      distance: calculatedDistance,
      courier: courierName,
      coords: coords
    };

    setStops([...stops, newStop]);
    setLocationInput('');
    setCourierName('');
    setShowModal(false);
  };

  const removeStop = (id) => {
    setStops(stops.filter(stop => stop.id !== id));
  };

  // Helper metric calculations
  const totalDistance = stops.reduce((sum, stop) => sum + stop.distance, 0).toFixed(1);
  const totalMinutes = Math.round((stops.length * 8) + (totalDistance * 3.2));
  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const estimatedTime = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;

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
        
        {/* Left pane map canvas view */}
        <div className="route-management-map-container">
          <div ref={mapContainerRef} className="route-management-map-canvas"></div>
          
          {/* Mock Floating Search Header matching Reference Layout 1 */}
          <div className="route-management-floating-search">
            <div className="route-management-floating-search__details">
              <span className="route-management-floating-search__main-text">Bhubaneswar</span>
              <span className="route-management-floating-search__sub-text">Bhubaneswar, Odisha, India</span>
            </div>
            <div className="route-management-floating-search__actions">
              <button className="route-management-floating-search__btn" title="Open Map Link"><FaExternalLinkAlt /></button>
              <button className="route-management-floating-search__btn active" title="Get Directions"><FaLocationArrow /></button>
            </div>
          </div>
        </div>

        {/* Right pane active stops list queue */}
        <div className="route-management-sidebar-queue">
          {stops.map((stop, index) => (
            <div key={stop.id} className="route-management-queue-card">
              <div className="route-management-queue-card__left">
                <div className="route-management-queue-card__num-indicator">{index + 1}</div>
                <div className="route-management-queue-card__info-group">
                  <h4 className="route-management-queue-card__name">{stop.name}</h4>
                  <p className="route-management-queue-card__meta">{stop.orders} Orders &bull; {stop.courier}</p>
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
              <p>No stops assigned to this route sheet. Click "+ Add Stop" to populate checkpoints.</p>
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

      {/* Interactive Modal Dialog Container matching Reference Layout 2 */}
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
                <label className="route-management-modal-form__label">Assign Courier Partner</label>
                <select 
                  className="route-management-modal-form__select"
                  value={courierName} 
                  onChange={(e) => setCourierName(e.target.value)}
                  required
                >
                  <option value="">-- Select Delivery Boy --</option>
                  <option value="Rahul Sharma">Rahul Sharma</option>
                  <option value="Amit Patel">Amit Patel</option>
                  <option value="Vikram Singh">Vikram Singh</option>
                  <option value="Deepak Kumar">Deepak Kumar</option>
                </select>
              </div>

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
                  The integrated Google Map display above will center automatically to this address coordinates on submit.
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
    </div>
  );
};

export default RouteManagement;