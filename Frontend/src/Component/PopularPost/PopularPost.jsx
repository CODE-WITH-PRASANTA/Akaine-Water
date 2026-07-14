import React from 'react';
import './PopularPost.css';
import { 
  FaSearch, 
  FaCalendarAlt, 
  FaUser, 
  FaRegComment, 
  FaArrowRight, 
  FaFolderOpen, 
  FaRegEnvelopeOpen 
} from 'react-icons/fa';

// Import images from your src/assets folder
import bannerImg from '../../assets/popular1.jpg';       // Main Top Banner background
import post1Img from '../../assets/popular1.jpg';       // Image for 1st Blog Post
import post2Img from '../../assets/popular1.jpg';    // Image for 2nd Blog Post (laptop/pitcher)
import post3Img from '../../assets/popular2.jpg'; // Image for 3rd Blog Post (blue water bottles)

// Sidebar small thumbnails
import thumb1 from '../../assets/popular2.jpg';
import thumb2 from '../../assets/blog-v3-1.jpg';
import thumb3 from '../../assets/blog-v3-4.jpg';

const PopularPost = () => {
  return (
    <div className="PopularPost-container">
      {/* 1. Header Banner */}
      <div 
        className="PopularPost-banner" 
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
       
      </div>

      {/* 2. Page Layout wrapper */}
      <div className="PopularPost-layout-wrapper">
        <div className="PopularPost-grid">
          
          {/* LEFT SIDEBAR (Sticky) */}
          <aside className="PopularPost-sidebar">
            <div className="PopularPost-sidebar-inner">
              
              {/* Widget: Search */}
              

              {/* Widget: Category */}
             

              {/* Widget: Popular Post list */}
              <div className="PopularPost-widget">
                <h3 className="PopularPost-widget-title">Popular Post</h3>
                <div className="PopularPost-wave-divider"></div>
                <div className="PopularPost-list">
                  
                  <div className="PopularPost-item">
                    <img src={thumb3} alt="Thumb 1" className="PopularPost-item-img" />
                    <div className="PopularPost-item-info">
                      <span className="PopularPost-item-date"><FaCalendarAlt /> August 17, 2021</span>
                      <h4 className="PopularPost-item-title">PACKAGED WATER: WHAT THINGS TO CONSIDER?</h4>
                    </div>
                  </div>

                  <div className="PopularPost-item">
                    <img src={thumb1} alt="Thumb 2" className="PopularPost-item-img" />
                    <div className="PopularPost-item-info">
                      <span className="PopularPost-item-date"><FaCalendarAlt /> August 17, 2021</span>
                      <h4 className="PopularPost-item-title">DISCOVER THE BEAUTIES OF BULK BOTTLED WATER</h4>
                    </div>
                  </div>

                  <div className="PopularPost-item">
                    <img src={thumb2} alt="Thumb 3" className="PopularPost-item-img" />
                    <div className="PopularPost-item-info">
                      <span className="PopularPost-item-date"><FaCalendarAlt /> August 17, 2021</span>
                      <h4 className="PopularPost-item-title">AGUAPURE WATER: NEVER WAIT FOR RAIN AGAIN</h4>
                    </div>
                  </div>

                </div>
              </div>

              {/* Widget: Tag Cloud */}
              <div className="PopularPost-widget">
                <h3 className="PopularPost-widget-title">Tag Cloud</h3>
                <div className="PopularPost-wave-divider"></div>
                <div className="PopularPost-tag-cloud">
                  <span>Bottle</span>
                  <span>Coolers</span>
                  <span>Delivery</span>
                  <span>Home</span>
                  <span>Mineral</span>
                  <span>Office</span>
                  <span>Safety</span>
                  <span>Sports</span>
                  <span>Water Quality</span>
                </div>
              </div>

              {/* Widget: Subscribe Us Box */}
              <div className="PopularPost-widget">
                <h3 className="PopularPost-widget-title">Subscribe Us</h3>
                <div className="PopularPost-wave-divider"></div>
                <div className="PopularPost-subscribe-card">
                  <div className="PopularPost-subscribe-icon-wrap">
                    <FaRegEnvelopeOpen className="PopularPost-subscribe-icon" />
                  </div>
                  <h3>Subscribe Us</h3>
                  <p>Subscribe us &amp; get latest news &amp; articles to inbox.</p>
                  <input type="email" placeholder="email address" className="PopularPost-subscribe-input" />
                  <button className="PopularPost-subscribe-btn">SUBSCRIBE</button>
                </div>
              </div>

            </div>
          </aside>

          {/* RIGHT BLOG CONTENT LIST */}
          <main className="PopularPost-main-content">
            
            {/* Post 1 */}
           
            {/* Post 2 */}
            <article className="PopularPost-card">
              <div className="PopularPost-card-image-wrapper">
                <img src={post2Img} alt="Water Coolers App" className="PopularPost-card-img" />
                <div className="PopularPost-post-badge"><FaFolderOpen /> WATER COOLERS</div>
              </div>
              <div className="PopularPost-card-body">
                <h2 className="PopularPost-card-title">Top Benefits of Having Our Mobile App</h2>
                <div className="PopularPost-card-meta">
                  <span><FaCalendarAlt /> August 21, 2021</span>
                  <span><FaUser /> By admin</span>
                  <span><FaRegComment /> 0 Comments</span>
                </div>
                <p className="PopularPost-card-excerpt">
                  To take a trivial example which of ever undertakes laborious cases are perfectly simple and 
                  easy to distinguish. In a free hour, when our power. Foresee the pain and trouble that are 
                  bound ensue and equal blame belongs our power of choice untrammelled [...]
                </p>
                <a href="#read" className="PopularPost-readmore-link"><FaArrowRight /> READ MORE</a>
              </div>
            </article>

            {/* Post 3 */}
            <article className="PopularPost-card">
              <div className="PopularPost-card-image-wrapper">
                <img src={post3Img} alt="Hydration Tips" className="PopularPost-card-img" />
                <div className="PopularPost-post-badge"><FaFolderOpen /> BOTTLED WATER</div>
              </div>
              <div className="PopularPost-card-body">
                <h2 className="PopularPost-card-title">Five Tips to Keep Your Body Hydrated</h2>
                <div className="PopularPost-card-meta">
                  <span><FaCalendarAlt /> August 21, 2021</span>
                  <span><FaUser /> By admin</span>
                  <span><FaRegComment /> 0 Comments</span>
                </div>
                <p className="PopularPost-card-excerpt">
                  Foresee the pain and trouble that are bound ensue and equal blame belongs our power of 
                  choice untrammelled and when nothing prevents what like best we denounces righteous 
                  indignation and dislike men christmas beguiled and demoralized by the charms of pleasure 
                  of the moment so that they cannot foresee the pain and trouble that are [...]
                </p>
                <a href="#read" className="PopularPost-readmore-link"><FaArrowRight /> READ MORE</a>
              </div>
            </article>

          </main>

        </div>
      </div>
    </div>
  );
};

export default PopularPost;