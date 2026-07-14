import React, { useEffect, useState } from "react";
import "./AkaineGalary.css";
import API, { IMG_URL } from "../../api/axios";

const AkaineGalary = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  // Track images that fail to load in order to swap to alternate URL schemes dynamically
  const [failedImages, setFailedImages] = useState({});

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await API.get("/gallery");

      if (res.data.success) {
        setGalleryItems(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Helper utility updated with fallback management tracking
  const getImage = (image, itemId) => {
    if (failedImages[itemId]) {
      return `${IMG_URL}/uploads/${image}`;
    }
    return `${IMG_URL}/uploads/gallery/${image}`;
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();

    setLightboxIndex(
      (prev) => (prev + 1) % galleryItems.length
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();

    setLightboxIndex(
      (prev) =>
        (prev - 1 + galleryItems.length) %
        galleryItems.length
    );
  };

  return (
    <div className="gallery-section-wrapper">
      <div className="akaine-gallery-grid">
        {galleryItems.map((item, index) => (
          <div
            key={item._id}
            className="gallery-card-container"
          >
            <div
              className="gallery-item-card"
              onClick={() => openLightbox(index)}
            >
              <div className="card-frame-locked">
                <img
                  src={getImage(item.image, item._id)}
                  alt={item.imageName}
                  className="flower-zoom-image"
                  onError={() => {
                    // Try the fallback absolute directory structure if primary path breaks
                    if (!failedImages[item._id]) {
                      setFailedImages((prev) => ({ ...prev, [item._id]: true }));
                    } else {
                      console.log("Failed Image URL completely:", `${IMG_URL}/uploads/${item.image}`);
                    }
                  }}
                />

                <div className="search-icon-overlay">
                  <div className="search-logo-circle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.603 10.601z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="gallery-item-title">
              {item.imageName}
            </h3>
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="lightbox-backdrop"
          onClick={closeLightbox}
        >
          <button
            className="lightbox-close-btn"
            onClick={closeLightbox}
          >
            &times;
          </button>

          <button
            className="lightbox-arrow-btn left-arrow"
            onClick={prevImage}
          >
            &#10094;
          </button>

          <div
            className="lightbox-content-box"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getImage(
                galleryItems[lightboxIndex].image,
                galleryItems[lightboxIndex]._id
              )}
              alt={
                galleryItems[lightboxIndex].imageName
              }
              className="lightbox-main-img"
              onError={() => {
                const activeId = galleryItems[lightboxIndex]._id;
                if (!failedImages[activeId]) {
                  setFailedImages((prev) => ({ ...prev, [activeId]: true }));
                }
              }}
            />

            <div className="lightbox-counter">
              {lightboxIndex + 1} of{" "}
              {galleryItems.length}
            </div>
          </div>

          <button
            className="lightbox-arrow-btn right-arrow"
            onClick={nextImage}
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
};

export default AkaineGalary;