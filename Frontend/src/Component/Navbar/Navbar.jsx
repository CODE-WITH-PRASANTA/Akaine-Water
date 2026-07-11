// Navbar.jsx
import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo-1.png'; // Import your logo image asset here

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor windows vertical scroll offset to trigger design variation states
  useEffect(() => {
    const handleScroll = () => {
      // Switches configuration when moving past the baseline hero threshold (e.g., 80px)
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navbar-wrapper ${isScrolled ? 'scrolled-state' : 'hero-state'}`}>
      <div className="navbar">
        {/* Brand Logo */}
        <a href="/" className="navbar-brand">
          <img src={logo} alt="Aguapure Logo" className="navbar-logo" />
        </a>

        {/* Dynamic Navigation Links Block */}
        <ul className={`navbar-menu ${isMobileMenuOpen ? 'is-open' : ''}`}>
          <li className="navbar-item">
            <a href="/home" className="navbar-link">Home </a>
          </li>
          
          <li className="navbar-item">
            <a href="/about" className="navbar-link">About</a>
          </li>

          {/* Products Dropdown */}
          <li className="navbar-item">
            <span className="navbar-link">Products <span className="navbar-arrow">▼</span></span>
            <ul className="navbar-dropdown">
              <li className="navbar-dropdown-item"><a href="/products/categories">Product Categories</a></li>
              <li className="navbar-dropdown-item"><a href="/products/pricing">Pricing</a></li>
              <li className="navbar-dropdown-item"><a href="/products/testimonials">Testimonials</a></li>
              <li className="navbar-dropdown-item"><a href="/products/join-now">Join Now</a></li>
            </ul>
          </li>

          {/* Services Dropdown */}
          <li className="navbar-item">
            <span className="navbar-link">Services <span className="navbar-arrow">▼</span></span>
            <ul className="navbar-dropdown">
              <li className="navbar-dropdown-item"><a href="/services/all">All Services</a></li>
              <li className="navbar-dropdown-item"><a href="/services/packages">Service Packages</a></li>
              <li className="navbar-dropdown-item"><a href="/services/pricing">Pricing</a></li>
              <li className="navbar-dropdown-item"><a href="/services/request">Request Service</a></li>
            </ul>
          </li>

          {/* Resources Dropdown */}
          <li className="navbar-item">
            <span className="navbar-link">Resources <span className="navbar-arrow">▼</span></span>
            <ul className="navbar-dropdown">
              <li className="navbar-dropdown-item"><a href="/resources/blog">Blog</a></li>
              <li className="navbar-dropdown-item"><a href="/resources/faqs">FAQs</a></li>
              <li className="navbar-dropdown-item"><a href="/resources/news">Latest News</a></li>
            </ul>
          </li>

          {/* Shop Dropdown */}
          <li className="navbar-item">
            <span className="navbar-link">Shop <span className="navbar-arrow">▼</span></span>
            <ul className="navbar-dropdown">
              <li className="navbar-dropdown-item"><a href="/shop">Shop</a></li>
              <li className="navbar-dropdown-item"><a href="/shop/cart">Cart</a></li>
              <li className="navbar-dropdown-item"><a href="/shop/checkout">Checkout</a></li>
              <li className="navbar-dropdown-item"><a href="/shop/account">My Account</a></li>
            </ul>
          </li>

          <li className="navbar-item">
            <a href="/contact" className="navbar-link">Contact</a>
          </li>
        </ul>

        {/* Right Section Actions - Rendered dynamically based on layout requirements */}
        <div className="navbar-actions">
          <button className="navbar-search-btn" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button className="navbar-order-btn">Order Now</button>
        </div>

        {/* Mobile View Hamburger Toggle */}
        <button className={`navbar-toggle ${isMobileMenuOpen ? 'is-open' : ''}`} onClick={toggleMobileMenu} aria-label="Toggle navigation Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;