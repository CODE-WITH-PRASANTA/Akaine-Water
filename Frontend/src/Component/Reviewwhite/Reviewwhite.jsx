import React, { useEffect, useState } from "react";
import "./Reviewwhite.css";
import API, { IMG_URL } from "../../api/axios";

const Reviewwhite = () => {
  const [reviewDataList, setReviewDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  // Track failed images to switch path rules seamlessly on fallback triggers
  const [imageFallbacks, setImageFallbacks] = useState({});

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await API.get("/testimonial");

      if (response.data.success) {
        // Fetch latest 10 testimonials
        const latestTestimonials = response.data.data.slice(0, 10);
        setReviewDataList(latestTestimonials);
      }
    } catch (error) {
      console.error("Testimonial Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Rating Stars Builder
  const buildStarsRow = (filledCount) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={
          i < filledCount
            ? "rw-star-blue"
            : "rw-star-dim"
        }
      >
        ★
      </span>
    ));
  };

  // Image URL Generator
  const getImageUrl = (image, id) => {
    if (!image) {
      return "https://placehold.co/120x120?text=User";
    }

    // Already full URL
    if (image.startsWith("http")) {
      return image;
    }

    // Dynamic alternate routing block triggered during operational fallback cycles
    if (imageFallbacks[id]) {
      return `${IMG_URL}/uploads/${image}`;
    }

    // filename.webp
    return `${IMG_URL}/testimonial/${image}`;
  };

  if (loading) {
    return (
      <div className="rw-testimonial-section">
        <div
          style={{
            textAlign: "center",
            padding: "60px 0",
            fontSize: "18px",
          }}
        >
          Loading testimonials...
        </div>
      </div>
    );
  }

  return (
    <div className="rw-testimonial-section">
      <div className="rw-viewport-slider-container">

        <div className="rw-track-animate-slider">
          {reviewDataList.length > 0 ? (
            // Changed from duplicated array syntax to mapping directly over data array
            reviewDataList.map((review, index) => (
              <div
                className="rw-review-card"
                key={`${review._id}-${index}`}
              >
                {/* Avatar */}
                <div className="rw-avatar-header-holder">
                  <img
                    src={getImageUrl(review.image, review._id)}
                    alt={review.name}
                    onError={(e) => {
                      if (!imageFallbacks[review._id]) {
                        setImageFallbacks((prev) => ({ ...prev, [review._id]: true }));
                      } else {
                        e.target.src = "https://placehold.co/120x120?text=User";
                      }
                    }}
                  />

                  <div className="rw-speech-pointer-tail"></div>
                </div>

                {/* Stars */}
                <div className="rw-stars-row-layout">
                  {buildStarsRow(review.rating)}
                </div>

                {/* Headline */}
                <h3 className="rw-card-title-headline">
                  {review.name}
                </h3>

                {/* Description */}
                <p className="rw-card-body-paragraph">
                  {review.description}
                </p>

                {/* Footer */}
                <div className="rw-card-footer-author-meta">
                  <span className="rw-author-name-txt">
                    {review.name},
                  </span>

                  <span className="rw-location-link-txt">
                    {" "}
                    {review.address}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                width: "100%",
                textAlign: "center",
                padding: "40px 0",
                fontSize: "16px",
              }}
            >
              No testimonials available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviewwhite;