import React, { useState } from 'react';
import { FaPlay, FaTint } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import './EssentialHealth.css';

import bgWaterGlass from "../../assets/wat9.jpg"; 
import videoThumbnail from "../../assets/wat7.jpg"; 

const EssentialHealth = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="EssentialHealth">
      <div 
        className="EssentialHealth-water-glass" 
        style={{ backgroundImage: `url(${bgWaterGlass})` }}
      ></div>

      <div className="EssentialHealth-container">
        <div className="EssentialHealth-content">
          <h2 className="EssentialHealth-title">
            Essential <br />
            for good health
          </h2>

          <p className="EssentialHealth-description">
            Righteous indignation & dislike men who are beguiled the charms.
          </p>

          <ul className="EssentialHealth-list">
            <li><FaTint className="EssentialHealth-list-icon" /> <span>Carrying nutrients & oxygen</span></li>
            <li><FaTint className="EssentialHealth-list-icon" /> <span>Aiding digestion</span></li>
            <li><FaTint className="EssentialHealth-list-icon" /> <span>Normalizing blood pressure</span></li>
            <li><FaTint className="EssentialHealth-list-icon" /> <span>Stabilizing the heartbeat</span></li>
          </ul>

          <div className="EssentialHealth-btn-wrapper">
            <button className="EssentialHealth-btn">
              READ MORE
              <span className="EssentialHealth-btn-droplet"></span>
            </button>
          </div>
        </div>

        <div className="EssentialHealth-video-wrapper">
          <div className="EssentialHealth-thumbnail-card">
            <img src={videoThumbnail} alt="Water delivery illustration" className="EssentialHealth-thumbnail" />
            <button className="EssentialHealth-play-btn" onClick={() => setIsVideoOpen(true)} aria-label="Play Video">
              <div className="EssentialHealth-play-outer"><FaPlay className="EssentialHealth-play-icon" /></div>
            </button>
          </div>
        </div>
      </div>

      {isVideoOpen && (
        <div className="EssentialHealth-modal" onClick={() => setIsVideoOpen(false)}>
          <div className="EssentialHealth-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="EssentialHealth-modal-close" onClick={() => setIsVideoOpen(false)}><IoClose /></button>
            <div className="EssentialHealth-iframe-container">
              <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="Product Video" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EssentialHealth;