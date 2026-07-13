import React, { useState, useEffect } from 'react';
import './BlogManagement.css';

// 12 Items of Mock Data
const MOCK_DATA = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: `Author ${index + 1}`,
  date: new Date(2026, 6, 13 - index).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }),
  designation: index % 2 === 0 ? 'Technical Writer' : 'Content Strategist',
  imageUrl: `https://picsum.photos/id/${index + 10}/600/400`
}));

const ITEMS_PER_PAGE = 8;

const BlogManagement = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Close dropdown when clicking outside using event delegation instead of references
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the clicked target is inside a three-dots activator or the dropdown menu itself, do nothing
      if (event.target.closest('.BlogManagement-three-dots-btn') || event.target.closest('.BlogManagement-dropdown-menu')) {
        return;
      }
      setActiveDropdown(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleViewChange = (mode) => {
    setViewMode(mode);
    setCurrentPage(1);
    setActiveDropdown(null);
  };

  const toggleDropdown = (id, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleAction = (action, id) => {
    alert(`${action} clicked for item ID: ${id}`);
    setActiveDropdown(null);
  };

  // Pagination Logic
  const totalPages = Math.ceil(MOCK_DATA.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = MOCK_DATA.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="BlogManagement-container">
      {/* Top Header Section */}
      <header className="BlogManagement-header">
        <h1 className="BlogManagement-title">Blog Management</h1>
        <div className="BlogManagement-view-toggle-buttons">
          <button
            className={`BlogManagement-toggle-btn ${viewMode === 'grid' ? 'BlogManagement-toggle-btn-active' : ''}`}
            onClick={() => handleViewChange('grid')}
            aria-label="Grid View"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M3 3h7v7H3zm11 0h7v7h-7zm0 11h7v7h-7zM3 14h7v7H3z"/>
            </svg>
            <span>Grid View</span>
          </button>
          <button
            className={`BlogManagement-toggle-btn ${viewMode === 'list' ? 'BlogManagement-toggle-btn-active' : ''}`}
            onClick={() => handleViewChange('list')}
            aria-label="List View"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M3 4h18v2H3zm0 7h18v2H3zm0 7h18v2H3z"/>
            </svg>
            <span>List View</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="BlogManagement-content">
        {viewMode === 'grid' ? (
          <div className="BlogManagement-grid-view-layout">
            {currentItems.map((item) => (
              <div key={item.id} className="BlogManagement-grid-card">
                <div 
                  className="BlogManagement-card-image-bg" 
                  style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(${item.imageUrl})` }}
                >
                  <div className="BlogManagement-actions-menu-container">
                    <button 
                      className="BlogManagement-three-dots-btn" 
                      onClick={(e) => toggleDropdown(item.id, e)}
                      aria-haspopup="true"
                    >
                      ⋮
                    </button>
                    {activeDropdown === item.id && (
                      <div className="BlogManagement-dropdown-menu">
                        <button onClick={() => handleAction('Edit', item.id)}>Edit</button>
                        <button onClick={() => handleAction('Delete', item.id)} className="BlogManagement-delete-action">Delete</button>
                        <button onClick={() => handleAction('Publish', item.id)}>Publish</button>
                      </div>
                    )}
                  </div>

                  <div className="BlogManagement-card-overlay-text">
                    <h3 className="BlogManagement-item-name">{item.name}</h3>
                    <p className="BlogManagement-item-designation">{item.designation}</p>
                    <span className="BlogManagement-item-date">{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="BlogManagement-list-view-layout">
            <div className="BlogManagement-list-table-wrapper">
              <table className="BlogManagement-list-table">
                <thead>
                  <tr>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Date</th>
                    <th className="BlogManagement-text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item.id} className="BlogManagement-list-row">
                      <td>
                        <div 
                          className="BlogManagement-list-avatar" 
                          style={{ backgroundImage: `url(${item.imageUrl})` }}
                        />
                      </td>
                      <td className="BlogManagement-font-weight-bold">{item.name}</td>
                      <td><span className="BlogManagement-badge-designation">{item.designation}</span></td>
                      <td className="BlogManagement-text-muted">{item.date}</td>
                      <td className="BlogManagement-text-right BlogManagement-position-relative">
                        <button 
                          className="BlogManagement-three-dots-btn BlogManagement-list-dots" 
                          onClick={(e) => toggleDropdown(item.id, e)}
                        >
                          ⋮
                        </button>
                        {activeDropdown === item.id && (
                          <div className="BlogManagement-dropdown-menu BlogManagement-list-dropdown">
                            <button onClick={() => handleAction('Edit', item.id)}>Edit</button>
                            <button onClick={() => handleAction('Delete', item.id)} className="BlogManagement-delete-action">Delete</button>
                            <button onClick={() => handleAction('Publish', item.id)}>Publish</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <footer className="BlogManagement-pagination-container">
          <button 
            className="BlogManagement-page-nav-btn" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="BlogManagement-page-numbers">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx + 1}
                className={`BlogManagement-page-num-btn ${currentPage === idx + 1 ? 'BlogManagement-page-num-active' : ''}`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <button 
            className="BlogManagement-page-nav-btn" 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </footer>
      )}
    </div>
  );
};

export default BlogManagement;