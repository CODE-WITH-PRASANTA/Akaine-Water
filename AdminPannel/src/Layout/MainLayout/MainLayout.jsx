import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Close mobile overlay when clicking outside the sidebar
  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <div className={`MainLayout ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar isCollapsed={isCollapsed} isMobileOpen={isMobileOpen} />
      
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="MainLayout-overlay" onClick={closeMobileSidebar}></div>
      )}

      <div className="MainLayout-container">
        <Topbar toggleSidebar={toggleSidebar} />
        <main className="MainLayout-content">
          {children ? children : (
            <div className="MainLayout-placeholder">
              <h2>Welcome to Dashboard</h2>
              <p>This is where your primary views and page layouts will dynamically render.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;