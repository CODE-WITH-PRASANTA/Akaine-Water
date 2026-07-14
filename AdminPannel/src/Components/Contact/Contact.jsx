import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import "./Contact.css";

const Contact = () => {
  const [submissions, setSubmissions] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await API.get("/contact");

      if (response.data.success) {
        setSubmissions(response.data.data);
      }
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setEditingId(null);

    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return alert("Name is required");
    }

    if (!formData.email.trim()) {
      return alert("Email is required");
    }

    try {
      if (editingId) {
        await API.put(
          `/contact/${editingId}`,
          formData
        );
      } else {
        await API.post(
          "/contact",
          formData
        );
      }

      await fetchContacts();

      resetForm();

    } catch (error) {
      console.log("Submit Error:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);

    setFormData({
      name: item.name || "",
      phone: item.phone || "",
      email: item.email || "",
      subject: item.subject || "",
      message: item.message || "",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this record entry?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/contact/${id}`);

      await fetchContacts();

      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  return (
    <div className="contact-admin-container">
      <h2 className="contact-admin-main-title">
        Contact Form Management Dashboard
      </h2>

      <div className="contact-admin-layout">

        {/* LEFT FORM */}
        <div className="contact-form-section">
          <h3 className="contact-section-title">
            {editingId
              ? "Modify System Entry"
              : "Create Contact Entry"}
          </h3>

          <form
            className="contact-admin-form"
            onSubmit={handleSubmit}
          >
            <div className="contact-form-group">
              <label className="contact-input-label">
                Your Name
              </label>

              <input
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
              <label className="contact-input-label">
                Phone Number
              </label>

              <input
                className="contact-field-input contact-field-phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+9-500-025-200"
              />
            </div>

            <div className="contact-form-group">
              <label className="contact-input-label">
                Your Email
              </label>

              <input
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
              <label className="contact-input-label">
                Subject
              </label>

              <input
                className="contact-field-input contact-field-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter dynamic subject context"
              />
            </div>

            <div className="contact-form-group">
              <label className="contact-input-label">
                Message
              </label>

              <textarea
                className="contact-field-textarea contact-field-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message log details here..."
                rows="4"
              />
            </div>

            <button
              type="submit"
              className="contact-submit-btn"
            >
              {editingId
                ? "Update Record Data"
                : "Send Message Log"}
            </button>

            {editingId && (
              <button
                type="button"
                className="contact-cancel-btn"
                onClick={resetForm}
              >
                Cancel Action
              </button>
            )}
          </form>
        </div>

        {/* RIGHT TABLE */}
        <div className="contact-table-section">
          <h3 className="contact-section-title">
            Submitted Database Logs
          </h3>

          <div className="contact-table-responsive-wrapper">
            <table className="contact-admin-table">
              <thead>
                <tr className="contact-table-header-row">
                  <th>Name</th>
                  <th>Contact Info</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {submissions.length > 0 ? (
                  submissions.map((item) => (
                    <tr
                      key={item._id}
                      className="contact-table-body-row"
                    >
                      <td className="contact-table-td contact-td-name">
                        <strong>{item.name}</strong>
                      </td>

                      <td className="contact-table-td contact-td-info">
                        <span className="contact-td-email-block">
                          {item.email}
                        </span>

                        <span className="contact-td-phone-block">
                          {item.phone}
                        </span>
                      </td>

                      <td className="contact-table-td contact-td-subject">
                        {item.subject || "-"}
                      </td>

                      <td
                        className="contact-table-td contact-td-message"
                        title={item.message}
                      >
                        {item.message || "-"}
                      </td>

                      <td className="contact-table-td contact-td-actions">
                        <div className="contact-action-btn-group">
                          <button
                            className="contact-action-edit-btn"
                            onClick={() =>
                              handleEdit(item)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="contact-action-delete-btn"
                            onClick={() =>
                              handleDelete(item._id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="contact-table-td-empty"
                    >
                      No matching records found in
                      admin storage.
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