import React, { useState } from 'react';
import './Nature.css';

const features = [
  { icon: "⚛️", title: "Health Composition" },
  { icon: "🔬", title: "Chemical Control" },
  { icon: "⛰️", title: "Ecological Sources" },
  { icon: "💧", title: "Good for Every Day" },
  { icon: "🚰", title: "6 Filtration Stages" },
  { icon: "📜", title: "Quality Certificates" }
];

const Nature = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="nature-component">
      {/* Video Hero Section */}
      <div className="nature-hero">
        <h1 className="nature-hero-title">Nature inside </h1>
        <h1 className="nature-hero-title">every bottle of water </h1>

        <div className="nature-play-wrapper" onClick={() => setIsVideoOpen(true)}>
          <div className="nature-play-btn">▶</div>
          <p className="nature-watch-label">watch our video</p>
        </div>
      </div>

      {/* Features Grid Section */}
      <div className="nature-features-grid">
        {features.map((item, index) => (
          <div key={index} className="nature-feature-card">
            <span className="nature-feature-icon">{item.icon}</span>
            <h3 className="nature-feature-title">{item.title}</h3>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="nature-modal-overlay" onClick={() => setIsVideoOpen(false)}>
          <div className="nature-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="nature-close-btn" onClick={() => setIsVideoOpen(false)}>✕</button>
            <iframe 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="Video" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default Nature;