import React, { useState, useEffect } from "react";
import "./HeroSection.css";

// Assets (बैकग्राउंड और स्प्लैश)
import bgImg from "../../assets/bg-img.jpg";
import waterSplash from "../../assets/main-1.jpg";

// 3 अलग-अलग बोतल इमेजेस इम्पोर्ट करें
import waterBottles1 from "../../assets/water-1.png"; 
import waterBottles2 from "../../assets/shop-20.png"; 
import waterBottles3 from "../../assets/shop-21.png"; 

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // SEO Friendly Hero Content (इमेज प्रॉपर्टी के साथ)
  const slidesData = [
    {
      id: 1,
      heading: "Pure Alkaline\nDrinking Water\nfor Every Family",
      subheading:
        "Alka Drops is a trusted alkaline drinking water brand in Bhubaneswar, delivering clean, mineral-rich, and hygienically packaged water for homes, offices, schools, and businesses.",
      price: "₹25",
      image: waterBottles1, // पहली इमेज यहाँ असाइन की गई
    },
    {
      id: 2,
      heading: "Healthy Hydration\nEvery Single\nDay",
      subheading:
        "Enjoy fresh alkaline mineral water with advanced purification technology and doorstep delivery across Bhubaneswar. Pure taste, balanced minerals, and uncompromised quality.",
      price: "₹20",
      image: waterBottles2, // दूसरी इमेज यहाँ असाइन की गई
    },
    {
      id: 3,
      heading: "Fresh Mineral\nWater Delivered\nto Your Doorstep",
      subheading:
        "Choose Alka Drops for safe, refreshing, and premium bottled water. We proudly serve families, corporate offices, hotels, restaurants, events, and institutions in Bhubaneswar.",
      price: "₹30",
      image: waterBottles3, // तीसरी इमेज यहाँ असाइन की गई
    },
  ];

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 9000);

    return () => clearInterval(timer);
  }, [slidesData.length]);

  return (
    <section
      className="HeroSection"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Left Side Pagination */}
      <div className="HeroSection-sidebar">
        {slidesData.map((_, index) => (
          <span
            key={index}
            className={`HeroSection-indicator ${
              currentSlide === index ? "is-active" : ""
            }`}
            onClick={() => setCurrentSlide(index)}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        ))}
      </div>

      {/* Slider */}
      <div className="HeroSection-carousel">
        {slidesData.map((slide, index) => {
          if (index !== currentSlide) return null;

          return (
            <div className="HeroSection-slide" key={slide.id}>
              {/* Left Content */}
              <div className="HeroSection-contentColumn">
                <h1 className="HeroSection-heading">
                  {slide.heading.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h1>

                <p className="HeroSection-subheading">
                  {slide.subheading}
                </p>

                <div className="HeroSection-actionsRow">
                  <button className="HeroSection-btnReadMore">
                    Explore More
                    <span className="HeroSection-leafIcon">💧</span>
                  </button>

                  <div className="HeroSection-videoWrapper">
                    <button
                      className="HeroSection-btnPlay"
                      aria-label="Watch Video"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="24"
                        height="24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>

                    <div className="HeroSection-videoMeta">
                      <span className="HeroSection-videoTitle">
                        WATCH VIDEO
                      </span>
                      <span className="HeroSection-videoSubtitle">
                        See How Alka Drops Delivers Pure Water
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side Images */}
              <div className="HeroSection-visualColumn">
                {/* Splash */}
                <div
                  className="HeroSection-splashLayer"
                  style={{
                    backgroundImage: `url(${waterSplash})`,
                  }}
                ></div>

                {/* Dynamic Bottles */}
                <div className="HeroSection-bottleWrapper">
                  <img
                    src={slide.image} /* यहाँ अब डायनामिक इमेज लोड होगी */
                    alt="Alka Drops Premium Alkaline Drinking Water Bottles"
                    className="HeroSection-bottlesImage"
                  />

                  {/* Offer Badge */}
                  <div className="HeroSection-offerBadge">
                    <span className="HeroSection-badgeLabel">
                      Fresh Alkaline Water
                    </span>

                    <span className="HeroSection-badgePrice">
                      {slide.price}
                    </span>

                    <span className="HeroSection-badgeUnit">
                      Starting Price
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HeroSection;