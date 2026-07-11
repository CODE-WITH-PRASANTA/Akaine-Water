import React, { useState } from 'react';
import { FaTachometerAlt, FaPhotoVideo, FaCalendarAlt, FaUsers, FaAddressBook, FaHistory, FaPlusCircle } from 'react-icons/fa';
import './BlogPosting.css';

const BlogPosting = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    image: '', date: '', name: '', designation: '', title: '', description: '', category: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data, formData]);
    setFormData({ image: '', date: '', name: '', designation: '', title: '', description: '', category: '' });
  };

  return (
    <div className="BlogPosting">
      <nav className="BlogPosting__sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><FaTachometerAlt /> Dashboard</li>
          <li><FaPhotoVideo /> Gallery Management</li>
          <li><FaPhotoVideo /> Video Management</li>
          <li><FaCalendarAlt /> Event Management</li>
          <li className="active"><FaUsers /> Team Management</li>
          <li><FaAddressBook /> Contact Management</li>
          <li><FaHistory /> Archivment Posting</li>
        </ul>
      </nav>

      <main className="BlogPosting__main">
        <h1><FaUsers /> Team Management</h1>
        <div className="BlogPosting__container">
          <section className="BlogPosting__form">
            <h3>Add Team Member</h3>
            <form onSubmit={handleSubmit}>
              <input type="file" name="image" onChange={handleChange} />
              <input type="date" name="date" value={formData.date} onChange={handleChange} placeholder="Date" />
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
              <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="Designation" />
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description (Tiny mice) Textesion." />
              <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
              <button type="submit">Submit</button>
            </form>
          </section>

          <section className="BlogPosting__list">
            <h3>Team Members List</h3>
            <table>
              <thead>
                <tr>
                  <th>Upload image</th><th>Date</th><th>Name</th><th>Designation</th><th>Title</th><th>Description</th><th>Category</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td><img src={item.image} alt="team" width="50" /></td>
                    <td>{item.date}</td><td>{item.name}</td><td>{item.designation}</td><td>{item.title}</td><td>{item.description}</td><td>{item.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
};

export default BlogPosting;