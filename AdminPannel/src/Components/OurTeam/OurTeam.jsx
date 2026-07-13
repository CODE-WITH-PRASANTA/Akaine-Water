import React, { useState } from 'react';
import './OurTeam.css';

const OurTeam = () => {
  // Team Data State
  const [teamMembers, setTeamMembers] = useState([]);
  
  // Form Input States
  const [fullName, setFullName] = useState('');
  const [designation, setDesignation] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [instagram, setInstagram] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  // Editing States
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Handle Image Upload & Conversion
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB limit!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form Submit (Create & Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Strict Mandatory Fields Validation
    if (!imagePreview) {
      alert("Profile Photo is required!");
      return;
    }
    if (!fullName.trim()) {
      alert("Full Name is required!");
      return;
    }
    if (!designation.trim()) {
      alert("Designation is required!");
      return;
    }

    if (isEditing) {
      // Update Mode
      setTeamMembers(teamMembers.map(member => 
        member.id === currentId 
          ? { ...member, name: fullName, designation, facebook, linkedin, instagram, image: imagePreview }
          : member
      ));
      setIsEditing(false);
      setCurrentId(null);
    } else {
      // Create Mode
      const newMember = {
        id: Date.now(),
        name: fullName,
        designation,
        facebook,
        linkedin,
        instagram,
        image: imagePreview
      };
      setTeamMembers([...teamMembers, newMember]);
    }

    resetForm();
  };

  // Populate fields for Editing
  const handleEdit = (member) => {
    setIsEditing(true);
    setCurrentId(member.id);
    setFullName(member.name);
    setDesignation(member.designation);
    setFacebook(member.facebook);
    setLinkedin(member.linkedin);
    setInstagram(member.instagram);
    setImagePreview(member.image);
  };

  // Delete Member
  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this member?")) {
      const filtered = teamMembers.filter(member => member.id !== id);
      setTeamMembers(filtered);
      
      const totalPages = Math.ceil(filtered.length / itemsPerPage);
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
      }
    }
  };

  // Clear Form Data
  const resetForm = () => {
    setFullName('');
    setDesignation('');
    setFacebook('');
    setLinkedin('');
    setInstagram('');
    setImagePreview('');
    setIsEditing(false);
    setCurrentId(null);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = teamMembers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(teamMembers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="team-dashboard-container">
      <div className="team-dashboard-row">
        
        {/* Left 50%: Form Creation Box */}
        <div className="team-form-section">
          <div className="card-box shadow-effect">
            <h2 className="section-title">{isEditing ? 'Modify Team Member' : 'Create Team Member'}</h2>
            <form onSubmit={handleSubmit} className="team-form">
              
              {/* Layout for Image Box and Primary Info Inputs */}
              <div className="form-media-row">
                
                {/* Modern Click to Upload Box Layout */}
                <div className="image-upload-wrapper">
                  <label className="upload-label">Profile Photo <span className="required-asterisk">*</span></label>
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/webp" 
                    id="file-upload" 
                    onChange={handleImageChange} 
                    className="file-input-hidden"
                  />
                  <label htmlFor="file-upload" className="upload-box-container">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="uploaded-display-img" />
                    ) : (
                      <div className="upload-box-content">
                        {/* Custom Vector Cloud Upload Icon */}
                        <svg className="upload-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 16v-8m0 0l-3 3m3-3l3 3M4.038 8.571A6 6 0 0116.5 6.541A4 4 0 0120 10.3a4.5 4.5 0 01-4.5 4.5H14m-4 4h1.5" />
                        </svg>
                        <span className="click-text">Click to upload</span>
                        <span className="format-text">PNG, JPG or WEBP</span>
                        <span className="size-text">Max size 2MB</span>
                      </div>
                    )}
                  </label>
                </div>

                {/* Name & Designation Fields */}
                <div className="primary-info-wrapper">
                  <div className="input-group">
                    <label>Full Name <span className="required-asterisk">*</span></label>
                    <input 
                      type="text" 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)} 
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="input-group">
                    <label>Designation <span className="required-asterisk">*</span></label>
                    <input 
                      type="text" 
                      value={designation} 
                      onChange={(e) => setDesignation(e.target.value)} 
                      placeholder="Senior Developer"
                    />
                  </div>
                </div>
              </div>

              {/* Social Media Links Section */}
              <h3 className="sub-section-title">Social Media Accounts</h3>
              <div className="social-inputs-grid">
                <div className="input-group">
                  <label>Facebook URL</label>
                  <input 
                    type="url" 
                    value={facebook} 
                    onChange={(e) => setFacebook(e.target.value)} 
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div className="input-group">
                  <label>LinkedIn URL</label>
                  <input 
                    type="url" 
                    value={linkedin} 
                    onChange={(e) => setLinkedin(e.target.value)} 
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div className="input-group">
                  <label>Instagram URL</label>
                  <input 
                    type="url" 
                    value={instagram} 
                    onChange={(e) => setInstagram(e.target.value)} 
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </div>

              {/* Buttons with Interactive Hovers */}
              <div className="form-actions-buttons">
                <button type="submit" className="btn btn-submit">
                  {isEditing ? 'Update Member' : 'Submit'}
                </button>
                <button type="button" onClick={resetForm} className="btn btn-cancel">
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Right 50%: Data Display Table Grid */}
        <div className="team-table-section">
          <div className="card-box shadow-effect">
            <h2 className="section-title">Manage Team</h2>
            
            <div className="table-responsive-wrapper">
              <table className="data-display-table">
                <thead>
                  <tr>
                    <th>Sl No.</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Social Profiles</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((member, index) => (
                      <tr key={member.id}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>
                          <img src={member.image} alt={member.name} className="table-avatar" />
                        </td>
                        <td className="font-weight-bold">{member.name}</td>
                        <td>{member.designation}</td>
                        <td>
                          <div className="social-links-cell">
                            {member.facebook && <a href={member.facebook} target="_blank" rel="noreferrer" className="social-badge fb">FB</a>}
                            {member.linkedin && <a href={member.linkedin} target="_blank" rel="noreferrer" className="social-badge ln">LN</a>}
                            {member.instagram && <a href={member.instagram} target="_blank" rel="noreferrer" className="social-badge ig">IG</a>}
                            {!member.facebook && !member.linkedin && !member.instagram && <span className="text-muted">None</span>}
                          </div>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button onClick={() => handleEdit(member)} className="action-btn btn-edit">Edit</button>
                            <button onClick={() => handleDelete(member.id)} className="action-btn btn-delete">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="empty-table-state">No team members added yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Dynamic Pagination UI */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <button 
                  onClick={() => paginate(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className="page-nav-btn"
                >
                  &laquo; Prev
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`page-number-btn ${currentPage === i + 1 ? 'active-page' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => paginate(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className="page-nav-btn"
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

export default OurTeam;