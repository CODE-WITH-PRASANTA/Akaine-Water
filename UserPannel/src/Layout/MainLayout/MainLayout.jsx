import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import './MainLayout.css';

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className="app-viewport">
      <div className="layout-body">
        {/* Sidebar */}
        <Sidebar 
          isCollapsed={isCollapsed} 
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Main Section */}
        <div className="main-wrapper">
          {/* Topbar */}
          <Topbar 
            toggleSidebar={toggleSidebar} 
            toggleMobileSidebar={toggleMobileSidebar}
          />

          {/* Dynamic Content Outlet */}
          <main className="content-area">
            <div className="content-container">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;