import React from 'react';
import './MultipleStages.css';
import mountainImage from '../../assets/m1.jpg'; // Ensure you have your image here

const stats = [
  { value: "167m", title: "Water Source Depth", desc: "Natural water with no additives or processing, created by nature for your body" },
  { value: "12.5k", title: "Bottles per Month", desc: "Natural water with no additives or processing, created by nature for your body" },
  { value: "46", title: "Nominations Won", desc: "Natural water with no additives or processing, created by nature for your body" },
  { value: "180+", title: "Countries Drink", desc: "Natural water with no additives or processing, created by nature for your body" }
];

const MultipleStages = () => {
  return (
    <section className="ms-container">
      <div className="ms-header">
        <h2 className="ms-title">
          Our water undergoes <span className="ms-highlight">multiple stages</span> of purification and<br /> 
          contains no artificial additives. We work to make it possible.
        </h2>
      </div>

      <div className="ms-image-wrapper">
        <img src={mountainImage} alt="Mountain landscape" className="ms-mountain-img" />
      </div>

      <div className="ms-stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="ms-stat-card">
            <h3 className="ms-stat-value">{stat.value}</h3>
            <p className="ms-stat-title">{stat.title}</p>
            <div className="ms-divider"></div>
            <p className="ms-stat-desc">{stat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MultipleStages;