import React, { useState, useEffect, useRef } from 'react';
import './BlogManagement.css';

// 12 Items of Mock Data
const MOCK_DATA = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: `Author ${index + 1}`,
  date: new Date(2026, 6, 12 - index).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }),
  designation: index % 2 === 0 ? 'Technical Writer' : 'Content Strategist',
  imageUrl: `https://picsum.photos/id/${index + 10}/600/400` // Using unique placeholder images
}));

const ITEMS_PER_PAGE = 8;

const BlogManagement = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset page when shifting views to avoid indexing conflicts
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
    <div className="blog-container">
      {/* Top Header Section */}
      <header className="blog-header">
        <h1 className="blog-title">Blog Management</h1>
        <div className="view-toggle-buttons">
          <button
            className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => handleViewChange('grid')}
            aria-label="Grid View"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M3 3h7v7H3zm11 0h7v7h-7zm0 11h7v7h-7zM3 14h7v7H3z"/>
            </svg>
            <span>Grid View</span>
          </button>
          <button
            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
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
      <main className="blog-content">
        {viewMode === 'grid' ? (
          <div className="grid-view-layout">
            {currentItems.map((item) => (
              <div key={item.id} className="grid-card">
                <div 
                  className="card-image-bg" 
                  style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(${item.imageUrl})` }}
                >
                  <div className="actions-menu-container">
                    <button 
                      className="three-dots-btn" 
                      onClick={(e) => toggleDropdown(item.id, e)}
                      aria-haspopup="true"
                    >
                      ⋮
                    </button>
                    {activeDropdown === item.id && (
                      <div className="dropdown-menu" ref={dropdownRef}>
                        <button onClick={() => handleAction('Edit', item.id)}>Edit</button>
                        <button onClick={() => handleAction('Delete', item.id)} className="delete-action">Delete</button>
                        <button onClick={() => handleAction('Publish', item.id)}>Publish</button>
                      </div>
                    )}
                  </div>

                  <div className="card-overlay-text">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-designation">{item.designation}</p>
                    <span className="item-date">{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="list-view-layout">
            <div className="list-table-wrapper">
              <table className="list-table">
                <thead>
                  <tr>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Date</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item.id} className="list-row">
                      <td>
                        <div 
                          className="list-avatar" 
                          style={{ backgroundImage: `url(${item.imageUrl})` }}
                        />
                      </td>
                      <td className="font-weight-bold">{item.name}</td>
                      <td><span className="badge-designation">{item.designation}</span></td>
                      <td className="text-muted">{item.date}</td>
                      <td className="text-right position-relative">
                        <button 
                          className="three-dots-btn list-dots" 
                          onClick={(e) => toggleDropdown(item.id, e)}
                        >
                          ⋮
                        </button>
                        {activeDropdown === item.id && (
                          <div className="dropdown-menu list-dropdown" ref={dropdownRef}>
                            <button onClick={() => handleAction('Edit', item.id)}>Edit</button>
                            <button onClick={() => handleAction('Delete', item.id)} className="delete-action">Delete</button>
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
        <footer className="pagination-container">
          <button 
            className="page-nav-btn" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx + 1}
                className={`page-num-btn ${currentPage === idx + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <button 
            className="page-nav-btn" 
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