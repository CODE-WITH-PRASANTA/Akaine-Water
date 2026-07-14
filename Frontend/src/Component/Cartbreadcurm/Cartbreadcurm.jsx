import React from 'react';
import './Cartbreadcurm.css';

const Cartbreadcurm = () => {
 
  const handleHomeClick = (e) => {
    e.preventDefault();
    window.location.href = '/'; // यदि आप react-router-dom का उपयोग कर रहे हैं, तो यहाँ navigate('/') लिख सकते हैं
  };

  return (
    <div className="cart-banner-section">
     
      <div className="cart-banner-content">
        
       
        <h1 className="cart-main-title">Cart</h1>

        <nav className="cart-breadcrumb-nav">
          <a href="/" onClick={handleHomeClick} className="cart-home-link">
            Home
          </a>
          <span className="cart-breadcrumb-separator">//</span>
          <span className="cart-current-text">cart</span>
        </nav>

      </div>
    </div>
  );
};

export default Cartbreadcurm;