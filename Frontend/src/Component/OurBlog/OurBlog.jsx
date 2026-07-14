import React, { useState } from 'react';
import { IoColorPaletteSharp } from 'react-icons/io5'; // Floating palette icon on the left
import './OurBlog.css';

const OurBlog = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Submitted Comment:', formData);
  };

  return (
    <div className="OurBlog">
      {/* Optional Left Floating Theme Icon (matches the visual system across your screenshots) */}
      <div className="OurBlog-palette-container">
        <IoColorPaletteSharp className="OurBlog-palette-icon" />
      </div>

      {/* Main Comment Form Card */}
      <div className="OurBlog-card">
        <h2 className="OurBlog-heading">Leave A Comment</h2>
        
        <form className="OurBlog-form" onSubmit={handleSubmit}>
          <div className="OurBlog-input-group">
            <input
              type="text"
              name="name"
              className="OurBlog-input"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              className="OurBlog-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <textarea
            name="comment"
            className="OurBlog-textarea"
            placeholder="Type Comment Here"
            rows="6"
            value={formData.comment}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="OurBlog-submit-btn">
            <span className="OurBlog-submit-text">POST COMMENT</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default OurBlog;