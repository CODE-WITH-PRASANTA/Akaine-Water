import React from 'react';
import { IoColorPaletteSharp } from 'react-icons/io5'; // Using react-icons for the left icon
import './BlogDetailsHead.css';
import backgroundImg from '../../assets/breadcrum.jpeg'; // Adjust path if your structure differs

const BlogDetailsHead = () => {
  return (
    <div 
      className="BlogDetailsHead" 
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Floating Left Icon */}
      <div className="BlogDetailsHead-icon-wrapper">
        <IoColorPaletteSharp className="BlogDetailsHead-palette-icon" />
      </div>

      {/* Content Container */}
      <div className="BlogDetailsHead-content">
        <h1 className="BlogDetailsHead-title">
          Packaged Water: What Things To Consider?
        </h1>
        
        <nav className="BlogDetailsHead-breadcrumbs">
          <span className="BlogDetailsHead-crumb-link">HOME</span>
          <span className="BlogDetailsHead-separator">/</span>
          <span className="BlogDetailsHead-crumb-current">PACKAGED WATER: WHAT THINGS TO CONSIDER?</span>
        </nav>
      </div>
    </div>
  );
};

export default BlogDetailsHead;