import React, { useState } from 'react';
import './HomeOurProducts.css';

// --- LOCAL IMAGE ASSET PATHS ---
import img2Ltr from '../../assets/shop-1.jpg';
import img15Ltr from '../../assets/shop-2.jpg';
import img12Ltr from '../../assets/shop-3.jpg';
import imgCombo from '../../assets/shop-4.jpg';
import imgDispenser from '../../assets/shop-5.jpg';

// Overlapping visual elements from the hero banner graphics
import iceBgCluster from '../../assets/ice.png';
import giantJugBg from '../../assets/shop-top-image.png';

const HomeOurProducts = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const products = [
    {
      id: 1,
      name: '2 Ltr Bottled Water',
      price: 1045, 
      delivery: 'Delivery Tom 4:30pm – 6:30pm',
      img: img2Ltr, 
      rotateImg: true
    },
    {
      id: 2,
      name: '15 Ltr Bottled Water',
      price: 1670, 
      delivery: 'Delivery Mon 9:30am – 10:30am',
      img: img15Ltr,
      rotateImg: false
    },
    {
      id: 3,
      name: '12 Ltr Bottled Water',
      price: 1340, 
      delivery: 'Delivery Mon 9:30am – 10:30am',
      img: img12Ltr,
      rotateImg: false
    },
    {
      id: 4,
      name: '15+2 Ltr Combo Pack',
      price: 2110, 
      delivery: 'Delivery Tom 4:30pm – 6:30pm',
      img: imgCombo,
      rotateImg: false
    },
    {
      id: 5,
      name: 'Water Dispenser',
      price: 5770, 
      delivery: 'Delivery Mon 8:30am – 9:30am',
      img: imgDispenser,
      rotateImg: false
    }
  ];

  return (
    <div className="HomeOurProducts-container">
      {/* --- HERO HEADER GRAPHIC CONTAINER --- */}
      <div className="HomeOurProducts-heroSection">
        
        {/* Layer 2: Overlapping Composite Assembly Routing (Jug + Ice + Badge) */}
        <div className="HomeOurProducts-graphicWrapper">
          <div className="HomeOurProducts-badgeOuterCircle">
            <div className="HomeOurProducts-badgeInnerCircle">
              <div className="HomeOurProducts-badgeContainer">
                <span>No</span>
                <span className="HomeOurProducts-badgeMiddleText">Minimum</span>
                <span>Order</span>
              </div>
            </div>
          </div>
          <div className="HomeOurProducts-jugAndIceContainer">
            <img 
              src={giantJugBg} 
              alt="Water jug graphic highlight" 
              className="HomeOurProducts-giantJug" 
              onError={(e) => { e.target.style.visibility = 'hidden'; }}
            />
            <img 
              src={iceBgCluster} 
              alt="Ice graphic highlight" 
              className="HomeOurProducts-iceCluster" 
              onError={(e) => { e.target.style.visibility = 'hidden'; }}
            />
          </div>
        </div>

        {/* Layer 1 & 3 Combined: Content Text Descriptions with Backdrop Text */}
        <div className="HomeOurProducts-textContent">
          <h1 className="HomeOurProducts-bgText">100% PURE WATER.NAT</h1>
          <div className="HomeOurProducts-subHeading">Our Products</div>
          <h2 className="HomeOurProducts-mainHeading">Delivered fresh to your door by our team.</h2>
          <svg className="HomeOurProducts-waveSvg" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 4C5 1 5 7 10 4C15 1 15 7 20 4C25 1 25 7 30 4C35 1 35 7 40 4" stroke="#5ac8fa" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* --- RESPONSIVE CARD GRID --- */}
      <div className="HomeOurProducts-grid">
        {products.map((product) => {
          const isHovered = hoveredCard === product.id;
          return (
            <div
              key={product.id}
              className={`HomeOurProducts-card ${isHovered ? 'is-hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Dynamic Card Bookmark Ribbon Activation */}
              {isHovered && (
                <div className="HomeOurProducts-ribbon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  READ MORE
                </div>
              )}

              {/* Product Graphic Render Wrapper */}
              <div className="HomeOurProducts-imageContainer">
                <img
                  src={product.img}
                  alt={product.name}
                  className={`HomeOurProducts-productImg ${product.rotateImg ? 'should-rotate' : ''}`}
                  onError={(e) => {
                    e.target.src = `https://placehold.co/240x240/eef3fc/2b39b3?text=${encodeURIComponent(product.name)}`;
                  }}
                />
              </div>

              {/* Product Meta Info Block */}
              <div className="HomeOurProducts-metaBlock">
                <div className="HomeOurProducts-priceBox">
                  ₹{product.price.toLocaleString('en-IN')}.00
                </div>
                <div className="HomeOurProducts-title">{product.name}</div>
                <div className="HomeOurProducts-deliveryText">{product.delivery}</div>
                <div className="HomeOurProducts-btnWrapper">
                  <button className="HomeOurProducts-btn">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeOurProducts;