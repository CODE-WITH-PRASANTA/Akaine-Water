import React, { useState } from 'react';
import './DeliveryId.css';

const DeliveryId = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    aadharNo: '',
    address: '',
    email: '',
    offerLetter: null,
    profileImage: null,
    profileImagePreview: '',
    salary: '',
    password: '',
    newPassword: ''
  });

  const [deliveryList, setDeliveryList] = useState([
    {
      id: 1,
      name: 'John Doe',
      phone: '9876543210',
      aadharNo: '[Aadhaar Redacted]',
      address: '123 Main St, City',
      email: 'john@example.com',
      offerLetterName: 'Offer_Letter.pdf',
      profileImagePreview: 'https://via.placeholder.com/40',
      salary: '500',
    }
  ]);

  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      if (name === 'profileImage') {
        const imagePreviewUrl = URL.createObjectURL(file);
        setFormData((prev) => ({
          ...prev,
          profileImage: file,
          profileImagePreview: imagePreviewUrl
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: file }));
      }
    }
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.newPassword) {
      alert('Password and New Password do not match!');
      return;
    }

    const newItem = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      aadharNo: '[Aadhaar Redacted]',
      address: formData.address,
      email: formData.email,
      offerLetterName: formData.offerLetter ? formData.offerLetter.name : 'N/A',
      profileImagePreview: formData.profileImagePreview || 'https://via.placeholder.com/40',
      salary: formData.salary
    };

    setDeliveryList((prev) => [newItem, ...prev]);

    // Reset Form
    setFormData({
      name: '',
      phone: '',
      aadharNo: '',
      address: '',
      email: '',
      offerLetter: null,
      profileImage: null,
      profileImagePreview: '',
      salary: '',
      password: '',
      newPassword: ''
    });

    e.target.reset();
  };

  // Toggle Action Menu
  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  // Delete Item
  const handleDelete = (id) => {
    setDeliveryList(deliveryList.filter((item) => item.id !== id));
    setOpenDropdownId(null);
  };

  return (
    <div className="delivery-id">
      <h2 className="delivery-id__main-title">Delivery Partner Management</h2>

      <div className="delivery-id__container">
        {/* Form Section (50%) */}
        <section className="delivery-id__form-section">
          <h3 className="delivery-id__subtitle">Add Partner Details</h3>
          <form className="delivery-id__form" onSubmit={handleSubmit}>
            <div className="delivery-id__form-group">
              <label className="delivery-id__label">Full Name</label>
              <input
                type="text"
                name="name"
                className="delivery-id__input"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="delivery-id__form-row">
              <div className="delivery-id__form-group">
                <label className="delivery-id__label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="delivery-id__input"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="delivery-id__form-group">
                <label className="delivery-id__label">Aadhaar Number</label>
                <input
                  type="text"
                  name="aadharNo"
                  className="delivery-id__input"
                  placeholder="Enter Aadhaar number"
                  value={formData.aadharNo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="delivery-id__form-group">
              <label className="delivery-id__label">Email ID</label>
              <input
                type="email"
                name="email"
                className="delivery-id__input"
                placeholder="Enter mail ID"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="delivery-id__form-group">
              <label className="delivery-id__label">Address</label>
              <textarea
                name="address"
                className="delivery-id__textarea"
                rows="2"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="delivery-id__form-row">
              <div className="delivery-id__form-group">
                <label className="delivery-id__label">Upload Profile Image</label>
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  className="delivery-id__file-input"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <div className="delivery-id__form-group">
                <label className="delivery-id__label">Offer Letter (Optional)</label>
                <input
                  type="file"
                  name="offerLetter"
                  accept=".pdf,.doc,.docx"
                  className="delivery-id__file-input"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="delivery-id__form-group">
              <label className="delivery-id__label">Salary Per Day ($)</label>
              <input
                type="number"
                name="salary"
                className="delivery-id__input"
                placeholder="Enter salary per day"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>

            <div className="delivery-id__form-row">
              <div className="delivery-id__form-group">
                <label className="delivery-id__label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="delivery-id__input"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="delivery-id__form-group">
                <label className="delivery-id__label">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  className="delivery-id__input"
                  placeholder="Confirm password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="delivery-id__submit-btn">
              Submit Details
            </button>
          </form>
        </section>

        {/* Table Section (50%) */}
        <section className="delivery-id__table-section">
          <h3 className="delivery-id__subtitle">Registered Partners</h3>

          <div className="delivery-id__table-wrapper">
            <table className="delivery-id__table">
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Aadhaar No</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Salary/Day</th>
                  <th>Offer Letter</th>
                  <th className="delivery-id__th-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deliveryList.length > 0 ? (
                  deliveryList.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.profileImagePreview}
                          alt="Profile"
                          className="delivery-id__avatar"
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.aadharNo}</td>
                      <td>{item.email}</td>
                      <td className="delivery-id__cell-truncate">{item.address}</td>
                      <td>${item.salary}</td>
                      <td>{item.offerLetterName}</td>
                      <td className="delivery-id__action-cell">
                        <div className="delivery-id__dropdown-container">
                          <button
                            type="button"
                            className={`delivery-id__action-btn ${
                              openDropdownId === item.id ? 'delivery-id__action-btn--active' : ''
                            }`}
                            onClick={() => toggleDropdown(item.id)}
                            aria-label="Actions menu"
                          >
                            &#8942;
                          </button>

                          {/* Dropdown position: Above the button */}
                          {openDropdownId === item.id && (
                            <div className="delivery-id__dropdown-menu">
                              <button
                                className="delivery-id__dropdown-item"
                                onClick={() => {
                                  alert(`Edit record #${item.id}`);
                                  setOpenDropdownId(null);
                                }}
                              >
                                <span className="delivery-id__dropdown-icon">&#9998;</span> Edit
                              </button>
                              <button
                                className="delivery-id__dropdown-item delivery-id__dropdown-item--danger"
                                onClick={() => handleDelete(item.id)}
                              >
                                <span className="delivery-id__dropdown-icon">&#128465;</span> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="delivery-id__no-data">
                      No records available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DeliveryId;