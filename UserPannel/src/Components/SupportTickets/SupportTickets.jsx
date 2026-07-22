import React, { useState } from 'react';
import './SupportTickets.css';
import { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiChevronRight, 
  FiChevronLeft, 
  FiX, 
  FiUploadCloud,
  FiMessageSquare,
  FiBox,
  FiCreditCard,
  FiTruck,
  FiUser
} from 'react-icons/fi';

const ticketsData = [
  {
    id: 'Ticket #T-501',
    title: 'Failed Delivery',
    date: 'Oct 15, 2023',
    time: '10:30 AM',
    status: 'Resolved',
    category: 'delivery',
    icon: <FiMessageSquare className="supporttickets-item-icon blue" />
  },
  {
    id: 'Ticket #T-459',
    title: 'Damaged Product',
    date: 'Oct 12, 2023',
    time: '02:15 PM',
    status: 'In Progress',
    category: 'product',
    icon: <FiBox className="supporttickets-item-icon orange" />
  },
  {
    id: 'Ticket #T-458',
    title: 'Payment Issue',
    date: 'Oct 10, 2023',
    time: '11:45 AM',
    status: 'Open',
    category: 'payment',
    icon: <FiCreditCard className="supporttickets-item-icon purple" />
  },
  {
    id: 'Ticket #T-457',
    title: 'Change Delivery Address',
    date: 'Oct 08, 2023',
    time: '09:20 AM',
    status: 'Resolved',
    category: 'delivery',
    icon: <FiTruck className="supporttickets-item-icon green" />
  },
  {
    id: 'Ticket #T-456',
    title: 'General Inquiry',
    date: 'Oct 05, 2023',
    time: '04:30 PM',
    status: 'Closed',
    category: 'general',
    icon: <FiUser className="supporttickets-item-icon pink" />
  }
];

