import React from "react";
import "./Reviewblue.css";

const testimonialData = [
  {
    id: 1,
    stars: 4,
    reviewText: "We are extremely happy with Aguapure's service. They are very prompt. Billing always correct. And they give plenty of notice of the next delivery it is very easy.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    headline: "I'VE HAD THE BEST EXPERIENCE",
    location: "California"
  },
  {
    id: 2,
    stars: 3,
    reviewText: "Have used their service for five years & can say the service has always been amazing. The delivery driver is friendly. The water tastes really good & we recommend.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    headline: "GREAT TASTING WATER & AWESOME",
    location: "California"
  },
  {
    id: 3,
    stars: 5,
    reviewText: "I went to the Aguapure water office to speak with someone in person about Aguapure services. The team was very professional and answered all my questions.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    headline: "TEAM WAS VERY PROFESSIONAL",
    location: "Los Angeles"
  },
  {
    id: 4,
    stars: 5,
    reviewText: "Fantastic water quality and stellar customer support every single time. They never miss a delivery date and the digital setup makes tracking seamless.",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    headline: "ABSOLUTELY LOVING THE SERVICE",
    location: "New York"
  }
];

const Reviewblue = () => {
  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < count ? "rb-star-filled" : "rb-star-empty"}>
        ★
      </span>
    ));
  };

  return (
    <div className="rb-testimonial-section">
      <div className="rb-carousel-container">
        <div className="rb-track-slider">
          {[...testimonialData, ...testimonialData].map((item, idx) => (
            <div className="rb-card-node" key={`${item.id}-${idx}`}>
              
              <div className="rb-quote-bubble">
                <span>“</span>
              </div>

              <div className="rb-stars-row">
                {renderStars(item.stars)}
              </div>

              <p className="rb-review-paragraph">
                {item.reviewText}
              </p>

              <div className="rb-avatar-frame">
                <img src={item.avatar} alt="User Avatar" />
              </div>

              <h4 className="rb-card-headline">{item.headline}</h4>
              <span className="rb-card-location">{item.location}</span>

            </div>
          ))}
        </div>
      </div>
      
      <div className="rb-scroll-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span>↑</span>
      </div>
    </div>
  );
};

export default Reviewblue;