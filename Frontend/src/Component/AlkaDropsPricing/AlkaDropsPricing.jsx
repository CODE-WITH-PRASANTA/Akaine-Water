import React from 'react';
import { FaWater, FaTruck, FaRecycle, FaAward, FaCalendarAlt } from 'react-icons/fa';
import './AlkaDropsPricing.css';

// Importing your background image
import bgBanner from "../../assets/pe1.png"; 

const AlkaDropsPricing = () => {
  const pricingPlans = [
    {
      title: "Basic Plan",
      subText: "*RATES ARE SUBJECT TO CHANGE",
      price: "49",
      period: "MO",
      features: [
        { text: "Free Delivery across Bhubaneswar", icon: <FaTruck /> },
        { text: "Max 10 Bottles / Month", icon: <FaWater /> },
        { text: "Empty Bottle Pickup", icon: <FaRecycle /> },
        { text: "Max 120 Bottles / Year", icon: <FaCalendarAlt /> },
        { text: "Pure Wellness Mineral Water", icon: <FaAward /> }
      ],
    },
    {
      title: "Premium Plan",
      subText: "*RATES ARE SUBJECT TO CHANGE",
      price: "99",
      period: "YR",
      features: [
        { text: "Free Delivery across Bhubaneswar", icon: <FaTruck /> },
        { text: "Max 10 Bottles / Month", icon: <FaWater /> },
        { text: "Empty Bottle Pickup", icon: <FaRecycle /> },
        { text: "Max 120 Bottles / Year", icon: <FaCalendarAlt /> },
        { text: "Pure Wellness Mineral Water", icon: <FaAward /> }
      ],
    },
    {
      title: "Advanced Plan",
      subText: "*RATES ARE SUBJECT TO CHANGE",
      price: "79",
      period: "MO",
      features: [
        { text: "Free Delivery across Bhubaneswar", icon: <FaTruck /> },
        { text: "Max 10 Bottles / Month", icon: <FaWater /> },
        { text: "Empty Bottle Pickup", icon: <FaRecycle /> },
        { text: "Max 120 Bottles / Year", icon: <FaCalendarAlt /> },
        { text: "Pure Wellness Mineral Water", icon: <FaAward /> }
      ],
    }
  ];

  return (
    <section className="AlkaDropsPricing">
      {/* Background banner wrapper */}
      <div 
        className="AlkaDropsPricing__banner-bg" 
        style={{ backgroundImage: `linear-gradient(rgba(0, 90, 180, 0.85), rgba(0, 90, 180, 0.95)), url(${bgBanner})` }}
      />

      <div className="AlkaDropsPricing__content">
        <div className="AlkaDropsPricing__header">
          <span className="AlkaDropsPricing__subtitle">CHOOSE YOUR HYDRATION PLAN</span>
          <h2 className="AlkaDropsPricing__title">Affordable for everyone</h2>
          <div className="AlkaDropsPricing__wave">
            <span></span>
            <span></span>
            <span></span>
          </div>
          {/* The paragraph element has been removed from here */}
        </div>

        <div className="AlkaDropsPricing__container">
          {pricingPlans.map((plan, index) => (
            <div className="AlkaDropsPricing__card" key={index}>
              <div className="AlkaDropsPricing__card-top">
                <h3 className="AlkaDropsPricing__plan-name">{plan.title}</h3>
                <span className="AlkaDropsPricing__plan-sub">{plan.subText}</span>
              </div>

              <div className="AlkaDropsPricing__price-circle-wrapper">
                <div className="AlkaDropsPricing__price-circle">
                  <span className="AlkaDropsPricing__currency">₹</span>
                  <span className="AlkaDropsPricing__amount">{plan.price}</span>
                  <div className="AlkaDropsPricing__period-badge">
                    {plan.period}
                  </div>
                </div>
              </div>

              <ul className="AlkaDropsPricing__features-list">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="AlkaDropsPricing__feature-item">
                    <span className="AlkaDropsPricing__feature-icon">{feature.icon}</span>
                    <span className="AlkaDropsPricing__feature-text">{feature.text}</span>
                  </li>
                ))}
              </ul>

              <div className="AlkaDropsPricing__action">
                <button className="AlkaDropsPricing__button" aria-label={`Order the ${plan.title} from Alka Drops`}>
                  ORDER NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Hidden SEO Footer Content */}
      <div className="AlkaDropsPricing__seo-footer" style={{ display: 'none' }}>
        <h1>best water supplier in odisha - Alka Drops</h1>
        <h2>Best Bhubaneswar water supplier and premium wellness water delivery</h2>
        <p>Looking for a reliable premium water delivery subscription in Odisha? Alka Drops provides healthy mineral and alkaline wellness water solutions for residential communities, corporate offices, and events across Bhubaneswar.</p>
      </div>
    </section>
  );
};

export default AlkaDropsPricing;