const SupportTickets = () => {
  const [showNewTicket, setShowNewTicket] = useState(true);
  const [activeTab, setActiveTab] = useState('All Tickets');

  return (
    <div className="supporttickets-wrapper">
      <div className={`supporttickets-container ${showNewTicket ? 'split-view' : 'full-view'}`}>
        
        {/* Left Section: Support Tickets List */}
        <div className="supporttickets-left-panel">
          {/* Header */}
          <div className="supporttickets-header">
            <div>
              <h2 className="supporttickets-title">Support Tickets</h2>
              <p className="supporttickets-subtitle">Track and manage all your support requests</p>
            </div>
            {!showNewTicket && (
              <button 
                className="supporttickets-new-btn"
                onClick={() => setShowNewTicket(true)}
              >
                <FiPlus /> New Ticket
              </button>
            )}
            {showNewTicket && (
              <button className="supporttickets-new-btn disabled-btn">
                <FiPlus /> New Ticket
              </button>
            )}
          </div>

          {/* Status Tabs */}
          <div className="supporttickets-tabs-bar">
            <button 
              className={`supporttickets-tab ${activeTab === 'All Tickets' ? 'active' : ''}`}
              onClick={() => setActiveTab('All Tickets')}
            >
              All Tickets <span className="supporttickets-tab-count blue-bg">8</span>
            </button>
            <button 
              className={`supporttickets-tab ${activeTab === 'Open' ? 'active' : ''}`}
              onClick={() => setActiveTab('Open')}
            >
              Open <span className="supporttickets-tab-count yellow-bg">3</span>
            </button>
            <button 
              className={`supporttickets-tab ${activeTab === 'In Progress' ? 'active' : ''}`}
              onClick={() => setActiveTab('In Progress')}
            >
              In Progress <span className="supporttickets-tab-count light-blue-bg">2</span>
            </button>
            <button 
              className={`supporttickets-tab ${activeTab === 'Resolved' ? 'active' : ''}`}
              onClick={() => setActiveTab('Resolved')}
            >
              Resolved <span className="supporttickets-tab-count green-bg">2</span>
            </button>
            <button 
              className={`supporttickets-tab ${activeTab === 'Closed' ? 'active' : ''}`}
              onClick={() => setActiveTab('Closed')}
            >
              Closed <span className="supporttickets-tab-count gray-bg">1</span>
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="supporttickets-filter-bar">
            <div className="supporttickets-search-box">
              <input type="text" placeholder="Search tickets..." />
              <FiSearch className="supporttickets-search-icon" />
            </div>

            <div className="supporttickets-dropdown-wrapper">
              <select className="supporttickets-select">
                <option value="all">All Categories</option>
                <option value="delivery">Delivery</option>
                <option value="product">Product</option>
                <option value="payment">Payment</option>
              </select>
            </div>

            <button className="supporttickets-filter-icon-btn" aria-label="Filter options">
              <FiFilter />
            </button>
          </div>

          {/* Ticket List */}
          <div className="supporttickets-list">
            {ticketsData.map((ticket, index) => (
              <div key={index} className="supporttickets-card">
                <div className="supporttickets-card-left">
                  <div className={`supporttickets-icon-wrapper ${ticket.category}`}>
                    {ticket.icon}
                  </div>
                  <div className="supporttickets-info">
                    <h4 className="supporttickets-id">{ticket.id}</h4>
                    <p className="supporttickets-subject">{ticket.title}</p>
                    <span className="supporttickets-meta">
                      Raised on {ticket.date} • {ticket.time}
                    </span>
                  </div>
                </div>

                <div className="supporttickets-card-right">
                  <span className={`supporttickets-badge ${ticket.status.toLowerCase().replace(' ', '-')}`}>
                    {ticket.status}
                  </span>
                  <FiChevronRight className="supporttickets-arrow" />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Footer */}
          <div className="supporttickets-footer">
            <span className="supporttickets-showing-text">Showing 1 to 5 of 8 tickets</span>
            <div className="supporttickets-pagination">
              <button className="supporttickets-page-arrow" aria-label="Previous page"><FiChevronLeft /></button>
              <button className="supporttickets-page-num active">1</button>
              <button className="supporttickets-page-num">2</button>
              <button className="supporttickets-page-arrow" aria-label="Next page"><FiChevronRight /></button>
            </div>
          </div>
        </div>

        {/* Right Section: New Support Ticket Form */}
        {showNewTicket && (
          <div className="supporttickets-right-panel">
            <div className="supporttickets-form-header">
              <h3>New Support Ticket</h3>
              <button 
                className="supporttickets-close-btn"
                onClick={() => setShowNewTicket(false)}
                aria-label="Close form"
              >
                <FiX />
              </button>
            </div>

            <form className="supporttickets-form" onSubmit={(e) => e.preventDefault()}>
              <div className="supporttickets-form-group">
                <label>Category</label>
                <select className="supporttickets-input select-input">
                  <option value="">Select Category</option>
                  <option value="delivery">Delivery</option>
                  <option value="product">Product</option>
                  <option value="payment">Payment</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div className="supporttickets-form-group">
                <label>Subject</label>
                <input 
                  type="text" 
                  className="supporttickets-input" 
                  placeholder="Enter a short subject" 
                />
              </div>

              <div className="supporttickets-form-group">
                <label>Order ID (Optional)</label>
                <input 
                  type="text" 
                  className="supporttickets-input" 
                  placeholder="Enter your order ID" 
                />
                <span className="supporttickets-help-text">Helps us assist you faster</span>
              </div>

              <div className="supporttickets-form-group">
                <label>Description</label>
                <textarea 
                  className="supporttickets-textarea" 
                  placeholder="Please describe your issue in detail..."
                  rows="4"
                ></textarea>
                <span className="supporttickets-help-text">Provide as much detail as possible</span>
              </div>

              <div className="supporttickets-form-group">
                <label>Upload Attachments (Optional)</label>
                <div className="supporttickets-upload-box">
                  <FiUploadCloud className="supporttickets-upload-icon" />
                  <p className="supporttickets-upload-text">
                    <span className="supporttickets-link">Click to upload</span> or drag and drop
                  </p>
                  <span className="supporttickets-upload-hint">PNG, JPG, PDF up to 5MB</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="supporttickets-form-actions">
                <button 
                  type="button" 
                  className="supporttickets-btn-cancel"
                  onClick={() => setShowNewTicket(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="supporttickets-btn-submit">
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default SupportTickets;