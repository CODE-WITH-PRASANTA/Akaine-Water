import React, { useState } from 'react';
import './AkaineGalary.css';

// Importing assets from your directory structure
import img1 from '../../assets/akaineimage1.webp';
import img2 from '../../assets/akainepage2.webp';
import img3 from '../../assets/akainepage3.webp';
import img4 from '../../assets/akainepage4.webp';
import img5 from '../../assets/akainepage5.webp';
import img6 from '../../assets/akainepage6.webp';
import img7 from '../../assets/akaineimage7.webp';
import img8 from '../../assets/akaineimage8.webp';
import img9 from '../../assets/akaineimage9.webp';

const AkaineGalary = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Array of image objects matching your reference layout labels perfectly
  const galleryItems = [
    { src: img1, title: 'Experts' },
    { src: img2, title: 'Water' },
    { src: img3, title: 'Filters' },
    { src: img4, title: 'Delivery' },
    { src: img5, title: 'Company' },
    { src: img6, title: 'Strategy' },
    { src: img7, title: 'Purity' },
    { src: img8, title: 'Laboratory' },
    { src: img9, title: 'Eco Care' }
  ];

  // Lightbox view controls
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prevIndex) => (prevIndex + 1) % galleryItems.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prevIndex) => (prevIndex - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <div className="gallery-section-wrapper">
      {/* Symmetrical 3-Column Clean Alignment Grid */}
      <div className="akaine-gallery-grid">
        {galleryItems.map((item, index) => (
          <div key={index} className="gallery-card-container">
            {/* Uniformly Locked Image Box Frame */}
            <div className="gallery-item-card" onClick={() => openLightbox(index)}>
              <div className="card-frame-locked">
                <img src={item.src} alt={item.title} className="flower-zoom-image" />
                
                {/* Center Hover Overlay with Magnifying Glass */}
                <div className="search-icon-overlay">
                  <div className="search-logo-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.603 10.601z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Image title - turns red when hovered */}
            <h3 className="gallery-item-title">{item.title}</h3>
          </div>
        ))}
      </div>

      {/* Lightbox Modal Slider View */}
      {lightboxIndex !== null && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <button className="lightbox-close-btn" onClick={closeLightbox}>&times;</button>
          
          <button className="lightbox-arrow-btn left-arrow" onClick={prevImage} aria-label="Previous image">
            &#10094;
          </button>
          
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            <img src={galleryItems[lightboxIndex].src} alt={galleryItems[lightboxIndex].title} className="lightbox-main-img" />
            <div className="lightbox-counter">{`${lightboxIndex + 1} of ${galleryItems.length}`}</div>
          </div>
          
          <button className="lightbox-arrow-btn right-arrow" onClick={nextImage} aria-label="Next image">
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
};

export default AkaineGalary;