import React, { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  // Gallery Data Store State
  const [galleryItems, setGalleryItems] = useState([]);
  
  // Form Input Element States
  const [imageName, setImageName] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  // Editing Interface Control States
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Pagination Engine State Setup
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Process Selected File & Generate Base64 Strings for Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds the allowable 2MB limit!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form Submission Logic (Creates or Updates an Element)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Strict Input Validation Fields Verification
    if (!imagePreview) {
      alert("A gallery image is required!");
      return;
    }
    if (!imageName.trim()) {
      alert("Image Name is required!");
      return;
    }

    if (isEditing) {
      // Modify/Update Action Path
      setGalleryItems(galleryItems.map(item => 
        item.id === currentId 
          ? { ...item, name: imageName.trim(), image: imagePreview }
          : item
      ));
      setIsEditing(false);
      setCurrentId(null);
    } else {
      // Creation Action Path
      const newItem = {
        id: Date.now(),
        name: imageName.trim(),
        image: imagePreview
      };
      setGalleryItems([...galleryItems, newItem]);
    }

    resetForm();
  };

  // Populate Input Controls for Modifying Records
  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setImageName(item.name);
    setImagePreview(item.image);
  };

  // Delete Element from Active State Array
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this item from the gallery?")) {
      const filtered = galleryItems.filter(item => item.id !== id);
      setGalleryItems(filtered);
      
      // Dynamic Pagination Index Balance Maintenance
      const totalPages = Math.ceil(filtered.length / itemsPerPage);
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
      }
    }
  };

  // Reset Component Inputs State Tree
  const resetForm = () => {
    setImageName('');
    setImagePreview('');
    setIsEditing(false);
    setCurrentId(null);
  };

  // Calculated Segment Indexes for Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = galleryItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(galleryItems.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="gallery-dashboard-container">
      <div className="gallery-dashboard-row">
        
        {/* Left 50% Column Space: Management Input Form Box */}
        <div className="gallery-form-section">
          <div className="gallery-card shadow-effect">
            <h2 className="gallery-section-title">
              {isEditing ? 'Modify Gallery Item' : 'Add to Gallery'}
            </h2>
            
            <form onSubmit={handleSubmit} className="gallery-data-form">
              
              {/* Drag-Drop Styled Photo Area (Mandatory Input) */}
              <div className="gallery-upload-group">
                <label className="gallery-input-label">
                  Upload Photo <span className="gallery-required-star">*</span>
                </label>
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/webp" 
                  id="gallery-file-input" 
                  onChange={handleImageChange} 
                  className="hidden-file-element"
                />
                <label htmlFor="gallery-file-input" className="gallery-dropzone-box">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview Area" className="gallery-preview-display" />
                  ) : (
                    <div className="gallery-dropzone-content">
                      <svg className="gallery-cloud-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 16v-8m0 0l-3 3m3-3l3 3M4.038 8.571A6 6 0 0116.5 6.541A4 4 0 0120 10.3a4.5 4.5 0 01-4.5 4.5H14m-4 4h1.5" />
                      </svg>
                      <span className="gallery-click-hint">Click to upload</span>
                      <span className="gallery-meta-hint">PNG, JPG or WEBP</span>
                      <span className="gallery-meta-hint">Max size 2MB</span>
                    </div>
                  )}
                </label>
              </div>

              {/* Text Input Block for Describing Names (Mandatory Input) */}
              <div className="gallery-input-group">
                <label className="gallery-input-label">
                  Image Name <span className="gallery-required-star">*</span>
                </label>
                <input 
                  type="text" 
                  value={imageName} 
                  onChange={(e) => setImageName(e.target.value)} 
                  placeholder="Enter descriptive image name"
                  className="gallery-text-field"
                />
              </div>

              {/* Functional Interactive Button Components Container */}
              <div className="gallery-action-buttons-row">
                <button type="submit" className="gallery-btn gallery-btn-submit">
                  {isEditing ? 'Update Item' : 'Submit'}
                </button>
                <button type="button" onClick={resetForm} className="gallery-btn gallery-btn-cancel">
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Right 50% Column Space: Display Layout Matrix & Table Section */}
        <div className="gallery-table-section">
          <div className="gallery-card shadow-effect">
            <h2 className="gallery-section-title">Manage Gallery Items</h2>
            
            <div className="gallery-table-scroll-container">
              <table className="gallery-data-table">
                <thead>
                  <tr>
                    <th style={{ width: '80px' }}>Sl No.</th>
                    <th style={{ width: '120px' }}>Image/Photo</th>
                    <th>Image Name</th>
                    <th style={{ width: '160px', textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                      <tr key={item.id}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>
                          <div className="gallery-table-preview-wrapper">
                            <img src={item.image} alt={item.name} className="gallery-table-thumbnail" />
                          </div>
                        </td>
                        <td className="gallery-item-name-cell">{item.name}</td>
                        <td>
                          <div className="gallery-row-actions">
                            <button onClick={() => handleEdit(item)} className="row-action-btn btn-action-edit">Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="row-action-btn btn-action-delete">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="gallery-table-empty">
                        No gallery records uploaded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Dynamic Multi-Page Pagination Bar controls */}
            {totalPages > 1 && (
              <div className="gallery-pagination">
                <button 
                  onClick={() => paginate(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className="gallery-page-nav-btn"
                >
                  &laquo; Prev
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`gallery-page-num-btn ${currentPage === i + 1 ? 'gallery-page-active' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => paginate(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className="gallery-page-nav-btn"
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

export default Gallery;