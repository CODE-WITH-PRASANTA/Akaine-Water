import React, { useState } from 'react';
import {
  Home,
  ClipboardList,
  MapPin,
  Users,
  Truck,
  RotateCcw,
  CreditCard,
  BarChart3,
  Bell,
  Settings,
  LogOut
} from "lucide-react";
import './Sidebar.css';

const Sidebar = ({ isCollapsed, isMobileOpen }) => {
  // Menu items taken exactly from the provided Water Delivery dashboard image
  const menuItems = [
    { type: 'link', icon: <Home size={20} />, text: 'Dashboard', path: '/' },
    { type: 'link', icon: <ClipboardList size={20} />, text: 'Orders', path: '/wdms/orders' },
    { type: 'link', icon: <MapPin size={20} />, text: 'Route Planner', path: '/wdms/route-planner' },
    { type: 'link', icon: <Users size={20} />, text: 'Customers', path: '/wdms/customers' },
    { type: 'link', icon: <Truck size={20} />, text: 'Vehicle Stock', path: '/wdms/vehicle-stock' },
    { type: 'link', icon: <RotateCcw size={20} />, text: 'Empty Return', path: '/wdms/empty-return' },
    { type: 'link', icon: <CreditCard size={20} />, text: 'Payments', path: '/wdms/payments' },
    { type: 'link', icon: <BarChart3 size={20} />, text: 'Reports', path: '/wdms/reports' },
    { type: 'link', icon: <Bell size={20} />, text: 'Notifications', path: '/wdms/notifications' },
    { type: 'link', icon: <Settings size={20} />, text: 'Settings', path: '/wdms/settings' },
    { type: 'link', icon: <LogOut size={20} />, text: 'Logout', path: '/logout' },
  ];

  return (
    <aside className={`Sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
      {/* Sidebar Header Title */}
      <div className="Sidebar-logo">
        <div className="Sidebar-logo-icon">💧</div>
        {!isCollapsed && <span className="Sidebar-logo-text">WATER DELIVERY</span>}
      </div>
      
      {/* Navigation Links */}
      <nav className="Sidebar-nav">
        {menuItems.map((item, index) => {
          if (item.type === 'link') {
            return (
              <a 
                key={index} 
                href={item.path} 
                className={`Sidebar-link ${item.text === 'Dashboard' ? 'active' : ''}`}
              >
                <span className="Sidebar-icon">{item.icon}</span>
                {!isCollapsed && <span className="Sidebar-text">{item.text}</span>}
              </a>
            );
          }
          return null;
        })}
      </nav>

      {/* User Profile Card Section from Image */}
      
    </aside>
  );
};

export default Sidebar;