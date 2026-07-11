import React, { useState, useMemo, useRef } from 'react';
import './ShopPosting.css';

const ShopPosting = () => {
  // --- React State Hooks ---
  // Initialized with an empty array so NO dummy data is present by default
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form Field Tracking
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});

  // Search, Sorting & Pagination Hooks
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Increased slightly for better look in a scrollable view

  // Ref to trigger hidden native image file input programmatically
  const fileInputRef = useRef(null);

  // Custom File Trigger Button Click Handler
  const handleCustomUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Convert uploaded structural files to local base64 strings
  const handleImageFileProcessing = (e) => {
    const targetFile = e.target.files[0];
    if (targetFile) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(targetFile.type)) {
        setErrors(prev => ({ ...prev, image: 'Supported image formats: JPG, PNG, WEBP' }));
        return;
      }
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setImage(fileReader.result);
        setErrors(prev => ({ ...prev, image: '' }));
      };
      fileReader.readAsDataURL(targetFile);
    }
  };

  const purgeSelectedImage = (e) => {
    e.stopPropagation(); // Avoid triggering file chooser when clearing image
    setImage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Form Validator Function
  const runFormVerification = () => {
    const errorMap = {};
    if (!name.trim()) errorMap.name = "Product name is required.";
    if (!description.trim()) errorMap.description = "Product description is required.";
    if (!image) errorMap.image = "Product illustration asset is required.";
    if (!price || parseFloat(price) <= 0) errorMap.price = "Enter a valid price asset value.";
    if (rating === 0) errorMap.rating = "Please provide a star evaluation rating.";
    
    setErrors(errorMap);
    return Object.keys(errorMap).length === 0;
  };

  // Create or Update Controller
  const handleFormSubmission = (e) => {
    e.preventDefault();
    if (!runFormVerification()) return;

    setIsLoading(true);

    // Simulate database network response latencies
    setTimeout(() => {
      if (editingId) {
        setProducts(prev => prev.map(p => p.id === editingId ? {
          id: editingId,
          name: name.trim(),
          description: description.trim(),
          image,
          price: parseFloat(price),
          rating
        } : p));
        setEditingId(null);
      } else {
        const generatedProduct = {
          id: Date.now(),
          name: name.trim(),
          description: description.trim(),
          image,
          price: parseFloat(price),
          rating
        };
        setProducts(prev => [generatedProduct, ...prev]);
      }

      // Restore baseline states
      setName('');
      setDescription('');
      setImage('');
      setPrice('');
      setRating(0);
      setErrors({});
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 500);
  };

  // Trigger form into edit update configuration mode
  const setupFormForEditing = (targetProduct) => {
    setEditingId(targetProduct.id);
    setName(targetProduct.name);
    setDescription(targetProduct.description);
    setImage(targetProduct.image);
    setPrice(targetProduct.price.toString());
    setRating(targetProduct.rating);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete product entry context handler
  const processCatalogDeletion = (id) => {
    if (window.confirm("Are you sure you want to permanently delete this product?")) {
      setProducts(prev => prev.filter(item => item.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setName('');
        setDescription('');
        setImage('');
        setPrice('');
        setRating(0);
      }
    }
  };

  // Update Sorting Configuration Columns
  const toggleTableSorting = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Search filter and Sorting memoization computations
  const processedDataModel = useMemo(() => {
    let output = [...products];

    if (searchQuery.trim()) {
      const parsedQuery = searchQuery.toLowerCase();
      output = output.filter(p => 
        p.name.toLowerCase().includes(parsedQuery) || 
        p.description.toLowerCase().includes(parsedQuery)
      );
    }

    if (sortConfig.key) {
      output.sort((x, y) => {
        if (x[sortConfig.key] < y[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (x[sortConfig.key] > y[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return output;
  }, [products, searchQuery, sortConfig]);

  // Pagination Slice
  const visiblePaginatedProducts = useMemo(() => {
    const offsetIndex = (currentPage - 1) * itemsPerPage;
    return processedDataModel.slice(offsetIndex, offsetIndex + itemsPerPage);
  }, [processedDataModel, currentPage]);

  const maxTotalPages = Math.ceil(processedDataModel.length / itemsPerPage) || 1;

  return (
    <div className="shop-layout-container">
      
      {/* =======================================================
          LEFT SIDE: PRODUCT MANAGEMENT REGISTRATION FORM
          ======================================================= */}
      <section className="form-workspace-card">
        <div className="workspace-card-header">
          <h2>{editingId ? "Modify Existing Product" : "Create New Product"}</h2>
          <p>Fill out the data parameters below to populate your inventory ledger records.</p>
        </div>

        <form onSubmit={handleFormSubmission} className="premium-form-layout">
          <div className="form-input-element">
            <label>Product Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name" 
              className={errors.name ? 'invalid-field-alert' : ''}
            />
            {errors.name && <span className="input-err-msg">{errors.name}</span>}
          </div>

          <div className="form-input-element">
            <label>Description</label>
            <textarea 
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description" 
              className={errors.description ? 'invalid-field-alert' : ''}
            ></textarea>
            {errors.description && <span className="input-err-msg">{errors.description}</span>}
          </div>

          <div className="form-input-element">
            <label>Upload Product Image</label>
            
            <input 
              type="file" 
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/webp" 
              onChange={handleImageFileProcessing}
              style={{ display: 'none' }}
            />

            <div 
              className={`custom-upload-clickable-area ${errors.image ? 'invalid-field-alert' : ''} ${image ? 'has-asset' : ''}`}
              onClick={handleCustomUploadClick}
            >
              {!image ? (
                <div className="custom-upload-inner-placeholder">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                  <span className="action-link-text">Click to browse file directory</span>
                  <span className="format-hint-text">Supports: JPG, PNG, WEBP</span>
                </div>
              ) : (
                <div className="custom-upload-active-preview">
                  <div className="preview-meta-group">
                    <img src={image} alt="Upload thumb representation" />
                    <span className="success-upload-badge">Image Loaded Successfully</span>
                  </div>
                  <button type="button" className="asset-purge-action-btn" onClick={purgeSelectedImage}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    Remove Image
                  </button>
                </div>
              )}
            </div>
            {errors.image && <span className="input-err-msg">{errors.image}</span>}
          </div>

          <div className="form-input-row-split">
            <div className="form-input-element pricing-wrapper-element">
              <label>Price</label>
              <div className="currency-symbol-input-wrapper">
                <span className="input-currency-icon">₹</span>
                <input 
                  type="number" 
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price" 
                  className={errors.price ? 'invalid-field-alert' : ''}
                />
              </div>
              {errors.price && <span className="input-err-msg">{errors.price}</span>}
            </div>

            <div className="form-input-element">
              <label>Rating</label>
              <div className="star-matrix-picker-row">
                <div className="stars-button-group">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <button
                      key={index}
                      type="button"
                      className={`interactive-star-node ${ (hoverRating || rating) >= index ? 'gold-active' : '' }`}
                      onClick={() => { setRating(index); setErrors(prev => ({...prev, rating: ''})); }}
                      onMouseEnter={() => setHoverRating(index)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <span className="numeric-star-indicator-label">{rating > 0 ? `${rating}.0 / 5.0` : '0.0'}</span>
              </div>
              {errors.rating && <span className="input-err-msg">{errors.rating}</span>}
            </div>
          </div>

          <button type="submit" className={`premium-submit-button ${isLoading ? 'processing' : ''}`} disabled={isLoading}>
            {isLoading ? <div className="loading-spinner-component"></div> : <span>{editingId ? "Save Changes" : "Add Product"}</span>}
          </button>
        </form>
      </section>

      {/* =======================================================
          RIGHT SIDE: DATA TABLE WITH DUAL SCROLL CAPABILITIES
          ======================================================= */}
      <section className="table-workspace-card">
        <div className="table-header-control-bar">
          <div className="search-bar-input-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
              type="text" 
              placeholder="Search via product title metadata..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <span className="sorting-tip-indicator">Click columns to sort table data</span>
        </div>

        {/* Outer frame controlling horizontal and vertical constraints */}
        <div className="table-responsive-overflow-container">
          <table className="saas-premium-table">
            <thead>
              <tr>
                <th>Image</th>
                <th onClick={() => toggleTableSorting('name')} className="sort-trigger-th">
                   Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th>Description</th>
                <th onClick={() => toggleTableSorting('price')} className="sort-trigger-th">
                  Price {sortConfig.key === 'price' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => toggleTableSorting('rating')} className="sort-trigger-th">
                   Rating {sortConfig.key === 'rating' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th className="center-aligned-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visiblePaginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="table-empty-state-cell">
                    <div className="empty-state-container">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                      <h4>No records available</h4>
                      <p>Add a new product entry profile on the left pane to populate your inventory spreadsheet database.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                visiblePaginatedProducts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="table-thumbnail-frame">
                        <img src={p.image} alt={p.name} />
                      </div>
                    </td>
                    <td><span className="row-product-bold-title">{p.name}</span></td>
                    <td>
                      <div className="table-row-clamped-description" data-tooltip={p.description}>
                        {p.description}
                      </div>
                    </td>
                    <td>
                      <span className="price-badge-currency">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(p.price)}
                      </span>
                    </td>
                    <td>
                      <div className="table-row-stars-display" title={`${p.rating} Stars assigned`}>
                        <span className="gold-colored-stars">{"★".repeat(p.rating)}</span>
                        <span className="gray-muted-stars">{"★".repeat(5 - p.rating)}</span>
                      </div>
                    </td>
                    <td>
                      <div className="table-actions-button-cluster">
                        <button 
                          className="table-action-node edit-node-btn" 
                          title="Edit Row Entry"
                          onClick={() => setupFormForEditing(p)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button 
                          className="table-action-node delete-node-btn" 
                          title="Purge Row Entry"
                          onClick={() => processCatalogDeletion(p.id)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Control Module */}
        {processedDataModel.length > 0 && (
          <div className="table-pagination-footer-bar">
            <p>Showing <b>{((currentPage - 1) * itemsPerPage) + 1}</b> to <b>{Math.min(currentPage * itemsPerPage, processedDataModel.length)}</b> of {processedDataModel.length} items</p>
            <div className="pagination-button-controls-row">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="pagination-nav-step-btn"
              >
                Previous
              </button>
              <div className="pagination-numeric-badges-container">
                {Array.from({ length: maxTotalPages }, (_, idx) => idx + 1).map(pageNo => (
                  <button
                    key={pageNo}
                    className={`pagination-index-node ${currentPage === pageNo ? 'active-node' : ''}`}
                    onClick={() => setCurrentPage(pageNo)}
                  >
                    {pageNo}
                  </button>
                ))}
              </div>
              <button 
                disabled={currentPage === maxTotalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, maxTotalPages))}
                className="pagination-nav-step-btn"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );    
};

export default ShopPosting;