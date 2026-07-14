import React, { useState } from 'react';
import './RouteManagement.css';

const RouteManagement = () => {
  const [showPopup, setShowPopup] = useState(false);
  
  // State for form fields
  const [courierName, setCourierName] = useState('');
  const [routeLocation, setRouteLocation] = useState('');
  
  // State for active map rendering location
  // Defaults to a central map view or a fallback location
  const [activeMapQuery, setActiveMapQuery] = useState('Bhubaneswar, Odisha, India');

  // Submit form handler
  const handleAddRoute = (e) => {
    e.preventDefault();
    if (routeLocation.trim() !== '') {
      // Updates the map query string dynamically based on user inputs
      setActiveMapQuery(routeLocation);
    }
    // Close popup form smoothly
    setShowPopup(false);
  };

  return (
    <div className="rm-dashboard-card">
      {/* Header with Dashboard Title and Top-Right Plus button */}
      <div className="rm-header-bar">
        <h2 className="rm-header-bar__title">Route Management</h2>
        <button 
          className="rm-header-bar__plus-btn"
          onClick={() => setShowPopup(true)}
          title="Create New Route Mapping"
        >
          ＋
        </button>
      </div>

      {/* Main Map Visualization Viewport Container */}
      <div className="rm-map-viewport">
        <iframe
          title="Google Maps Route Integration"
          className="rm-map-viewport__frame"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(activeMapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          allowFullScreen
        ></iframe>
      </div>

      {/* Active Route Context Banner (Below Map viewport UI) */}
      <div className="rm-status-footer">
        <span className="rm-status-footer__dot"></span>
        <p className="rm-status-footer__text">
          Showing active tracking nodes for: <strong>{activeMapQuery}</strong> 
          {courierName && ` (Courier Assigned: ${courierName})`}
        </p>
      </div>

      {/* Popup Form Modal Overlay */}
      {showPopup && (
        <div className="rm-modal-overlay" onClick={() => setShowPopup(false)}>
          <div className="rm-modal animate-modal-slide" onClick={(e) => e.stopPropagation()}>
            <div className="rm-modal__header">
              <h3>Assign New Route Mapping</h3>
              <button className="rm-modal__close" onClick={() => setShowPopup(false)}>&times;</button>
            </div>

            <form onSubmit={handleAddRoute} className="rm-modal-form">
              {/* Field 1: Courier Assignment dropdown */}
              <div className="rm-modal-form__field">
                <label htmlFor="courier-select">Assign Courier Partner</label>
                <select 
                  id="courier-select"
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

              {/* Field 2: Target Mapping Destination Input */}
              <div className="rm-modal-form__field">
                <label htmlFor="location-input">Target Hub Location / Address</label>
                <input 
                  id="location-input"
                  type="text" 
                  placeholder="e.g. Patia Square, Bhubaneswar" 
                  value={routeLocation}
                  onChange={(e) => setRouteLocation(e.target.value)}
                  required
                />
                <small className="rm-modal-form__help-text">
                  The integrated Google Map display above will center automatically to this address coordinates on submit.
                </small>
              </div>

              {/* Submit Buttons Tree */}
              <div className="rm-modal-form__actions">
                <button 
                  type="button" 
                  className="rm-modal-form__btn-cancel" 
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="rm-modal-form__btn-submit">
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