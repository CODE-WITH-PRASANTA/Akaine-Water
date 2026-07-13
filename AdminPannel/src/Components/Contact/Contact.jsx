import React, { useState } from 'react';
import './Contact.css'; // Importing the separate CSS file

const Contact = () => {
  // Initial structural sample data
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      name: 'Saroj Sahoo',
      phone: '+9-500-025-200',
      email: 'support@emailaddress.com',
      subject: 'VPN Query',
      message: 'Our service allows you to hide your geolocation, bypass blocking...',
    },
  ]);

  // Form State fields matching your component data exactly
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [editingId, setEditingId] = useState(null);

  // Handle Input Changes across all elements
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form handling (Submission & Table storage)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Name and Email fields are required!');
      return;
    }

    if (editingId) {
      setSubmissions(
        submissions.map((item) =>
          item.id === editingId ? { ...item, ...formData } : item
        )
      );
      setEditingId(null);
    } else {
      setSubmissions([...submissions, { id: Date.now(), ...formData }]);
    }

    setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      phone: item.phone,
      email: item.email,
      subject: item.subject,
      message: item.message,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this record entry?')) {
      setSubmissions(submissions.filter((item) => item.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      }
    }
  };

  return (
    <div className="contact-admin-container">
      <h2 className="contact-admin-main-title">Contact Form Management Dashboard</h2>
      
      <div className="contact-admin-layout">
        
        {/* LEFT COMPONENT SIDE: INPUT FORM (50% WIDTH) */}
        <div className="contact-form-section">
          <h3 className="contact-section-title">
            {editingId ? 'Modify System Entry' : 'Create Contact Entry'}
          </h3>
          
          <form className="contact-admin-form" onSubmit={handleSubmit}>
            <div className="contact-form-group">
              <label className="contact-input-label" htmlFor="contact-input-name">Your Name</label>
              <input
                id="contact-input-name"
                className="contact-field-input contact-field-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="contact-form-group">
              <label className="contact-input-label" htmlFor="contact-input-phone">Phone Number</label>
              <input
                id="contact-input-phone"
                className="contact-field-input contact-field-phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+9-500-025-200"
              />
            </div>

            <div className="contact-form-group">
              <label className="contact-input-label" htmlFor="contact-input-email">Your Email</label>
              <input
                id="contact-input-email"
                className="contact-field-input contact-field-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="support@emailaddress.com"
                required
              />
            </div>

            <div className="contact-form-group">
              <label className="contact-input-label" htmlFor="contact-input-subject">Subject</label>
              <input
                id="contact-input-subject"
                className="contact-field-input contact-field-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter dynamic subject context"
              />
            </div>

            <div className="contact-form-group">
              <label className="contact-input-label" htmlFor="contact-input-message">Message</label>
              <textarea
                id="contact-input-message"
                className="contact-field-textarea contact-field-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message log details here..."
                rows="4"
              />
            </div>

            <button type="submit" className="contact-submit-btn">
              {editingId ? 'Update Record Data' : 'Send Message Log'}
            </button>
            
            {editingId && (
              <button 
                type="button" 
                className="contact-cancel-btn"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
                }}
              >
                Cancel Action
              </button>
            )}
          </form>
        </div>

        {/* RIGHT COMPONENT SIDE: DATA LOG TABLE (50% WIDTH) */}
        <div className="contact-table-section">
          <h3 className="contact-section-title">Submitted Database Logs</h3>
          <div className="contact-table-responsive-wrapper">
            <table className="contact-admin-table">
              <thead>
                <tr className="contact-table-header-row">
                  <th className="contact-table-th">Name</th>
                  <th className="contact-table-th">Contact Info</th>
                  <th className="contact-table-th">Subject</th>
                  <th className="contact-table-th">Message</th>
                  <th className="contact-table-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.length > 0 ? (
                  submissions.map((item) => (
                    <tr key={item.id} className="contact-table-body-row">
                      <td className="contact-table-td contact-td-name"><strong>{item.name}</strong></td>
                      <td className="contact-table-td contact-td-info">
                        <span className="contact-td-email-block">{item.email}</span>
                        <span className="contact-td-phone-block">{item.phone}</span>
                      </td>
                      <td className="contact-table-td contact-td-subject">{item.subject || '-'}</td>
                      <td className="contact-table-td contact-td-message" title={item.message}>
                        {item.message || '-'}
                      </td>
                      <td className="contact-table-td contact-td-actions">
                        <div className="contact-action-btn-group">
                          <button 
                            className="contact-action-edit-btn" 
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </button>
                          <button 
                            className="contact-action-delete-btn" 
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="contact-table-td-empty">
                      No matching records found in admin storage.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;