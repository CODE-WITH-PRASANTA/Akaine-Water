import React, { useEffect, useState } from "react";
import "./OurBlog.css";

import {
  FaCalendarAlt,
  FaUser,
  FaRegComment,
  FaFolderOpen,
  FaPlay,
  FaArrowRight,
  FaClock,
  FaTag
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import API, { IMG_URL } from "../../api/axios";

const OurBlog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH BLOGS =================
  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blog/all");
      if (res.data.success) {
        setBlogs(res.data.blogs.slice(0, 2));
      }
    } catch (error) {
      console.log("Our Blog Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Recent";
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const shortDescription = (text) => {
    if (!text) return "";
    return text.replace(/<[^>]*>?/gm, "").slice(0, 250) + "...";
  };

  const getReadTime = (text) => {
    if (!text) return "2 min read";
    const words = text.replace(/<[^>]*>?/gm, "").split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
  };

  return (
    <div className="OurBlog-container">
      {/* Section Header */}
      <div className="OurBlog-section-header">
        <div className="OurBlog-header-content">
          <span className="OurBlog-header-tag">OUR BLOG</span>
          <h2 className="OurBlog-header-title">Latest Insights & Stories</h2>
          <div className="OurBlog-header-divider">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className="OurBlog-header-subtitle">
            Discover our latest articles about water technology, innovation, and industry trends
          </p>
        </div>
      </div>

      <div className="OurBlog-wrapper">
        {loading ? (
          <div className="OurBlog-loader">
            <div className="OurBlog-loader-spinner"></div>
            <p>Loading articles...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="OurBlog-empty">
            <p>No blogs available</p>
          </div>
        ) : (
          blogs.map((blog, index) => (
            <article
              key={blog._id}
              className={`OurBlog-card ${index === 0 ? 'OurBlog-card-featured' : ''}`}
            >
              <div className="OurBlog-card-inner">
                <div className="OurBlog-image-wrapper">
                  <img
                    src={`${IMG_URL}${blog.image}`}
                    alt={blog.title}
                    className="OurBlog-card-img"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=450&fit=crop";
                    }}
                  />
                  <div className="OurBlog-badge">
                    <FaFolderOpen className="OurBlog-badge-icon" />
                    {blog.category || "OUR BLOG"}
                  </div>
                  <div className="OurBlog-image-overlay">
                    <button
                      className="OurBlog-quick-view"
                      onClick={() => navigate(`/blogdetails/${blog._id}`)}
                    >
                      <FaPlay />
                    </button>
                  </div>
                </div>

                <div className="OurBlog-card-body">
                  <div className="OurBlog-card-top">
                    <div className="OurBlog-card-category">
                      <FaTag className="OurBlog-category-icon" />
                      {blog.category || "General"}
                    </div>
                    <div className="OurBlog-card-readtime">
                      <FaClock className="OurBlog-readtime-icon" />
                      {getReadTime(blog.description)}
                    </div>
                  </div>

                  <h2 className="OurBlog-card-title">{blog.title}</h2>

                  <div className="OurBlog-card-meta">
                    <span className="OurBlog-meta-item">
                      <FaCalendarAlt className="OurBlog-meta-icon" />
                      {formatDate(blog.date)}
                    </span>
                    <span className="OurBlog-meta-separator">|</span>
                    <span className="OurBlog-meta-item">
                      <FaUser className="OurBlog-meta-icon" />
                      By {blog.name || "Admin"}
                    </span>
                    <span className="OurBlog-meta-separator">|</span>
                    <span className="OurBlog-meta-item">
                      <FaRegComment className="OurBlog-meta-icon" />
                      0 Comments
                    </span>
                  </div>

                  <p className="OurBlog-card-excerpt">
                    {shortDescription(blog.description)}
                  </p>

                  <button
                    className="OurBlog-readmore-btn"
                    onClick={() => navigate(`/blogdetails/${blog._id}`)}
                  >
                    <span className="OurBlog-readmore-text">Read More</span>
                    <FaArrowRight className="OurBlog-readmore-arrow" />
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default OurBlog;