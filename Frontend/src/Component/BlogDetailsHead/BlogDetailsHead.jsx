import React from 'react';
import './BlogDetailsHead.css';
import { FaSearch, FaCalendarAlt, FaUser, FaRegComment, FaArrowRight, FaFolderOpen } from 'react-icons/fa';

// Import images from your src/assets folder
import bannerImg from '../../assets/breadcrum.jpeg'; // Replace with your banner image path
import postImg from '../../assets/blog-v3-1.jpg';    // Replace with your post/delivery image path

const BlogDetailsHead = () => {
  return (
    <div className="BlogDetailsHead-container">
      {/* 1. Banner Header Section */}
      <div 
        className="BlogDetailsHead-banner" 
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="BlogDetailsHead-banner-overlay">
          <h1 className="BlogDetailsHead-banner-title">Blog Classic</h1>
          <div className="BlogDetailsHead-breadcrumbs">
            <span className="BlogDetailsHead-breadcrumb-home">HOME</span>
            <span className="BlogDetailsHead-breadcrumb-separator">/</span>
            <span className="BlogDetailsHead-breadcrumb-current">BLOG CLASSIC</span>
          </div>
        </div>
      </div>

      {/* 2. Main Content Layout Section */}
      <div className="BlogDetailsHead-layout-wrapper">
        <div className="BlogDetailsHead-grid">
          
          {/* Left Sticky Sidebar */}
          <aside className="BlogDetailsHead-sidebar">
            <div className="BlogDetailsHead-sidebar-inner">
              
              {/* Search Widget */}
              <div className="BlogDetailsHead-widget">
                <h3 className="BlogDetailsHead-widget-title">Search</h3>
                <div className="BlogDetailsHead-wave-divider"></div>
                <div className="BlogDetailsHead-search-box">
                  <input type="text" placeholder="Search" />
                  <button type="submit" className="BlogDetailsHead-search-btn">
                    <FaSearch />
                  </button>
                </div>
              </div>

              {/* Category Widget */}
              <div className="BlogDetailsHead-widget">
                <h3 className="BlogDetailsHead-widget-title">Category</h3>
                <div className="BlogDetailsHead-wave-divider"></div>
                <ul className="BlogDetailsHead-category-list">
                  <li><a href="#bottled-water">BOTTLED WATER</a></li>
                  <li><a href="#latest-news">LATEST NEWS</a></li>
                  <li><a href="#our-blog">OUR BLOG</a></li>
                  <li><a href="#water-coolers">WATER COOLERS</a></li>
                </ul>
              </div>

              {/* Popular Post Widget */}
              

            </div>
          </aside>

          {/* Right Blog Post Area */}
          <main className="BlogDetailsHead-main-content">
            <article className="BlogDetailsHead-card">
              {/* Card Image Wrapper */}
              <div className="BlogDetailsHead-card-image-wrapper">
                <img src={postImg} alt="Packaged Water Delivery" className="BlogDetailsHead-card-img" />
                <div className="BlogDetailsHead-post-badge">
                  <FaFolderOpen /> OUR BLOG
                </div>
              </div>

              {/* Card Body */}
              <div className="BlogDetailsHead-card-body">
                <h2 className="BlogDetailsHead-card-title">
                  Packaged Water: What Things to Consider?
                </h2>

                {/* Metadata details */}
                <div className="BlogDetailsHead-card-meta">
                  <span><FaCalendarAlt /> August 21, 2021</span>
                  <span><FaUser /> By admin</span>
                  <span><FaRegComment /> 0 Comments</span>
                </div>

                <p className="BlogDetailsHead-card-excerpt">
                  That they cannot forest the pain trouble that are bound to ensure equal demoralized by the
                  charms of pleasure of the moment so blinded by desire. To take a trivial example which of
                  ever undertakes laborious cases are perfectly simple and easy to distinguish. In a free hour,
                  when our power. Foresee the pain and [...]
                </p>

                <a href="#read-more" className="BlogDetailsHead-readmore-link">
                  <FaArrowRight /> READ MORE
                </a>
              </div>
            </article>
          </main>

        </div>
      </div>
    </div>
  );
};

export default BlogDetailsHead;