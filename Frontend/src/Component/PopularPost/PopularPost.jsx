import React, { useEffect, useState } from "react";
import "./PopularPost.css";

import {
  FaCalendarAlt,
  FaUser,
  FaRegComment,
  FaArrowRight,
  FaFolderOpen,
  FaRegEnvelopeOpen,
  FaSearch
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import API, { IMG_URL } from "../../api/axios";

const PopularPost = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH BLOGS =================
  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blog/all");
      if (res.data.success) {
        setBlogs(res.data.blogs);
      }
    } catch (error) {
      console.log("Popular blog error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ================= DATE FORMAT =================
  const formatDate = (date) => {
    if (!date) return "Recent";
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ================= TEXT CLEAN =================
  const shortText = (text) => {
    if (!text) return "";
    return text.replace(/<[^>]*>?/gm, "").slice(0, 220) + "...";
  };

  // Latest 3 sidebar posts
  const popularBlogs = blogs.slice(0, 3);

  return (
    <div className="PopularPost-container">
      <div className="PopularPost-layout-wrapper">
        <div className="PopularPost-grid">
          {/* ================= SIDEBAR ================= */}
          <aside className="PopularPost-sidebar">
            <div className="PopularPost-sidebar-inner">
              {/* POPULAR POST */}
              <div className="PopularPost-widget">
                <h3 className="PopularPost-widget-title">Popular Posts</h3>
                <div className="PopularPost-wave-divider" />

                <div className="PopularPost-list">
                  {loading ? (
                    <h4>Loading...</h4>
                  ) : (
                    popularBlogs.map((item) => (
                      <div
                        key={item._id}
                        className="PopularPost-item"
                        onClick={() => navigate(`/blogdetails/${item._id}`)}
                      >
                        <img
                          src={`${IMG_URL}${item.image}`}
                          alt={item.title}
                          className="PopularPost-item-img"
                        />
                        <div className="PopularPost-item-info">
                          <span className="PopularPost-item-date">
                            <FaCalendarAlt />
                            {formatDate(item.date)}
                          </span>
                          <h4 className="PopularPost-item-title">
                            {item.title}
                          </h4>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* TAG CLOUD */}
              <div className="PopularPost-widget">
                <h3 className="PopularPost-widget-title">Tag Cloud</h3>
                <div className="PopularPost-wave-divider" />
                <div className="PopularPost-tag-cloud">
                  {[
                    "Water",
                    "Technology",
                    "Delivery",
                    "Service",
                    "Quality",
                    "Industry",
                    "Expert",
                    "Business",
                  ].map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              </div>

              {/* SUBSCRIBE */}
              <div className="PopularPost-widget">
                <h3 className="PopularPost-widget-title">Subscribe Us</h3>
                <div className="PopularPost-wave-divider" />
                <div className="PopularPost-subscribe-card">
                  <div className="PopularPost-subscribe-icon-wrap">
                    <FaRegEnvelopeOpen className="PopularPost-subscribe-icon" />
                  </div>
                  <h3>Stay Updated</h3>
                  <p>Subscribe to get latest articles, news and updates.</p>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="PopularPost-subscribe-input"
                  />
                  <button className="PopularPost-subscribe-btn">
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* ================= MAIN BLOG ================= */}
          <main className="PopularPost-main-content">
            {loading ? (
              <h2>Loading Blogs...</h2>
            ) : blogs.length === 0 ? (
              <h2>No Blogs Available</h2>
            ) : (
              blogs.map((blog) => (
                <article key={blog._id} className="PopularPost-card">
                  <div className="PopularPost-card-image-wrapper">
                    <img
                      src={`${IMG_URL}${blog.image}`}
                      alt={blog.title}
                      className="PopularPost-card-img"
                    />
                    <div className="PopularPost-post-badge">
                      <FaFolderOpen />
                      {blog.category || "General"}
                    </div>
                  </div>

                  <div className="PopularPost-card-body">
                    <h2 className="PopularPost-card-title">{blog.title}</h2>

                    <div className="PopularPost-card-meta">
                      <span>
                        <FaCalendarAlt />
                        {formatDate(blog.date)}
                      </span>
                      <span>
                        <FaUser />
                        {blog.name || "Admin"}
                      </span>
                      <span>
                        <FaRegComment />
                        {blog.designation || "Blog"}
                      </span>
                    </div>

                    <p className="PopularPost-card-excerpt">
                      {shortText(blog.description)}
                    </p>

                    <button
                      className="PopularPost-readmore-link"
                      onClick={() => navigate(`/blogdetails/${blog._id}`)}
                    >
                      <FaArrowRight />
                      READ MORE
                    </button>
                  </div>
                </article>
              ))
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PopularPost;