import React from "react";
import "./MainServices.css";
import { GiWaterGallon } from "react-icons/gi";
import { BiWater } from "react-icons/bi";
import { MdLocalShipping } from "react-icons/md";

// Images
import bottledWaterImg from "../../assets/wat 2.jpg";
import dispenserImg from "../../assets/wat 3.jpg";
import trailerImg from "../../assets/wat4.jpg";

const MainServices = () => {
  return (
    <section
      className="MainServices-wrapper"
      id="services"
      aria-labelledby="main-services-heading"
    >
      {/* Background Pattern */}
      <div className="MainServices-bg-pattern"></div>

      <div className="MainServices-container">

        {/* Header */}
        <div className="MainServices-header">
          <span className="MainServices-subtitle">
            ALKA DROPS SERVICES
          </span>

          <h2
            className="MainServices-title"
            id="main-services-heading"
          >
            Pure Drinking Water Solutions in Bhubaneswar
          </h2>

          <p className="MainServices-description">
            Alka Drops is a trusted packaged drinking water supplier in
            Bhubaneswar, providing premium bottled water, water dispensers,
            and bulk water delivery for homes, offices, industries, and events
            across Odisha.
          </p>

          {/* Divider */}
          <div className="MainServices-wave-divider">
            <svg
              viewBox="0 0 56 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 9C5 9 7 3 11 3C15 3 17 9 21 9C25 9 27 3 31 3C35 3 37 9 41 9C45 9 47 3 51 3C55 3 57 9 61 9"
                stroke="#0056b3"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M1 5C5 5 7 -1 11 -1C15 -1 17 5 21 5C25 5 27 -1 31 -1C35 -1 37 5 41 5C45 5 47 -1 51 -1C55 -1 57 5 61 5"
                stroke="#a3bffa"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          </div>
        </div>

        {/* Services */}
        <div className="MainServices-grid">

          {/* Bottled Water */}
          <article className="MainServices-card">
            <div className="MainServices-card-banner">
              <div className="MainServices-image-frame">
                <img
                  src={bottledWaterImg}
                  alt="Alka Drops packaged drinking water bottles in Bhubaneswar"
                  loading="lazy"
                />
                <div className="MainServices-icon-badge">
                  <GiWaterGallon className="MainServices-badge-icon" />
                </div>
              </div>
            </div>

            <div className="MainServices-card-content">
              <h3>Packaged Drinking Water</h3>

              <p>
                Fresh, hygienic mineral water jars and bottles delivered across
                Bhubaneswar for homes, offices, and businesses.
              </p>

              <a
                href="/services/bottled-water"
                className="MainServices-link"
                aria-label="Read more about Alka Drops packaged drinking water"
              >
                READ MORE
              </a>
            </div>
          </article>

          {/* Water Dispenser */}
          <article className="MainServices-card">
            <div className="MainServices-card-banner">
              <div className="MainServices-image-frame">
                <img
                  src={dispenserImg}
                  alt="Hot and cold water dispenser by Alka Drops Bhubaneswar"
                  loading="lazy"
                />
                <div className="MainServices-icon-badge">
                  <BiWater className="MainServices-badge-icon" />
                </div>
              </div>
            </div>

            <div className="MainServices-card-content">
              <h3>Water Dispensers</h3>

              <p>
                Premium hot and cold water dispensers for offices, homes,
                schools, and commercial spaces in Bhubaneswar.
              </p>

              <a
                href="/services/water-dispenser"
                className="MainServices-link"
                aria-label="Read more about Alka Drops water dispensers"
              >
                READ MORE
              </a>
            </div>
          </article>

          {/* Bulk Water */}
          <article className="MainServices-card">
            <div className="MainServices-card-banner">
              <div className="MainServices-image-frame">
                <img
                  src={trailerImg}
                  alt="Bulk water tanker and trailer supply by Alka Drops Odisha"
                  loading="lazy"
                />
                <div className="MainServices-icon-badge">
                  <MdLocalShipping className="MainServices-badge-icon" />
                </div>
              </div>
            </div>

            <div className="MainServices-card-content">
              <h3>Bulk Water Supply</h3>

              <p>
                Reliable bulk water delivery for industries, construction sites,
                events, and emergency requirements across Odisha.
              </p>

              <a
                href="/services/water-trailers"
                className="MainServices-link"
                aria-label="Read more about Alka Drops bulk water supply"
              >
                READ MORE
              </a>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
};

export default MainServices;