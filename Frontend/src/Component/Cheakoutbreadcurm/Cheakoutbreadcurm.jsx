import React from 'react';
import './Cheakoutbreadcurm.css';

const Cheakoutbreadcurm = () => {
  // होम पेज पर सीधे रीडायरेक्ट करने के लिए फ़ंक्शन
  const handleHomeClick = (e) => {
    e.preventDefault();
    window.location.href = '/'; // यदि आप react-router-dom का उपयोग कर रहे हैं, तो navigate('/') का उपयोग करें
  };

  return (
    <div className="checkout-banner-section">
      {/* बिल्कुल बीच में अलाइन किया गया कंटेंट बॉक्स */}
      <div className="checkout-banner-content">
        
        {/* मुख्य बड़े आकार में "Cart" टेक्स्ट */}
        <h1 className="checkout-main-title">Cart</h1>
        
        {/* नीचे छोटे आकार में "Home // cart" ब्रेडक्रंब */}
        <nav className="checkout-breadcrumb-nav">
          <a href="/" onClick={handleHomeClick} className="checkout-home-link">
            Home
          </a>
          {/* संदर्भ छवि की तरह लाल रंग का डबल स्लैश */}
          <span className="checkout-breadcrumb-separator">//</span>
          <span className="checkout-current-text">cart</span>
        </nav>

      </div>
    </div>
  );
};

export default Cheakoutbreadcurm;