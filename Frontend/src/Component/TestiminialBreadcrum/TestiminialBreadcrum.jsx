import React from 'react';
import './TestiminialBreadcrum.css';

const TestiminialBreadcrum = () => {
  // होम पेज पर डायरेक्ट नेविगेट करने के लिए फ़ंक्शन
  const handleHomeClick = (e) => {
    e.preventDefault();
    window.location.href = '/'; // यदि react-router-dom इस्तेमाल कर रहे हैं तो navigate('/') का उपयोग करें
  };

  return (
    <div className="testimonial-banner-wrapper">
      {/* हल्का बैकड्रॉप ओवरले ताकि टेक्स्ट छवि के ऊपर बिल्कुल साफ़ दिखाई दे */}
      <div className="testimonial-banner-overlay"></div>

      {/* बिल्कुल बीच में अलाइन किया गया मुख्य टेक्स्ट और ब्रेडक्रंब बॉक्स */}
      <div className="testimonial-content-box">
        
        {/* मुख्य बड़े अक्षर (Main Title) */}
        <h1 className="testimonial-main-title">
          TESTIMONIALS
        </h1>

        {/* नीचे छोटे आकार में ब्रेडक्रंब (Small Subtitle Breadcrumb) */}
        <nav className="testimonial-breadcrumb-nav">
          <a 
            href="/" 
            onClick={handleHomeClick}
            className="testimonial-home-link"
          >
            Home
          </a>
          <span className="testimonial-breadcrumb-slash">/</span>
          <span className="testimonial-current-page">Testimonial</span>
        </nav>

      </div>
    </div>
  );
};

export default TestiminialBreadcrum;