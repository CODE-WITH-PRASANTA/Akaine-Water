import React, { useEffect, useState } from "react";
import "./Reviewblue.css";
import API, { IMG_URL } from "../../api/axios";

const Reviewblue = () => {
  const [testimonialData, setTestimonialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageFallbacks, setImageFallbacks] = useState({});

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await API.get("/testimonial");

      if (response.data.success) {
        // Latest 10 testimonials only
        const latestTestimonials = response.data.data.slice(0, 10);
        setTestimonialData(latestTestimonials);
      }
    } catch (error) {
      console.error("Testimonial Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < count ? "rb-star-filled" : "rb-star-empty"}
      >
        ★
      </span>
    ));
  };

  const getImageUrl = (image, id) => {
    if (!image) {
      return "https://placehold.co/100x100";
    }

    if (image.startsWith("http")) {
      return image;
    }

    if (imageFallbacks[id]) {
      return `${IMG_URL}/uploads/${image}`;
    }

    return `${IMG_URL}/testimonial/${image}`;
  };

  if (loading) {
    return (
      <div className="rb-testimonial-section">
        <div
          style={{
            textAlign: "center",
            padding: "80px 0",
            color: "#fff",
            fontSize: "18px",
          }}
        >
          Loading Testimonials...
        </div>
      </div>
    );
  }

  return (
    <div className="rb-testimonial-section">
      <div className="rb-carousel-container">
        <div className="rb-track-slider">
          {testimonialData.length > 0 ? (
            // Changed from duplicated array syntax to mapping directly over your data array
            testimonialData.map((item, idx) => (
              <div
                className="rb-card-node"
                key={`${item._id}-${idx}`}
              >
                <div className="rb-quote-bubble">
                  <span>“</span>
                </div>

                <div className="rb-stars-row">
                  {renderStars(item.rating)}
                </div>

                <p className="rb-review-paragraph">
                  {item.description}
                </p>

                <div className="rb-avatar-frame">
                  <img
                    src={getImageUrl(item.image, item._id)}
                    alt={item.name}
                    onError={(e) => {
                      if (!imageFallbacks[item._id]) {
                        setImageFallbacks((prev) => ({ ...prev, [item._id]: true }));
                      } else {
                        e.target.src = "https://placehold.co/100x100";
                      }
                    }}
                  />
                </div>

                <h4 className="rb-card-headline">
                  {item.name}
                </h4>

                <span className="rb-card-location">
                  {item.address}
                </span>
              </div>
            ))
          ) : (
            <div
              style={{
                color: "#fff",
                width: "100%",
                textAlign: "center",
                padding: "50px",
              }}
            >
              No testimonials available.
            </div>
          )}
        </div>
      </div>

      <div
        className="rb-scroll-top-btn"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      >
        <span>↑</span>
      </div>
    </div>
  );
};

export default Reviewblue;