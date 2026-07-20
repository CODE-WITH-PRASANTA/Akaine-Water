import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  CreditCard, 
  LifeBuoy, 
  X,
  Layers
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const navItems = [
    { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { title: 'My Order', path: '/orders', icon: ShoppingBag },
    { title: 'Subscription', path: '/subscription', icon: CreditCard },
    { title: 'Support Ticket', path: '/support', icon: LifeBuoy },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`sidebar-container ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}
      >
        <div className="sidebar-top">
          {/* Header */}
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <div className="brand-icon">
                <Layers size={22} />
              </div>
              {(!isCollapsed || isMobileOpen) && (
                <span className="brand-text">
                  User<span className="brand-accent">Panel</span>
                </span>
              )}
            </div>

            <button 
              className="mobile-close-btn" 
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) => 
                    `nav-item ${isActive ? 'active' : ''}`
                  }
                >
                  <Icon size={20} className="nav-icon" />
                  {(!isCollapsed || isMobileOpen) && (
                    <span className="nav-title">{item.title}</span>
                  )}

                  {/* Tooltip for desktop collapsed state */}
                  {isCollapsed && !isMobileOpen && (
                    <div className="nav-tooltip">{item.title}</div>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Info Box */}
        <div className="sidebar-footer">
          {(!isCollapsed || isMobileOpen) ? (
            <div className="plan-card">
              <p className="plan-title">Pro Plan Active</p>
              <p className="plan-subtitle">Renews in 18 days</p>
            </div>
          ) : (
            <div className="status-dot" title="System Active" />
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;