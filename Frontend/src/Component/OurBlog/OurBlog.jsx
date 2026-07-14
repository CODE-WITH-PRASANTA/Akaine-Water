import React from 'react';
import './OurBlog.css';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaRegComment, 
  FaFolderOpen, 
  FaPlay 
} from 'react-icons/fa';

// Assuming your images are saved in src/assets
import deliveryImg from '../../assets/blog-v3-4.jpg'; // For the delivery/person image (Card 1)
import bottlesImg from '../../assets/blog-v3-5.jpg';  // For the blue water bottles image (Card 2)

const OurBlog = () => {
  return (
    <div className="OurBlog-container">
      <div className="OurBlog-wrapper">
        
        {/* Card 1: Aguapure Water */}
        <article className="OurBlog-card">
          <div className="OurBlog-image-wrapper">
            <img src={deliveryImg} alt="Water delivery service" className="OurBlog-card-img" />
            <div className="OurBlog-badge">
              <FaFolderOpen className="OurBlog-badge-icon" /> WATER COOLERS
            </div>
          </div>
          <div className="OurBlog-card-body">
            <h2 className="OurBlog-card-title">Aguapure Water: Never Wait for Rain Again</h2>
            
            <div className="OurBlog-card-meta">
              <span className="OurBlog-meta-item">
                <FaCalendarAlt className="OurBlog-meta-icon" /> August 21, 2021
              </span>
              <span className="OurBlog-meta-separator">|</span>
              <span className="OurBlog-meta-item">
                <FaUser className="OurBlog-meta-icon" /> By admin
              </span>
              <span className="OurBlog-meta-separator">|</span>
              <span className="OurBlog-meta-item">
                <FaRegComment className="OurBlog-meta-icon" /> 0 Comments
              </span>
            </div>

            <p className="OurBlog-card-excerpt">
              That they cannot forest the pain trouble that are bound to ensue equal demoralized by the
              charms of pleasure of the moment so blinded by desire. To take a trivial example which of
              ever undertakes laborious cases are perfectly simple and easy to distinguish. In a free hour,
              when our power. Foresee the pain and trouble that are bound ensue and equal blame belongs 
              our power of choice untrammelled and when nothing prevents what like best we denounces 
              righteous indignation [...]
            </p>

            <a href="#read" className="OurBlog-readmore-btn">
              <FaPlay className="OurBlog-readmore-arrow" /> READ MORE
            </a>
          </div>
        </article>

        {/* Card 2: Discover The Beauties of Bulk Bottled Water */}
        <article className="OurBlog-card">
          <div className="OurBlog-image-wrapper">
            <img src={bottlesImg} alt="Bulk water bottles production" className="OurBlog-card-img" />
            <div className="OurBlog-badge">
              <FaFolderOpen className="OurBlog-badge-icon" /> OUR BLOG
            </div>
          </div>
          <div className="OurBlog-card-body">
            <h2 className="OurBlog-card-title">Discover The Beauties of Bulk Bottled Water</h2>
            
            <div className="OurBlog-card-meta">
              <span className="OurBlog-meta-item">
                <FaCalendarAlt className="OurBlog-meta-icon" /> August 21, 2021
              </span>
              <span className="OurBlog-meta-separator">|</span>
              <span className="OurBlog-meta-item">
                <FaUser className="OurBlog-meta-icon" /> By admin
              </span>
              <span className="OurBlog-meta-separator">|</span>
              <span className="OurBlog-meta-item">
                <FaRegComment className="OurBlog-meta-icon" /> 0 Comments
              </span>
            </div>

            <p className="OurBlog-card-excerpt">
              To take a trivial example which of ever undertakes laborious cases are perfectly simple and
              easy to distinguish. In a free hour, when our power. Foresee the pain and trouble that are
              bound ensue and equal blame belongs our power of choice untrammelled and when nothing
              prevents what like best we denounces righteous indignation and [...]
            </p>

            <a href="#read" className="OurBlog-readmore-btn">
              <FaPlay className="OurBlog-readmore-arrow" /> READ MORE
            </a>
          </div>
        </article>

      </div>
    </div>
  );
};

export default OurBlog;