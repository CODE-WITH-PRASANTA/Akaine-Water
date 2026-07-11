import React, { useState } from 'react';
import { 
  Home, 
  Info, 
  ShoppingBag, 
  Layers, 
  BookOpen, 
  Store, 
  Phone, 
  ChevronDown 
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, isMobileOpen }) => {
  // Track open states for dropdown menus inside the sidebar
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
      icon: <ShoppingBag size={20} />,
      text: 'Blog Posting',
      subItems: [
        
        { text: 'Blog', path: '/blog' },
        { text: 'Blog Management', path: '/blog-management' },
      
      ],
    },
     
   
    {
      type: 'dropdown',
      icon: <ShoppingBag size={20} />,
      text: 'Products',
      subItems: [
        
        { text: 'Pricing', path: '/products/pricing' },
        { text: 'Testimonials', path: '/products/testimonials' },
      
      ],
    },
    {
      type: 'dropdown',
      icon: <Layers size={20} />,
      text: 'Services',
      subItems: [
        { text: 'All Services', path: '/services/all' },
        { text: 'Service Packages', path: '/services/packages' },
        { text: 'Request Service', path: '/services/request' },
      ],
    },
    {
      type: 'dropdown',
      icon: <BookOpen size={20} />,
      text: 'Resources',
      subItems: [
       
        { text: 'FAQs', path: '/resources/faqs' },
        { text: 'Our Team', path: '/resources/team' },
        { text: 'Gallery', path: '/resources/gallary' },
      ],
    },
    {
      type: 'dropdown',
      icon: <Store size={20} />,
      text: 'Shop',
      subItems: [
        { text: 'Shop Main', path: '/shop' },
        { text: 'Cart', path: '/shop/cart' },
        { text: 'Checkout', path: '/shop/checkout' },
        { text: 'My Account', path: '/shop/account' },
      ],
    },
    { type: 'link', icon: <Phone size={20} />, text: 'Contact', path: '/contact' },
  ];

  return (
    <aside className={`Sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
      <div className="Sidebar-logo">
        <div className="Sidebar-logo-icon">A</div>
        {!isCollapsed && <span className="Sidebar-logo-text">Admin<span>Panel</span></span>}
      </div>
      
      <nav className="Sidebar-nav">
        {menuItems.map((item, index) => {
          if (item.type === 'link') {
            return (
              <a key={index} href={item.path} className="Sidebar-link">
                <span className="Sidebar-icon">{item.icon}</span>
                {!isCollapsed && <span className="Sidebar-text">{item.text}</span>}
              </a>
            );
          }

          // Render Dropdown item grouping
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
              
              {/* Dropdown Items (Hidden on hover when sidebar is collapsed completely) */}
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