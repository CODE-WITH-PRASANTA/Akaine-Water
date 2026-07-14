import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  Store,
  Phone,
  ChevronDown,
  FileText,
  Users,
  Package,
  ClipboardList,
  Truck
} from "lucide-react";
import './Sidebar.css';

const Sidebar = ({ isCollapsed, isMobileOpen }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (title) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const menuItems = [
    { type: 'link', icon: <Home size={20} />, text: 'Dashboard', path: '/' },
    
    {
      type: 'dropdown',
      icon: <FileText size={20} />,
      text: 'Blog Posting',
      subItems: [
        { text: 'Blog', path: '/blog' },
        { text: 'Blog Management', path: '/blog-management' },
      ],
    },
    
    { type: 'link', icon: <Users size={20} />, text: 'Testimonials', path: '/products/testimonials' },
    
    {
      type: 'dropdown',
      icon: <BookOpen size={20} />,
      text: 'Resources',
      subItems: [
        { text: 'Our Team', path: '/resources/team' },
        { text: 'Gallery', path: '/resources/gallary' },
      ],
    },
    
    { type: 'link', icon: <Store size={20} />, text: 'Shop Main', path: '/shop' },
    
    { type: 'link', icon: <Phone size={20} />, text: 'Contact', path: '/contact' },
    
    // --- DIVIDER WITH SECTION HEADING: WDMS ---
    { type: 'section-heading', text: 'WDMS' },

    { type: 'link', icon: <Home size={20} />, text: 'WDMS Dashboard', path: '/wdms/dashboard' },

    {
      type: 'dropdown',
      icon: <Package size={20} />,
      text: 'Stock Management',
      subItems: [
        { text: 'Manage Stock', path: '/wdms/stock/manage' },
        { text: 'Purchase History', path: '/wdms/stock/purchase-history' },
      ],
    },

    { type: 'link', icon: <ClipboardList size={20} />, text: 'Order Management', path: '/wdms/orders' },

    { type: 'link', icon: <Truck size={20} />, text: 'Delivery Boy Assign', path: '/wdms/assign-delivery' },
  ];

  return (
    <aside className={`Sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
      <div className="Sidebar-logo">
        <div className="Sidebar-logo-icon">A</div>
        {!isCollapsed && <span className="Sidebar-logo-text">Admin<span>Panel</span></span>}
      </div>
      
      <nav className="Sidebar-nav">
        {menuItems.map((item, index) => {
          // Handle Section Heading with Divider
          if (item.type === 'section-heading') {
            return (
              <div key={index} className="Sidebar-section-wrapper">
                <hr className="Sidebar-divider" />
                {!isCollapsed && <span className="Sidebar-section-title">{item.text}</span>}
              </div>
            );
          }

          // Handle Standard Links
          if (item.type === 'link') {
            return (
              <a key={index} href={item.path} className="Sidebar-link">
                <span className="Sidebar-icon">{item.icon}</span>
                {!isCollapsed && <span className="Sidebar-text">{item.text}</span>}
              </a>
            );
          }

          // Handle Dropdown Menus
          const isDropdownOpen = !!openDropdowns[item.text];
          return (
            <div key={index} className={`Sidebar-dropdown-wrapper ${isDropdownOpen ? 'is-open' : ''}`}>
              <button 
                onClick={() => !isCollapsed && toggleDropdown(item.text)} 
                className="Sidebar-link Sidebar-dropdown-toggle"
              >
                <span className="Sidebar-icon">{item.icon}</span>
                {!isCollapsed && (
                  <>
                    <span className="Sidebar-text">{item.text}</span>
                    <ChevronDown size={16} className={`Sidebar-chevron ${isDropdownOpen ? 'rotated' : ''}`} />
                  </>
                )}
              </button>
              
              {!isCollapsed && (
                <div className="Sidebar-submenu">
                  {item.subItems.map((subItem, subIndex) => (
                    <a key={subIndex} href={subItem.path} className="Sidebar-submenu-link">
                      {subItem.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;