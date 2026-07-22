import React, { useState } from 'react';
import './Profile.css';

// Import your local profile image asset here
import mainProfileAvatar from '../../assets/Profile.png'; 

// SVG Icons matching the UI design
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IdBadgeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#94a3b8">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 8c0-1.33-2.67-2-4-2s-4 .67-4 2v1h8v-1z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const PhoneRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#227c8d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const CameraIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const SaveIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const Profile = () => {
  // Saved profiles state
  const [savedProfiles, setSavedProfiles] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      image: mainProfileAvatar, // Using imported image
      selected: true,
      phone: '+1 (555) 123-4567',
      address: '123 Main Street, New York, NY 10001'
    },
    {
      id: 2,
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      selected: false,
      phone: '+1 (555) 987-6543',
      address: '456 Oak Avenue, Los Angeles, CA 90001'
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
      selected: false,
      phone: '+1 (555) 456-7890',
      address: '789 Pine Road, Chicago, IL 60601'
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'james.wilson@example.com',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      selected: false,
      phone: '+1 (555) 321-7654',
      address: '101 Maple Street, Miami, FL 33101'
    }
  ]);

  // Main active form state
  const [formData, setFormData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    avatar: mainProfileAvatar // Using imported image as default avatar
  });

  const [showAllProfiles, setShowAllProfiles] = useState(false);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Select Saved Profile
  const handleSelectProfile = (profile) => {
    setSavedProfiles((prev) =>
      prev.map((item) => ({ ...item, selected: item.id === profile.id }))
    );
    setFormData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
      avatar: profile.image
    });
  };

  // Delete Profile Handler
  const handleDeleteProfile = (e, id) => {
    e.stopPropagation(); // prevent selecting profile when deleting
    setSavedProfiles((prev) => prev.filter((item) => item.id !== id));
  };

  // Toggle View All
  const handleViewAll = () => {
    setShowAllProfiles(!showAllProfiles);
  };

  // Save Changes Handler
  const handleSaveChanges = (e) => {
    e.preventDefault();
    setSavedProfiles((prev) =>
      prev.map((item) =>
        item.selected
          ? {
              ...item,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              image: formData.avatar
            }
          : item
      )
    );
    alert('Changes saved successfully!');
  };

  // Change Password Handler
  const handleChangePassword = () => {
    const newPassword = prompt('Enter your new password:');
    if (newPassword) {
      alert('Password updated successfully!');
    }
  };

  // Avatar Upload Handler
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatar: imageURL }));
    }
  };

  // Filter list if "View All" is toggled
  const displayedProfiles = showAllProfiles 
    ? savedProfiles 
    : savedProfiles.slice(0, 4);

  return (
    <div className="Profile">
      {/* Header Title Section */}
      <div className="Profile-header">
        <h1 className="Profile-title">Profile</h1>
        <p className="Profile-subtitle">
          Manage your personal information and account settings
        </p>
      </div>

      {/* Main Content Card Container */}
      <div className="Profile-card">
        {/* Left Column - Sidebar */}
        <div className="Profile-sidebar">
          {/* Main Avatar & Profile Info */}
          <div className="Profile-pfp-area">
            <div className="Profile-avatar-wrapper">
              <img
                src={formData.avatar}
                alt={formData.name}
                className="Profile-avatar"
              />
              <label htmlFor="avatar-upload" className="Profile-camera-badge" title="Upload Photo">
                <CameraIcon />
              </label>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
            </div>
            <h2 className="Profile-name">{formData.name}</h2>
            <p className="Profile-email">{formData.email}</p>
          </div>

          {/* Saved Profiles Section */}
          <div className="Profile-saved-section">
            <div className="Profile-saved-header">
              <span className="Profile-saved-title">Saved Profiles</span>
              <button
                type="button"
                className="Profile-view-all-btn"
                onClick={handleViewAll}
              >
                <EyeIcon />
                <span>{showAllProfiles ? 'Show Less' : 'View All'}</span>
              </button>
            </div>

            <div className="Profile-saved-list">
              {displayedProfiles.length === 0 ? (
                <p className="Profile-no-data">No saved profiles</p>
              ) : (
                displayedProfiles.map((item) => (
                  <div
                    key={item.id}
                    className={`Profile-saved-item ${item.selected ? 'selected' : ''}`}
                    onClick={() => handleSelectProfile(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="Profile-saved-avatar"
                    />
                    <div className="Profile-saved-info">
                      <h4 className="Profile-saved-name">{item.name}</h4>
                      <p className="Profile-saved-email">{item.email}</p>
                    </div>
                    <button
                      type="button"
                      className="Profile-delete-btn"
                      onClick={(e) => handleDeleteProfile(e, item.id)}
                      title="Delete profile"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="Profile-form-area">
          <form onSubmit={handleSaveChanges}>
            {/* Name Field */}
            <div className="Profile-form-group">
              <label className="Profile-label">
                <UserIcon />
                <span>Name</span>
              </label>
              <div className="Profile-input-wrapper">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="Profile-input"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="Profile-form-group">
              <label className="Profile-label">
                <MailIcon />
                <span>Email</span>
              </label>
              <div className="Profile-input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="Profile-input Profile-input-has-suffix"
                  required
                />
                <span className="Profile-input-suffix">
                  <IdBadgeIcon />
                </span>
              </div>
            </div>

            {/* Phone Field */}
            <div className="Profile-form-group">
              <label className="Profile-label">
                <PhoneIcon />
                <span>Phone</span>
              </label>
              <div className="Profile-input-wrapper">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="Profile-input Profile-input-has-suffix"
                  required
                />
                <span className="Profile-input-suffix">
                  <PhoneRightIcon />
                </span>
              </div>
            </div>

            {/* Address Field */}
            <div className="Profile-form-group">
              <label className="Profile-label">
                <PinIcon />
                <span>Address</span>
              </label>
              <div className="Profile-input-wrapper">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="Profile-input"
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="Profile-actions">
              <button type="submit" className="Profile-btn Profile-save-btn">
                <SaveIcon />
                <span>Save Changes</span>
              </button>
              <button
                type="button"
                className="Profile-btn Profile-password-btn"
                onClick={handleChangePassword}
              >
                <LockIcon />
                <span>Change Password</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;