import React, { useEffect, useState, useRef } from "react";
import API, { IMG_URL } from "../../api/axios";
import "./Blog.css";
import { Editor } from "@tinymce/tinymce-react";

const getImageUrl = (image) => {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return `${IMG_URL}${image.startsWith("/") ? "" : "/"}${image}`;
};

const Blog = () => {
  const initialState = {
    name: "",
    designation: "",
    title: "",
    category: "",
    date: "",
    description: "",
    image: null,
  };

  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [preview, setPreview] = useState("");
  
  // Use a ref to cleanly reset the file input field
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchBlogs();

    const editBlog = localStorage.getItem("editBlog");
    if (editBlog) {
      const blog = JSON.parse(editBlog);
      setEditingId(blog._id);
      setFormData({
        name: blog.name || "",
        designation: blog.designation || "",
        title: blog.title || "",
        category: blog.category || "",
        date: blog.date || "",
        description: blog.description || "",
        image: null,
      });
      setPreview(getImageUrl(blog.image));
      localStorage.removeItem("editBlog");
    }
  }, []);

  // ================= FETCH BLOGS =================
  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blog/all");
      if (res.data.success) {
        setBlogs(res.data.blogs);
      }
    } catch (error) {
      console.error("Fetch Blogs Error:", error);
    }
  };

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= IMAGE CHANGE =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Frontend Validation
    if (!editingId && !formData.image) {
      return alert("Please upload a blog image.");
    }
    if (!formData.description || formData.description.trim() === "") {
      return alert("Please enter a blog description.");
    }

    try {
      const data = new FormData();
      
      // Append text fields
      data.append("name", formData.name);
      data.append("designation", formData.designation);
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("date", formData.date);
      data.append("description", formData.description);

      // Append image only if it exists (user selected a new one)
      if (formData.image) {
        data.append("image", formData.image);
      }

      // 2. API Call
      if (editingId) {
        await API.put(`/blog/update/${editingId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Blog Updated Successfully");
      } else {
        await API.post("/blog/create", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Blog Created Successfully");
      }

      // 3. Reset Form
      fetchBlogs();
      setFormData(initialState);
      setEditingId(null);
      setPreview("");
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clears the file input UI
      }

    } catch (error) {
      console.error("Submit Error:", error);
      alert(error.response?.data?.message || "Failed to save blog. Please check your data.");
    }
  };

  // ================= EDIT =================
  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setFormData({
      name: blog.name || "",
      designation: blog.designation || "",
      title: blog.title || "",
      category: blog.category || "",
      date: blog.date || "",
      description: blog.description || "",
      image: null, // Keep null so we don't accidentally send a string URL to Multer
    });

    setPreview(getImageUrl(blog.image));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/blog/delete/${id}`);
      alert("Blog Deleted Successfully");
      fetchBlogs();
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete blog.");
    }
  };

  return (
    <div className="blog-container">
      {/* FORM SECTION */}
      <div className="form-section">
        <h2>{editingId ? "Update Blog" : "Create Blog"}</h2>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Designation</label>
          <input type="text" name="designation" value={formData.designation} onChange={handleChange} required />

          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />

          <label>Category</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />

          <label>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />

          <label>Upload Image</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            ref={fileInputRef} // Attached ref here for clean resets
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              style={{
                marginTop: "10px",
                borderRadius: "10px",
                objectFit: "cover",
                height: "120px",
                width: "auto",
                maxWidth: "100%"
              }}
            />
          )}

          <label>Description</label>
          <Editor
            apiKey="jeq7g2k84sqpi9364o8x9ptqf09aoesaq8jxmp49dl4sh57z"
            value={formData.description}
            init={{
              height: 400,
              menubar: true,
              plugins: [
                "advlist", "autolink", "lists", "link", "image", "charmap",
                "preview", "anchor", "searchreplace", "visualblocks", "code",
                "fullscreen", "insertdatetime", "media", "table", "help", "wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic underline forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | removeformat | code fullscreen",
              content_style: "body { font-family:Poppins,sans-serif; font-size:14px }",
            }}
            onEditorChange={(content) => {
              setFormData((prev) => ({
                ...prev,
                description: content,
              }));
            }}
          />

          <button type="submit" style={{ marginTop: "20px", cursor: "pointer" }}>
            {editingId ? "Update Blog" : "Submit Blog"}
          </button>
          
          {editingId && (
            <button 
              type="button" 
              onClick={() => {
                setEditingId(null);
                setFormData(initialState);
                setPreview("");
                if(fileInputRef.current) fileInputRef.current.value = "";
              }} 
              style={{ marginTop: "20px", marginLeft: "10px", backgroundColor: "#6c757d" }}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* TABLE SECTION */}
      <div className="table-section">
        <h2>Blog List</h2>
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
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>
                      <img
                        src={getImageUrl(blog.image)}
                        alt={blog.title}
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid #ddd",
                        }}
                        onError={(e) => {
                          e.target.src = "https://placehold.co/70x70?text=No+Image";
                        }}
                      />
                    </td>
                    <td>{blog.name}</td>
                    <td>{blog.designation}</td>
                    <td>{blog.title}</td>
                    <td>{blog.category}</td>
                    <td>{blog.date}</td>
                    <td>
                      <div
                        dangerouslySetInnerHTML={{ __html: blog.description }}
                        style={{ maxHeight: "100px", overflow: "hidden", textOverflow: "ellipsis" }}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleEdit(blog)}>Edit</button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        style={{ marginLeft: "8px", backgroundColor: "#dc3545", color: "white" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                    No Blogs Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Blog;