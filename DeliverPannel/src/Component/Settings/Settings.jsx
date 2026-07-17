import React from 'react';
import { 
  FaCogs, 
  FaShieldAlt, 
  FaFileInvoiceDollar, 
  FaTruck, 
  FaCreditCard, 
  FaEnvelope, 
  FaWhatsapp, 
  FaCog 
} from 'react-icons/fa';
import './Settings.css';

const Settings = () => {
  // Array holding settings grid configuration data
  const settingsOptions = [
    { id: 1, label: 'Company Settings', icon: <FaCogs /> },
    { id: 2, label: 'Price Settings', icon: <FaShieldAlt /> },
    { id: 3, label: 'Tax Settings', icon: <FaFileInvoiceDollar /> },
    { id: 4, label: 'Delivery Charges', icon: <FaTruck /> },
    { id: 5, label: 'Payment Gateway', icon: <FaCreditCard /> },
    { id: 6, label: 'SMS / Email Settings', icon: <FaEnvelope /> },
    { id: 7, label: 'WhatsApp API', icon: <FaWhatsapp /> },
    { id: 8, label: 'General Settings', icon: <FaCog /> },
  ];

  const handleManageSettings = () => {
    alert("Redirecting to core configuration panel...");
  };

  return (
    <div className="settings-container full-page-view">
      <div className="settings-wrapper full-width-stack">
        
        {/* ================= CARD CONTAINER ================= */}
        <div className="settings-card full-size-card">
          
          <div className="settings-card-header">
            <h2 className="settings-title">SETTINGS</h2>
          </div>

          {/* Inner Grid Window Content */}
          <div className="settings-grid-inner">
            <div className="settings-grid">
              {settingsOptions.map((option) => (
                <div key={option.id} className="settings-item-card">
                  <div className="settings-icon-wrapper">
                    {option.icon}
                  </div>
                  <span className="settings-item-label">{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Call Button Bottom Control Footer */}
          <div className="settings-action-footer">
            <button 
              onClick={handleManageSettings} 
              className="settings-submit-btn blue-btn"
            >
              Manage Settings
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Settings;