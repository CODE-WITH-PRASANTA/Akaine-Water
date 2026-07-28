import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, ChevronDown, Bell, Search, User, LogOut, Shield, Info, AlertTriangle, CreditCard, ShoppingBag } from 'lucide-react';
import './Topbar.css';

const Topbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef(null);
  const userRef = useRef(null);

  // Close notifications/user dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    setUserDropdownOpen(false);

    // Clear the same session keys Login.jsx sets on sign-in
    sessionStorage.removeItem('isAdminAuthenticated');
    sessionStorage.removeItem('deliveryPartner');

    navigate('/login', { replace: true });
  };

  return (
    <header className="Topbar">
      <div className="Topbar-left">
        <button className="Topbar-toggle-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <Menu size={22} />
        </button>
        <div className="Topbar-path">
          <span className="Topbar-path-parent">Deliver</span>
          <span className="Topbar-path-separator">/</span>
          <span className="Topbar-path-current">Dashboard</span>
        </div>
      </div>

      <div className="Topbar-right">
        <div className="Topbar-search-box">
          <Search size={18} className="Topbar-search-icon" />
          <input type="text" placeholder="Search..." className="Topbar-search-input" />
        </div>

        <div className="Topbar-notification-wrapper" ref={notificationsRef}>
          <button
            className="Topbar-action-btn"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <Bell size={20} />
            <span className="Topbar-badge">3</span>
          </button>

          <div className={`Topbar-notification-popup ${notificationsOpen ? 'is-open' : ''}`}>
            <div className="Notification-header">
              <div className="Notification-header-info">
                <span className="Notification-badge-inline">12</span>
                <h3 className="Notification-title">Notifications</h3>
              </div>
            </div>

            <div className="Notification-list">
              <div className="Notification-item">
                <div className="Notification-icon-wrapper info">
                  <Info size={20} />
                </div>
                <div className="Notification-content">
                  <p className="Notification-item-title">Nest Delivery</p>
                  <p className="Notification-item-subtitle">Patia - Rahul Kumar</p>
                </div>
                <span className="Notification-time">10:30 AM</span>
              </div>

              <div className="Notification-item">
                <div className="Notification-icon-wrapper warning">
                  <AlertTriangle size={20} />
                </div>
                <div className="Notification-content">
                  <p className="Notification-item-title">Low Stock Alert</p>
                  <p className="Notification-item-subtitle">Only 20 Jars Remaining</p>
                </div>
                <span className="Notification-time">10:15 AM</span>
              </div>

              <div className="Notification-item">
                <div className="Notification-icon-wrapper payment">
                  <CreditCard size={20} />
                </div>
                <div className="Notification-content">
                  <p className="Notification-item-title">Payment Due</p>
                  <p className="Notification-item-subtitle">Amit Rout - ₹80</p>
                </div>
                <span className="Notification-time">09:45 AM</span>
              </div>

              <div className="Notification-item">
                <div className="Notification-icon-wrapper order">
                  <ShoppingBag size={20} />
                </div>
                <div className="Notification-content">
                  <p className="Notification-item-title">New Order Received</p>
                  <p className="Notification-item-subtitle">KIIT Square</p>
                </div>
                <span className="Notification-time">09:20 AM</span>
              </div>
            </div>

            <div className="Notification-footer">
              <a href="#viewall" className="Notification-viewall">View All</a>
            </div>
          </div>
        </div>

        <div className="Topbar-user" ref={userRef} onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="User Avatar"
            className="Topbar-avatar"
          />
          <div className="Topbar-user-info">
            <span className="Topbar-username">Jane Doe</span>
            <span className="Topbar-role">Administrator</span>
          </div>
          <ChevronDown size={16} className={`Topbar-chevron ${userDropdownOpen ? 'open' : ''}`} />

          {userDropdownOpen && (
            <div className="Topbar-dropdown">
              <a href="#profile" className="Topbar-dropdown-item">
                <User size={16} /> My Profile
              </a>
              <a href="#security" className="Topbar-dropdown-item">
                <Shield size={16} /> Security
              </a>
              <div className="Topbar-dropdown-divider"></div>
              <a href="#logout" className="Topbar-dropdown-item logout" onClick={handleLogout}>
                <LogOut size={16} /> Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;