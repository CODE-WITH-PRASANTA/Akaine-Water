import React from 'react';
import faqImage from "../../assets/akin-12.png";

<img
  src={faqImage}
  alt="FAQ"
  className="w-full h-full object-cover"
/>

const Faqbreadcurm = () => {
  const handleHomeClick = (e) => {
    e.preventDefault();
    window.location.href = '../..'; // यदि react-router-dom इस्तेमाल कर रहे हैं तो navigate('/') का उपयोग करें
  };

  return (
    <div 
      className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[350px] bg-cover bg-center bg-no-repeat flex items-center justify-center select-none"
      style={{ 
        backgroundImage: `url('/WhatsApp Image 2026-07-10 at 6.13.46 PM_4.jpeg')` 
      }}
    >
     
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px]"></div>

      {/* बिल्कुल बीच में अलाइन किया गया मुख्य टेक्स्ट और ब्रेडक्रंब बॉक्स */}
      <div className="relative z-10 text-center flex flex-col items-center justify-center bg-white/40 px-8 py-5 rounded-xl shadow-sm backdrop-blur-sm max-w-[90%] sm:max-w-md">
        
        {/* मुख्य बड़े अक्षर (Main Title) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 tracking-wider mb-2 uppercase">
          FAQ
        </h1>

        {/* नीचे छोटे आकार में ब्रेडक्रंब (Small Subtitle Breadcrumb) */}
        <nav className="text-sm sm:text-base font-semibold text-gray-600">
          <a 
            href="/" 
            onClick={handleHomeClick}
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
          >
            Home
          </a>
          <span className="mx-2 text-gray-400">/</span>
          <span>Faqs</span>
        </nav>

      </div>
    </div>
  );
};

export default Faqbreadcurm;