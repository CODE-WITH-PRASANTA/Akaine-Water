import React from 'react';
import './OtherServices.css';
import { GiWaterGallon } from 'react-icons/gi';
import { BiWater } from 'react-icons/bi';
import { MdLocalShipping } from 'react-icons/md';

import bottledWaterImg from '../../assets/wat 2.jpg';
import dispenserImg from '../../assets/wat 3.jpg';
import trailerImg from '../../assets/wat4.jpg';

const OtherServices = () => {
  return (
    <section className="OtherServices-wrapper">
      <div className="OtherServices-bg-pattern"></div>

      <div className="OtherServices-container">
        <div className="OtherServices-header">
          <span className="OtherServices-subtitle">OTHER SERVICES</span>
          <h2 className="OtherServices-title">Large range customer services.</h2>
          
          <div className="OtherServices-wave-divider">
            <svg viewBox="0 0 56 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 9C5 9 7 3 11 3C15 3 17 9 21 9C25 9 27 3 31 3C35 3 37 9 41 9C45 9 47 3 51 3C55 3 57 9 61 9" stroke="#0056b3" strokeWidth="2" strokeLinecap="round"/>
              <path d="M1 5C5 5 7 -1 11 -1C15 -1 17 5 21 5C25 5 27 -1 31 -1C35 -1 37 5 41 5C45 5 47 -1 51 -1C55 -1 57 5 61 5" stroke="#a3bffa" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
            </svg>
          </div>
        </div>

        <div className="OtherServices-grid">
          {/* Card 1: Water Trailers (Moved from 3rd to 1st) */}
          <div className="OtherServices-card">
            <div className="OtherServices-card-banner">
              <div className="OtherServices-image-frame">
                <img src={trailerImg} alt="Commercial high volume wellness water trailer tankers in Odisha" />
                <div className="OtherServices-icon-badge">
                  <MdLocalShipping className="OtherServices-badge-icon" />
                </div>
              </div>
            </div>
            <div className="OtherServices-card-content">
              <h3>Water Trailers</h3>
              <p>Reliable bulk logistical solutions for large gatherings, industrial sites, and events. Depend on the best water supplier in Odisha for large-scale pure hydration.</p>
              <a href="/services/water-trailers" className="OtherServices-link">READ MORE</a>
            </div>
          </div>

          {/* Card 2: Water Dispenser (Remains in middle) */}
          <div className="OtherServices-card">
            <div className="OtherServices-card-banner">
              <div className="OtherServices-image-frame">
                <img src={dispenserImg} alt="Alka Drops premium hot and cold wellness water dispenser systems" />
                <div className="OtherServices-icon-badge">
                  <BiWater className="OtherServices-badge-icon" />
                </div>
              </div>
            </div>
            <div className="OtherServices-card-content">
              <h3>Water Dispenser</h3>
              <p>Sleek, high-performance cooling and heating dispensers designed for office spaces and modern homes. Experience premium health hydration flowing instantly.</p>
              <a href="/services/water-dispenser" className="OtherServices-link">READ MORE</a>
            </div>
          </div>

          {/* Card 3: Bottled Water (Moved from 1st to 3rd) */}
          <div className="OtherServices-card">
            <div className="OtherServices-card-banner">
              <div className="OtherServices-image-frame">
                <img src={bottledWaterImg} alt="Alka Drops pristine wellness bottled water delivery jars" />
                <div className="OtherServices-icon-badge">
                  <GiWaterGallon className="OtherServices-badge-icon" />
                </div>
              </div>
            </div>
            <div className="OtherServices-card-content">
              <h3>Bottled Water</h3>
              <p>Get pristine, mineral-rich wellness water delivered right to your doorstep. As the best Bhubaneswar water supplier, we ensure every jar supports your daily vitality.</p>
              <a href="/services/bottled-water" className="OtherServices-link">READ MORE</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtherServices;