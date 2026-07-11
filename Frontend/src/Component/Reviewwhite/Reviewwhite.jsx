import React from "react";
import "./Reviewwhite.css";

const reviewDataList = [
  {
    id: 1,
    stars: 4,
    headline: "I've had the Best Experience",
    reviewText: "We are extremely happy with Aguapure's service. They are very prompt. Billing always correct. And they give plenty of notice of the next delivery it is very easy.",
    authorName: "RODHA THELMA",
    location: "California",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    stars: 3,
    headline: "Great Tasting Water & Awesome",
    reviewText: "Have used their service for five years & can say the service has always been amazing. The delivery driver is friendly. The water tastes really good & we ...",
    authorName: "LILLIAN GRACE",
    location: "California",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    stars: 5,
    headline: "Team was Very Professional",
    reviewText: "I went to the Aguapure water office to speak with someone in person about Aguapure services. The team was very professional and answered all my questions.",
    authorName: "LUKE NOBERT",
    location: "Los Angeles",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: 4,
    stars: 5,
    headline: "Excellent and Timely Deliveries",
    reviewText: "The setup was quick, and the system works flawlessly. Their team responds instantly to updates, making management tasks simple and efficient.",
    authorName: "MARK STEVENS",
    location: "New York",
    avatarUrl: "https://randomuser.me/api/portraits/men/46.jpg"
  }
];

const Reviewwhite = () => {
  // Utility rating star glyph builder
  const buildStarsRow = (filledCount) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < filledCount ? "rw-star-blue" : "rw-star-dim"}>
        ★
      </span>
    ));
  };

  return (
    <div className="rw-testimonial-section">
      <div className="rw-viewport-slider-container">
        
        {/* Track deck elements cloned twice to achieve seamless non-breaking continuous auto infinite translation */}
        <div className="rw-track-animate-slider">
          {[...reviewDataList, ...reviewDataList].map((review, index) => (
            <div className="rw-review-card" key={`${review.id}-${index}`}>
              
              {/* Floating avatar circle header with pointing dialogue speech indicator tail */}
              <div className="rw-avatar-header-holder">
                <img src={review.avatarUrl} alt={review.authorName} />
                <div className="rw-speech-pointer-tail"></div>
              </div>

              {/* Content body rows */}
              <div className="rw-stars-row-layout">
                {buildStarsRow(review.stars)}
              </div>

              <h3 className="rw-card-title-headline">{review.headline}</h3>
              
              <p className="rw-card-body-paragraph">
                {review.reviewText}
              </p>

              <div className="rw-card-footer-author-meta">
                <span className="rw-author-name-txt">{review.authorName}, </span>
                <span className="rw-location-link-txt">{review.location}</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Reviewwhite;