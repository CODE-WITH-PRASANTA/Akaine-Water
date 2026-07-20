import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Menu, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  CheckCircle2,
  Info
} from 'lucide-react';
import './Topbar.css';

const Topbar = ({ toggleSidebar, toggleMobileSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const location = useLocation();

  const getPageTitle = (path) => {
    switch (path) {
      case '/dashboard': return 'Dashboard Overview';
      case '/orders': return 'My Orders';
      case '/subscription': return 'Subscription Plans';
      case '/support': return 'Support Tickets';
      default: return 'User Panel';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="topbar-container">
      {/* Left Navigation Actions */}
      <div className="topbar-left">
        <button
          onClick={toggleSidebar}
          className="toggle-btn desktop-toggle"
          aria-label="Toggle Desktop Sidebar"
        >
          <Menu size={20} />
        </button>

        <button
          onClick={toggleMobileSidebar}
          className="toggle-btn mobile-toggle"
          aria-label="Toggle Mobile Sidebar"
        >
          <Menu size={20} />
        </button>

        <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
      </div>

      {/* Right User Actions */}
      <div className="topbar-right">
        {/* Notifications Popup */}
        <div className="dropdown-wrapper" ref={notificationRef}>
          <button
            onClick={() => {
              setIsNotificationOpen(!isNotificationOpen);
              setIsProfileOpen(false);
            }}
            className="icon-btn"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="badge-dot" />
          </button>

          <div className={`dropdown-card notification-card ${isNotificationOpen ? 'open' : ''}`}>
            <div className="card-header">
              <h3>Notifications</h3>
              <span className="badge-pill">2 New</span>
            </div>

            <div className="notification-list">
              <div className="notification-item">
                <CheckCircle2 size={18} className="status-icon text-green" />
                <div>
                  <p className="item-title">Order Dispatched</p>
                  <p className="item-desc">Your subscription order #4092 is on its way.</p>
                  <span className="item-time">5 mins ago</span>
                </div>
              </div>

              <div className="notification-item">
                <Info size={18} className="status-icon text-blue" />
                <div>
                  <p className="item-title">Support Ticket Resolved</p>
                  <p className="item-desc">Ticket #8821 has been marked as completed.</p>
                  <span className="item-time">1 hour ago</span>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <button className="text-btn">Mark all as read</button>
            </div>
          </div>
        </div>

        {/* Profile Dropdown */}
        <div className="dropdown-wrapper" ref={profileRef}>
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationOpen(false);
            }}
            className="profile-btn"
          >
            <div className="avatar">SK</div>
            <div className="profile-info">
              <p className="profile-name">Saroj Sahoo</p>
              <p className="profile-role">User Account</p>
            </div>
            <ChevronDown size={16} className="chevron-icon" />
          </button>

          <div className={`dropdown-card profile-card ${isProfileOpen ? 'open' : ''}`}>
            <div className="profile-card-header">
              <p className="profile-name">Saroj Sahoo</p>
              <p className="profile-role">saroj@example.com</p>
            </div>

            <div className="menu-group">
              <button onClick={() => setIsProfileOpen(false)} className="menu-item">
                <User size={16} /> Profile
              </button>
              <button onClick={() => setIsProfileOpen(false)} className="menu-item">
                <Settings size={16} /> Settings
              </button>
            </div>

            <div className="menu-divider">
              <button onClick={() => setIsProfileOpen(false)} className="menu-item logout">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;