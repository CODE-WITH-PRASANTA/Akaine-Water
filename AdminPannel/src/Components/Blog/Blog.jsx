import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track ID for editing
  const [formData, setFormData] = useState({
    name: '', designation: '', title: '', category: '', date: '', description: '', image: ''
  });

  // Handle image conversion to Base64 (Without rendering a preview in the form)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update existing
      setBlogs(blogs.map(b => b.id === editingId ? { ...formData, id: editingId } : b));
      setEditingId(null);
    } else {
      // Create new
      setBlogs([...blogs, { ...formData, id: Date.now() }]);
    }
    setFormData({ name: '', designation: '', title: '', category: '', date: '', description: '', image: '' });
    
    // Reset file input element manually because it's an uncontrolled native element
    const fileInput = document.getElementById('blog-image-input');
    if (fileInput) fileInput.value = '';
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setFormData(blog);
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter(b => b.id !== id));
  };

  return (
    <div className="blog-container">
      <div className="form-section">
        <h2 className="section-title">{editingId ? 'Edit Blog' : 'Create Blog'}</h2>
        <form onSubmit={handleSubmit} className="blog-form">
          <label>Full Name <span className="required">*</span></label>
          <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          
          <label>Designation <span className="required">*</span></label>
          <input type="text" required value={formData.designation} onChange={(e) => setFormData({...formData, designation: e.target.value})} />
          
          <label>Title</label>
          <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          
          <label>Category</label>
          <input type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
          
          <label>Date</label>
          <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />

          {/* Image Upload Input (Preview Removed) */}
          <label>Upload Image</label>
          <input 
            id="blog-image-input"
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
          />

          <label>Description</label>
          <Editor
            apiKey='8hswbe7bfeeneui9eb9gjgsym8ku30nx5gwre9808ajdzniu'
            value={formData.description}
            init={{ height: 150, menubar: false }}
            onEditorChange={(content) => setFormData({...formData, description: content})}
          />
          
          <button type="submit">{editingId ? 'Update Blog' : 'Submit Blog'}</button>
        </form>
      </div>

      <div className="table-section">
        <h2 className="section-title">Blog Entries</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b.id}>
                  <td>
                    {b.image ? (
                      <img src={b.image} alt={b.title} className="table-thumbnail" />
                    ) : (
                      <span className="no-image-placeholder">No Image</span>
                    )}
                  </td>
                  <td>{b.name}</td>
                  <td>{b.designation}</td>
                  <td>{b.title}</td>
                  <td>{b.category}</td>
                  <td>{b.date}</td>
                  <td className="actions-cell">
                    <button className="btn-edit" onClick={() => handleEdit(b)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(b.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Blog;