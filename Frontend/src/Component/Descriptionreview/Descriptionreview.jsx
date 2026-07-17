import React, { useState } from 'react';
import './Descriptionreview.css';

import imgProduct1 from '../../assets/shop-3.jpg';
import imgProduct2 from '../../assets/shop_10.jpg';
import imgProduct3 from '../../assets/shop-3.jpg';
import adminAvatar from '../../assets/shop_08-357x500 (1).jpg';

const Descriptionreview = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // रिलेटेड प्रोडक्ट्स डेटा (भारतीय रुपयों ₹ में)
  const relatedProducts = [
    { id: 1, name: 'Liquid Sky 1.5l', price: '₹199.00', stars: 5, img: imgProduct1 },
    { id: 2, name: 'Calm Source 0.75l', price: '₹499.00', stars: 4, img: imgProduct2 },
    { id: 3, name: 'Mineral Crest 0.5l', price: '₹149.00 - ₹1,199.00', stars: 5, img: imgProduct3 },
  ];

  // रिलेटेड प्रोडक्ट्स रेंडर करने के लिए एक कॉमन कंपोनेंट
  const RenderRelatedProducts = () => (
    <div className="dr-related-section">
      <h2 className="dr-related-title">Related products</h2>
      <div className="dr-products-grid">
        {relatedProducts.map((product) => (
          <div key={product.id} className="dr-product-card">
            <div className="dr-product-img-wrapper">
              <img src={product.img} alt={product.name} className="dr-product-img" />
              {/* होवर करने पर दिखने वाला कार्ट सिंबल */}
              <div className="dr-cart-overlay">
                <div className="dr-cart-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="dr-product-info">
              <div className="dr-product-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`star ${i < product.stars ? 'filled' : 'muted'}`}>★</span>
                ))}
              </div>
              <h3 className="dr-product-name">{product.name}</h3>
              <p className="dr-product-desc">Clean drinking water should be available to everyone. We work to make it possible.</p>
              <p className="dr-product-price">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="dr-container">
      {/* टैब हेडिंग्स */}
      <div className="dr-tab-header">
        <button 
          className={`dr-tab-btn ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button 
          className={`dr-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews (1)
        </button>
      </div>

      {/* टैब का कंटेंट */}
      <div className="dr-tab-content">
        {activeTab === 'description' && (
          <div className="dr-description-pane">
            <p className="dr-lead-text">
              Discover the purest taste of health and hydration with the best water company in Bhubaneswar and across Odisha.
            </p>
            <p className="dr-body-text">
              Based in Bhubaneswar, our mission is to deliver premium quality, meticulously filtered mineral water that meets the highest standards of safety and freshness. Catering to homes and corporate offices throughout Odisha, we utilize advanced purification technologies to ensure every drop retains essential minerals. Whether you need reliable delivery services or expert water solutions, our dedicated team is committed to keeping you hydrated and healthy every single day.
            </p>
            {/* डिस्क्रिप्शन के ठीक नीचे 1st इमेज का प्रोडक्ट्स */}
            <RenderRelatedProducts />
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="dr-reviews-pane">
            {/* पहले से मौजूद कस्टमर रिव्यू (इमेज 2 की तरह) */}
            <div className="dr-existing-review">
              <img src={adminAvatar} alt="admin" className="dr-admin-avatar" />
              <div className="dr-review-details">
                <div className="dr-review-meta">
                  <span className="dr-review-author">admin</span>
                  <span className="dr-review-date">– April 2, 2025</span>
                  <div className="dr-review-stars-display">★★★★★</div>
                </div>
                <p className="dr-review-text">
                  We support sustainable solutions in yachting, offering eco-friendly technologies and a conscious approach to sea travel to preserve natural beauty for future generations.
                </p>
              </div>
            </div>

            {/* Add a Review Form */}
            <div className="dr-add-review-section">
              <h3 className="dr-add-title">Add a review</h3>
              <p className="dr-form-warning">Your email address will not be published. Required fields are marked *</p>
              
              <div className="dr-rating-input-row">
                <span className="dr-rating-label">Your rating</span>
                <div className="dr-stars-interactive">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <span 
                      key={num}
                      className={`interactive-star ${(hoverRating || userRating) >= num ? 'active' : ''}`}
                      onClick={() => setUserRating(num)}
                      onMouseEnter={() => setHoverRating(num)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <form className="dr-review-form" onSubmit={(e) => e.preventDefault()}>
                <div className="dr-form-group">
                  <label>Your review *</label>
                  <textarea rows="6" required></textarea>
                </div>
                <div className="dr-form-group">
                  <label>Name *</label>
                  <input type="text" required />
                </div>
                <div className="dr-form-group">
                  <label>Email *</label>
                  <input type="email" required />
                </div>
                <button type="submit" className="dr-submit-btn-blue">Submit</button>
              </form>
            </div>

            {/* रिव्यू साइड में फॉर्म के नीचे भी 1st फोटो का प्रोडक्ट्स लोड करें */}
            <RenderRelatedProducts />
          </div>
        )}
      </div>
    </div>
  );
};

export default Descriptionreview;