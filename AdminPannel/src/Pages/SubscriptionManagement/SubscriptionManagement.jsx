import React, { useState } from 'react';
import './SubscriptionManagement.css';

const SubscriptionManagement = () => {
  const [formData, setFormData] = useState({
    planName: 'Monthly',
    price: '',
    facility: '',
    description: '',
    features: ''
  });

  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      planName: 'Yearly',
      price: '299',
      facility: '24/7 VIP Support',
      description: 'Full access to all premium features annually.',
      features: 'Unlimited Projects, Analytics, Priority Server'
    },
    {
      id: 2,
      planName: 'Monthly',
      price: '29',
      facility: 'Basic Support',
      description: 'Standard access for short-term projects.',
      features: '5 Projects, Basic Analytics'
    }
  ]);

  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.price || !formData.facility) {
      alert('Please fill in at least Price and Main Facility!');
      return;
    }

    const newSubscription = {
      id: Date.now(),
      ...formData
    };

    setSubscriptions((prev) => [newSubscription, ...prev]);

    // Reset Form
    setFormData({
      planName: 'Monthly',
      price: '',
      facility: '',
      description: '',
      features: ''
    });
  };

  // Delete Action
  const handleDelete = (id) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
    setOpenDropdownId(null);
  };

  // Toggle Action Dropdown
  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <div className="sub-mgmt">
      <h2 className="sub-mgmt__title">Subscription Management</h2>

      <div className="sub-mgmt__container">
        {/* Left Side: Form Section (50%) */}
        <section className="sub-mgmt__form-section">
          <h3 className="sub-mgmt__subtitle">Add New Plan</h3>
          <form className="sub-mgmt__form" onSubmit={handleSubmit}>
            <div className="sub-mgmt__form-group">
              <label htmlFor="planName" className="sub-mgmt__label">Plan Name</label>
              <select
                id="planName"
                name="planName"
                className="sub-mgmt__select"
                value={formData.planName}
                onChange={handleChange}
              >
                <option value="Yearly">Yearly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            <div className="sub-mgmt__form-group">
              <label htmlFor="price" className="sub-mgmt__label">Price ($)</label>
              <input
                type="number"
                id="price"
                name="price"
                className="sub-mgmt__input"
                placeholder="e.g. 99"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="sub-mgmt__form-group">
              <label htmlFor="facility" className="sub-mgmt__label">Main Facility</label>
              <input
                type="text"
                id="facility"
                name="facility"
                className="sub-mgmt__input"
                placeholder="e.g. 24/7 Customer Support"
                value={formData.facility}
                onChange={handleChange}
                required
              />
            </div>

            <div className="sub-mgmt__form-group">
              <label htmlFor="description" className="sub-mgmt__label">Description</label>
              <textarea
                id="description"
                name="description"
                className="sub-mgmt__textarea"
                rows="3"
                placeholder="Brief plan summary..."
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="sub-mgmt__form-group">
              <label htmlFor="features" className="sub-mgmt__label">Features</label>
              <textarea
                id="features"
                name="features"
                className="sub-mgmt__textarea"
                rows="3"
                placeholder="e.g. Feature 1, Feature 2, Feature 3"
                value={formData.features}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="sub-mgmt__submit-btn">
              Add Subscription Plan
            </button>
          </form>
        </section>

        {/* Right Side: Table Section (50%) */}
        <section className="sub-mgmt__table-section">
          <h3 className="sub-mgmt__subtitle">Subscription List</h3>
          
          {/* Wrapper specifically for horizontal scroll */}
          <div className="sub-mgmt__table-wrapper">
            <table className="sub-mgmt__table">
              <thead>
                <tr>
                  <th>Plan Name</th>
                  <th>Price</th>
                  <th>Main Facility</th>
                  <th>Description</th>
                  <th>Features</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.length > 0 ? (
                  subscriptions.map((sub) => (
                    <tr key={sub.id}>
                      <td><span className="sub-mgmt__badge">{sub.planName}</span></td>
                      <td>${sub.price}</td>
                      <td>{sub.facility}</td>
                      <td className="sub-mgmt__cell-truncate">{sub.description || '-'}</td>
                      <td className="sub-mgmt__cell-truncate">{sub.features || '-'}</td>
                      <td className="sub-mgmt__action-cell">
                        <div className="sub-mgmt__dropdown-container">
                          <button
                            type="button"
                            className="sub-mgmt__action-btn"
                            onClick={() => toggleDropdown(sub.id)}
                          >
                            •••
                          </button>
                          {openDropdownId === sub.id && (
                            <div className="sub-mgmt__dropdown-menu">
                              <button
                                className="sub-mgmt__dropdown-item"
                                onClick={() => alert(`Edit plan ${sub.id}`)}
                              >
                                Edit
                              </button>
                              <button
                                className="sub-mgmt__dropdown-item sub-mgmt__dropdown-item--danger"
                                onClick={() => handleDelete(sub.id)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="sub-mgmt__no-data">
                      No subscriptions added yet.
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

export default SubscriptionManagement;