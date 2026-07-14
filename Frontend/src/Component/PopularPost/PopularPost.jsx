import React, { useState } from 'react';
import './PopularPost.css';

// React Icons Imports
import { 
  FaCalendarAlt, 
  FaUser, 
  FaRegComment, 
  FaSearch, 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaPinterestP, 
  FaInstagram, 
  FaSkype, 
  FaArrowRight 
} from 'react-icons/fa';
import { ImQuotesLeft } from 'react-icons/im';
import { IoColorPaletteSharp } from 'react-icons/io5';
import { TfiClose } from 'react-icons/tfi'; 
import { HiOutlineMailOpen } from 'react-icons/hi';

// Image Asset Imports
import mainBlogImg from '../../assets/popular2.jpg';
import authorAvatar from '../../assets/blog-v3-4.jpg';
import postImg1 from '../../assets/blog-v3-4.jpg';
import postImg2 from '../../assets/popular2.jpg';
import postImg3 from '../../assets/popular1.jpg';

const PopularPost = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [emailInput, setEmailInput] = useState('');

  const popularPostsList = [
    {
      id: 1,
      image: postImg1,
      date: 'August 17, 2021',
      title: 'PACKAGED WATER: WHAT THINGS TO CONSIDER?'
    },
    {
      id: 2,
      image: postImg2,
      date: 'August 17, 2021',
      title: 'DISCOVER THE BEAUTIES OF BULK BOTTLED WATER'
    },
    {
      id: 3,
      image: postImg3,
      date: 'August 17, 2021',
      title: 'AGUAPURE WATER: NEVER WAIT FOR RAIN AGAIN'
    }
  ];

  const categories = [
    'BOTTLED WATER',
    'LATEST NEWS',
    'OUR BLOG',
    'WATER COOLERS'
  ];

  const tags = [
    'Bottle', 'Coolers', 'Delivery', 'Home', 'Mineral', 'Office', 'Safety', 'Sports', 'Water Quality'
  ];

  return (
    <div className="PopularPost">
      {/* Theme/Palette Fixed Side Action Indicator */}
      <div className="PopularPost-palette-sticky">
        <IoColorPaletteSharp />
      </div>

      <div className="PopularPost-container">
        
        {/* ================= LEFT MAIN CONTENT REGION ================= */}
        <main className="PopularPost-main-content">
          
          {/* Article Card Wrapper */}
          <article className="PopularPost-article-card">
            
            {/* Header Image with Tag Banner Overlay */}
            <div className="PopularPost-main-img-container">
              <img src={mainBlogImg} alt="Water Bottles" className="PopularPost-main-img" />
              <div className="PopularPost-badge">
                <span className="PopularPost-badge-icon">📁</span> LATEST NEWS
              </div>
            </div>

            {/* Meta Attributes Panel */}
            <div className="PopularPost-meta-row">
              <span className="PopularPost-meta-item">
                <FaCalendarAlt className="PopularPost-meta-icon" /> August 12, 2021
              </span>
              <span className="PopularPost-meta-divider">|</span>
              <span className="PopularPost-meta-item">
                <FaUser className="PopularPost-meta-icon" /> By admin
              </span>
              <span className="PopularPost-meta-divider">|</span>
              <span className="PopularPost-meta-item">
                <FaRegComment className="PopularPost-meta-icon" /> 0 Comments
              </span>
            </div>

            {/* Article Paragraphs */}
            <p className="PopularPost-paragraph">
              That they cannot forest the pain trouble that are bound to ensue equal. Foresee the pain and trouble that are bound ensue and equal blame belongs our power of choice untrammelled and when nothing prevents what like best we denounces righteous indignation and dislike men christmas beguiled and demoralized by the charms of pleasure of the moment so that they cannot foresee the pain and trouble that are bound to ensue.
            </p>

            <h2 className="PopularPost-section-heading">Experience the Difference</h2>
            
            <p className="PopularPost-paragraph">
              Bound ensue and equal blame belongs our power of choice untrammelled when nothing prevents what like best we denounces righteous indignation and dislike men christmas beguiled demoralized by the charms of pleasure of the moment.
            </p>
            <p className="PopularPost-paragraph">
              Indignation and dislike men who are so beguiled and demoralized the charms of pleasure moment so blinded by desire, that they cannot foresee the pain and trouble.
            </p>
            <p className="PopularPost-paragraph">
              Fault with a man who chooses to enjoy a pleasure that annoying consequences who avoids.
            </p>

            {/* Quote Blockout Section */}
            <blockquote className="PopularPost-quote-block">
              <div className="PopularPost-quote-icon-box">
                <ImQuotesLeft className="PopularPost-quote-svg" />
              </div>
              <div className="PopularPost-quote-text-container">
                <p className="PopularPost-quote-text">
                  A river seems a magic thing. A magic, moving, living part of the very earth itself.
                </p>
                <cite className="PopularPost-quote-author">STEPHEN JONES</cite>
              </div>
            </blockquote>

            <h2 className="PopularPost-section-heading">Is Safe to Drink?</h2>
            
            <p className="PopularPost-paragraph">
              Mistaken idea of denouncing pleasure and praising pain was born and we will give you a complete account of the systems, and expounds the actual teachings of the great explorers of the truth that master-builder of human happiness one rejects dislikes.
            </p>

            {/* Custom Icon List Group */}
            <ul className="PopularPost-feature-list">
              <li className="PopularPost-feature-item">
                <span className="PopularPost-list-bullet"><TfiClose /></span>
                Obligations of business it will frequently occur that pleasures.
              </li>
              <li className="PopularPost-feature-item">
                <span className="PopularPost-list-bullet"><TfiClose /></span>
                Foresee the pain and trouble that are bound.
              </li>
              <li className="PopularPost-feature-item">
                <span className="PopularPost-list-bullet"><TfiClose /></span>
                Foresee the pain and trouble that are bound.
              </li>
              <li className="PopularPost-feature-item">
                <span className="PopularPost-list-bullet"><TfiClose /></span>
                Foresee the pain and trouble that are bound.
              </li>
            </ul>

            {/* Tags & Social Share Footer Row */}
            <div className="PopularPost-share-bar">
              <div className="PopularPost-tags-inline">
                <span className="PopularPost-label">Tags:</span>
                <span className="PopularPost-pill-tag">Coolers</span>
                <span className="PopularPost-pill-tag">Sports</span>
              </div>
              <div className="PopularPost-social-inline">
                <span className="PopularPost-label">Share:</span>
                <a href="#/" className="PopularPost-social-circle"><FaFacebookF /></a>
                <a href="#/" className="PopularPost-social-circle"><FaTwitter /></a>
                <a href="#/" className="PopularPost-social-circle"><FaLinkedinIn /></a>
                <a href="#/" className="PopularPost-social-circle"><FaPinterestP /></a>
              </div>
            </div>

            {/* Next Post Navigation Bar */}
            <div className="PopularPost-nav-link-box">
              <span className="PopularPost-nav-sub">NEXT POST <FaArrowRight className="PopularPost-nav-arrow" /></span>
              <h4 className="PopularPost-nav-title">Top Benefits of Having Our Mobile App</h4>
            </div>

          </article>

          {/* Author Card Profile */}
          <div className="PopularPost-author-card">
            <div className="PopularPost-author-avatar-box">
              <img src={authorAvatar} alt="Admin" className="PopularPost-author-avatar" />
            </div>
            <div className="PopularPost-author-info">
              <h3 className="PopularPost-author-name">admin</h3>
              <p className="PopularPost-author-bio">
                They cannot foresee the pain and trouble that are bound to ensue and equal blame belongs to those who fail in their duty through all weakness of will, which is the same as saying.
              </p>
              <div className="PopularPost-author-socials">
                <a href="#/"><FaFacebookF /></a>
                <a href="#/"><FaInstagram /></a>
                <a href="#/"><FaSkype /></a>
                <a href="#/"><FaTwitter /></a>
              </div>
            </div>
          </div>

        </main>

        {/* ================= RIGHT UNIFIED SIDEBAR ================= */}
        <aside className="PopularPost-sidebar">
          
          {/* 1. Search Block */}
          <div className="PopularPost-widget">
            <h3 className="PopularPost-widget-title">Search</h3>
            <div className="PopularPost-wave-decoration">
              <svg viewBox="0 0 56 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.5C3.5 4.5 5.5 1.5 8 1.5C10.5 1.5 12.5 4.5 15 4.5C17.5 4.5 19.5 1.5 22 1.5C24.5 1.5 26.5 4.5 29 4.5C31.5 4.5 33.5 1.5 36 1.5C38.5 1.5 40.5 4.5 43 4.5C45.5 4.5 47.5 1.5 50 1.5C52.5 1.5 54.5 4.5 57 4.5" stroke="#00C3FF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="PopularPost-search-box">
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="PopularPost-search-input" 
              />
              <button className="PopularPost-search-btn">
                <FaSearch />
              </button>
            </div>
            
            <div className="PopularPost-widget-wave-divider"></div>
          </div>

          {/* 2. Category Block */}
          <div className="PopularPost-widget">
            <h3 className="PopularPost-widget-title">Category</h3>
            <div className="PopularPost-wave-decoration">
              <svg viewBox="0 0 56 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.5C3.5 4.5 5.5 1.5 8 1.5C10.5 1.5 12.5 4.5 15 4.5C17.5 4.5 19.5 1.5 22 1.5C24.5 1.5 26.5 4.5 29 4.5C31.5 4.5 33.5 1.5 36 1.5C38.5 1.5 40.5 4.5 43 4.5C45.5 4.5 47.5 1.5 50 1.5C52.5 1.5 54.5 4.5 57 4.5" stroke="#00C3FF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <ul className="PopularPost-category-list">
              {categories.map((cat, index) => (
                <li key={index} className="PopularPost-category-item">
                  {cat}
                </li>
              ))}
            </ul>

            <div className="PopularPost-widget-wave-divider"></div>
          </div>

          {/* 3. Popular Posts Block */}
          <div className="PopularPost-widget">
            <h3 className="PopularPost-widget-title">Popular Post</h3>
            <div className="PopularPost-wave-decoration">
              <svg viewBox="0 0 56 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.5C3.5 4.5 5.5 1.5 8 1.5C10.5 1.5 12.5 4.5 15 4.5C17.5 4.5 19.5 1.5 22 1.5C24.5 1.5 26.5 4.5 29 4.5C31.5 4.5 33.5 1.5 36 1.5C38.5 1.5 40.5 4.5 43 4.5C45.5 4.5 47.5 1.5 50 1.5C52.5 1.5 54.5 4.5 57 4.5" stroke="#00C3FF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="PopularPost-sidebar-posts">
              {popularPostsList.map((post) => (
                <div key={post.id} className="PopularPost-item">
                  <div className="PopularPost-img-container">
                    <img src={post.image} alt={post.title} className="PopularPost-thumb" />
                  </div>
                  <div className="PopularPost-info">
                    <div className="PopularPost-date-wrapper">
                      <FaCalendarAlt className="PopularPost-calendar-icon" />
                      <span className="PopularPost-date">{post.date}</span>
                    </div>
                    <h4 className="PopularPost-title">{post.title}</h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="PopularPost-widget-wave-divider"></div>
          </div>

          {/* 4. Tag Cloud Block */}
          <div className="PopularPost-widget">
            <h3 className="PopularPost-widget-title">Tag Cloud</h3>
            <div className="PopularPost-wave-decoration">
              <svg viewBox="0 0 56 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.5C3.5 4.5 5.5 1.5 8 1.5C10.5 1.5 12.5 4.5 15 4.5C17.5 4.5 19.5 1.5 22 1.5C24.5 1.5 26.5 4.5 29 4.5C31.5 4.5 33.5 1.5 36 1.5C38.5 1.5 40.5 4.5 43 4.5C45.5 4.5 47.5 1.5 50 1.5C52.5 1.5 54.5 4.5 57 4.5" stroke="#00C3FF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="PopularPost-tags-cloud">
              {tags.map((tag, index) => (
                <span key={index} className="PopularPost-cloud-pill">{tag}</span>
              ))}
            </div>

            <div className="PopularPost-widget-wave-divider"></div>
          </div>

          {/* 5. Subscribe Widget Block */}
          <div className="PopularPost-widget">
            <h3 className="PopularPost-widget-title">Subscribe Us</h3>
            <div className="PopularPost-wave-decoration">
              <svg viewBox="0 0 56 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.5C3.5 4.5 5.5 1.5 8 1.5C10.5 1.5 12.5 4.5 15 4.5C17.5 4.5 19.5 1.5 22 1.5C24.5 1.5 26.5 4.5 29 4.5C31.5 4.5 33.5 1.5 36 1.5C38.5 1.5 40.5 4.5 43 4.5C45.5 4.5 47.5 1.5 50 1.5C52.5 1.5 54.5 4.5 57 4.5" stroke="#00C3FF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="PopularPost-subscribe-card">
              <div className="PopularPost-sub-icon-circle">
                <HiOutlineMailOpen />
              </div>
              <h4 className="PopularPost-sub-title">Subscribe Us</h4>
              <p className="PopularPost-sub-desc">Subscribe us & get latest news & articles to inbox.</p>
              
              <div className="PopularPost-sub-form">
                <input 
                  type="email" 
                  placeholder="email address" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="PopularPost-sub-input" 
                />
                <button className="PopularPost-sub-btn">SUBSCRIBE</button>
              </div>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
};

export default PopularPost;