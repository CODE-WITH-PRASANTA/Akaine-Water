import React, { useState } from 'react';
import './Testiminial.css';

const Testiminial = () => {
  // Testimonial Dataset State
  const [testimonials, setTestimonials] = useState([]);
  
  // Form Management Input States
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  
  // REAL RATING TRICK: Initialize to 0 so all stars start completely empty
  const [rating, setRating] = useState(0); 
  const [imagePreview, setImagePreview] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  // Controller states for editing modes
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Pagination Controller Engine State (5 rows per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  // Local File Upload Stream Conversion
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size bounds exceed the 2MB capability limit!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Process and Submit Active Record Matrix
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form field mandatory evaluations
    if (!imagePreview) {
      alert("Profile picture is mandatory!");
      return;
    }
    if (!name.trim()) {
      alert("Name field is mandatory!");
      return;
    }
    if (!address.trim()) {
      alert("Address field is mandatory!");
      return;
    }
    if (rating === 0) {
      alert("Please select a star rating between 1 and 5!");
      return;
    }
    if (!description.trim()) {
      alert("Description/Feedback text is mandatory!");
      return;
    }

    if (isEditing) {
      // Modify record update sequence
      setTestimonials(testimonials.map(item => 
        item.id === currentId 
          ? { ...item, name: name.trim(), address: address.trim(), description: description.trim(), rating, image: imagePreview }
          : item
      ));
      setIsEditing(false);
      setCurrentId(null);
    } else {
      // Generation setup routine
      const newTestimonial = {
        id: Date.now(),
        name: name.trim(),
        address: address.trim(),
        description: description.trim(),
        rating,
        image: imagePreview
      };
      setTestimonials([...testimonials, newTestimonial]);
    }

    resetForm();
  };

  // Populate form input elements for modifying records
  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setName(item.name);
    setAddress(item.address);
    setDescription(item.description);
    setRating(item.rating);
    setImagePreview(item.image);
  };

  // Purge selected record from current hooks list state tree
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer testimonial?")) {
      const filtered = testimonials.filter(item => item.id !== id);
      setTestimonials(filtered);
      
      const totalPages = Math.ceil(filtered.length / itemsPerPage);
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
      }
    }
  };

  // Restore defaults to baseline form settings
  const resetForm = () => {
    setName('');
    setAddress('');
    setDescription('');
    setRating(0); // Clear stars completely on cancel/reset
    setImagePreview('');
    setIsEditing(false);
    setCurrentId(null);
  };

  // Pagination slice computing calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = testimonials.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render method shortcut helper for display output stars inside table row blocks
  const renderStars = (count) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <div className="testimonial-dashboard-container">
      <div className="testimonial-dashboard-row">
        
        {/* Left Side 50% Panel Space Grid - Interactive Submission Form Container */}
        <div className="testimonial-form-section">
          <div className="testimonial-card shadow-effect">
            <h2 className="testimonial-section-title">
              {isEditing ? 'Modify Testimonial' : 'Add Testimonial'}
            </h2>
            
            <form onSubmit={handleSubmit} className="testimonial-data-form">
              
              {/* Image Box Upload Layout Block */}
              <div className="testimonial-upload-group">
                <label className="testimonial-input-label">
                  Client Photo <span className="testimonial-required-star">*</span>
                </label>
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/webp" 
                  id="testimonial-file-input" 
                  onChange={handleImageChange} 
                  className="hidden-file-element"
                />
                <label htmlFor="testimonial-file-input" className="testimonial-dropzone-box">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Client Preview" className="testimonial-preview-display" />
                  ) : (
                    <div className="testimonial-dropzone-content">
                      <svg className="testimonial-cloud-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 16v-8m0 0l-3 3m3-3l3 3M4.038 8.571A6 6 0 0116.5 6.541A4 4 0 0120 10.3a4.5 4.5 0 01-4.5 4.5H14m-4 4h1.5" />
                      </svg>
                      <span className="testimonial-click-hint">Click to upload photo</span>
                      <span className="testimonial-meta-hint">PNG, JPG or WEBP (Max 2MB)</span>
                    </div>
                  )}
                </label>
              </div>

              {/* Flex Grid Configuration for Name & Address Inputs */}
              <div className="testimonial-field-row">
                <div className="testimonial-input-group">
                  <label className="testimonial-input-label">
                    Full Name <span className="testimonial-required-star">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Jane Smith"
                    className="testimonial-text-field"
                  />
                </div>

                <div className="testimonial-input-group">
                  <label className="testimonial-input-label">
                    Address <span className="testimonial-required-star">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="INDIA, IND"
                    className="testimonial-text-field"
                  />
                </div>
              </div>

              {/* Dynamic Real Star Rating Input Section */}
              <div className="testimonial-input-group">
                <label className="testimonial-input-label">
                  Rating <span className="testimonial-required-star">*</span>
                </label>
                <div className="star-rating-selector">
                  {[1, 2, 3, 4, 5].map((starIndex) => (
                    <button
                      type="button"
                      key={starIndex}
                      className={`star-button ${(hoverRating || rating) >= starIndex ? 'star-filled' : 'star-empty'}`}
                      onClick={() => setRating(starIndex)}
                      // onMouseEnter={() => setHoverRating(starIndex)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      ★
                    </button>
                  ))}
                  <span className="rating-numerical-badge">
                    {rating > 0 ? `(${rating} / 5)` : '(Select Stars)'}
                  </span>
                </div>
              </div>

              {/* Description Input Textarea box */}
              <div className="testimonial-input-group">
                <label className="testimonial-input-label">
                  Description <span className="testimonial-required-star">*</span>
                </label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Share the client feedback experience detail statement..."
                  rows="4"
                  className="testimonial-textarea-field"
                ></textarea>
              </div>

              {/* Form Action Controls Container Buttons with Hovers */}
              <div className="testimonial-action-buttons-row">
                <button type="submit" className="testimonial-btn testimonial-btn-submit">
                  {isEditing ? 'Update Review' : 'Submit'}
                </button>
                <button type="button" onClick={resetForm} className="testimonial-btn testimonial-btn-cancel">
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Right Side 50% Panel Space Grid - Display Table Visual Database Workspace Container */}
        <div className="testimonial-table-section">
          <div className="testimonial-card shadow-effect">
            <h2 className="testimonial-section-title">Manage Customer Reviews</h2>
            
            <div className="testimonial-table-scroll-container">
              <table className="testimonial-data-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>Sl No.</th>
                    <th style={{ width: '80px' }}>Image</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th style={{ width: '220px' }}>Description</th>
                    <th style={{ width: '100px' }}>Rating</th>
                    <th style={{ width: '150px', textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                      <tr key={item.id}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>
                          <div className="testimonial-table-preview-wrapper">
                            <img src={item.image} alt={item.name} className="testimonial-table-avatar" />
                          </div>
                        </td>
                        <td className="testimonial-bold-cell">{item.name}</td>
                        <td>{item.address}</td>
                        <td className="testimonial-desc-cell">{item.description}</td>
                        <td>
                          <span className="table-stars-display">{renderStars(item.rating)}</span>
                        </td>
                        <td>
                          <div className="testimonial-row-actions">
                            <button onClick={() => handleEdit(item)} className="row-action-btn btn-action-edit">Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="row-action-btn btn-action-delete">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="testimonial-table-empty">
                        No client testimonials recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls Row */}
            {totalPages > 1 && (
              <div className="testimonial-pagination">
                <button 
                  onClick={() => paginate(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className="testimonial-page-nav-btn"
                >
                  &laquo; Prev
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`testimonial-page-num-btn ${currentPage === i + 1 ? 'testimonial-page-active' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => paginate(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className="testimonial-page-nav-btn"
                >
                  Next &raquo;
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Testiminial;