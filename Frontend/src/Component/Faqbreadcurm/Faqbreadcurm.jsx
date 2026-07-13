import React from 'react';
import './Faqbreadcurm.css';

const Faqbreadcurm = () => {
  // होम पेज पर डायरेक्ट नेविगेट करने के लिए फ़ंक्शन
  const handleHomeClick = (e) => {
    e.preventDefault();
    window.location.href = '/'; // यदि react-router-dom इस्तेमाल कर रहे हैं तो navigate('/') का उपयोग करें
  };

  return (
    <div className="faq-banner-wrapper">
      {/* हल्का बैकड्रॉप ओवरले ताकि टेक्स्ट इमेज के ऊपर स्पष्ट और साफ दिखाई दे */}
      <div className="faq-banner-overlay"></div>

      {/* बिल्कुल बीच में अलाइन किया गया मुख्य टेक्स्ट और ब्रेडक्रंब बॉक्स */}
      <div className="faq-content-box">
        
        {/* मुख्य बड़े अक्षर (Main Title) */}
        <h1 className="faq-main-title">FAQ</h1>

        {/* नीचे छोटे आकार में ब्रेडक्रंब (Small Subtitle Breadcrumb) */}
        <nav className="faq-breadcrumb-nav">
          <a href="/" onClick={handleHomeClick} className="faq-home-link">
            Home
          </a>
          <span className="faq-breadcrumb-slash">/</span>
          <span className="faq-current-page">Faqs</span>
        </nav>

      </div>
    </div>
  );
};

export default Faqbreadcurm;