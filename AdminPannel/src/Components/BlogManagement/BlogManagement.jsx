import React, { useState, useEffect } from "react";
import "./BlogManagement.css";
import API, { IMG_URL } from "../../api/axios";

const ITEMS_PER_PAGE = 8;

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.closest(".BlogManagement-three-dots-btn") ||
        event.target.closest(".BlogManagement-dropdown-menu")
      ) {
        return;
      }

      setActiveDropdown(null);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blog/all");

      if (res.data.success) {
        setBlogs(res.data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDropdown = (id, e) => {
    e.stopPropagation();

    setActiveDropdown(
      activeDropdown === id ? null : id
    );
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/blog/delete/${id}`);

      fetchBlogs();

      setActiveDropdown(null);
    } catch (error) {
      console.log(error);
    }
  };

 const handleEdit = (blog) => {
  localStorage.setItem(
    "editBlog",
    JSON.stringify(blog)
  );

  window.location.href = "/blog";
};

  const handlePublish = async (id) => {
    alert(`Publish feature for ${id}`);
    setActiveDropdown(null);
  };

  const totalPages = Math.ceil(
    blogs.length / ITEMS_PER_PAGE
  );

  const indexOfLastItem =
    currentPage * ITEMS_PER_PAGE;

  const indexOfFirstItem =
    indexOfLastItem - ITEMS_PER_PAGE;

  const currentItems = blogs.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="BlogManagement-container">
      <header className="BlogManagement-header">
        <h1 className="BlogManagement-title">
          Blog Management
        </h1>

        <div className="BlogManagement-view-toggle-buttons">
          <button
            className={`BlogManagement-toggle-btn ${
              viewMode === "grid"
                ? "BlogManagement-toggle-btn-active"
                : ""
            }`}
            onClick={() => {
              setViewMode("grid");
              setCurrentPage(1);
            }}
          >
            Grid View
          </button>

          <button
            className={`BlogManagement-toggle-btn ${
              viewMode === "list"
                ? "BlogManagement-toggle-btn-active"
                : ""
            }`}
            onClick={() => {
              setViewMode("list");
              setCurrentPage(1);
            }}
          >
            List View
          </button>
        </div>
      </header>

      <main className="BlogManagement-content">
        {viewMode === "grid" ? (
          <div className="BlogManagement-grid-view-layout">
            {currentItems.map((item) => (
              <div
                key={item._id}
                className="BlogManagement-grid-card"
              >
                <div
                  className="BlogManagement-card-image-bg"
                  style={{
                    backgroundImage: `linear-gradient(
                      rgba(0,0,0,0.2),
                      rgba(0,0,0,0.7)
                    ),
                    url(${IMG_URL}${item.image})`,
                  }}
                >
                  <div className="BlogManagement-actions-menu-container">
                    <button
                      className="BlogManagement-three-dots-btn"
                      onClick={(e) =>
                        toggleDropdown(
                          item._id,
                          e
                        )
                      }
                    >
                      ⋮
                    </button>

                    {activeDropdown === item._id && (
                      <div className="BlogManagement-dropdown-menu">
                        <button
                         onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>

                        <button
                          className="BlogManagement-delete-action"
                          onClick={() =>
                            handleDelete(
                              item._id
                            )
                          }
                        >
                          Delete
                        </button>

                        <button
                          onClick={() =>
                            handlePublish(
                              item._id
                            )
                          }
                        >
                          Publish
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="BlogManagement-card-overlay-text">
                    <h3 className="BlogManagement-item-name">
                      {item.name}
                    </h3>

                    <p className="BlogManagement-item-designation">
                      {item.designation}
                    </p>

                    <span className="BlogManagement-item-date">
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="BlogManagement-list-view-layout">
            <div className="BlogManagement-list-table-wrapper">
              <table className="BlogManagement-list-table">
                <thead>
                  <tr>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={`${IMG_URL}${item.image}`}
                          alt={item.name}
                          width="60"
                          height="60"
                          style={{
                            borderRadius: "50%",
                            objectFit:
                              "cover",
                          }}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/60";
                          }}
                        />
                      </td>

                      <td>{item.name}</td>

                      <td>
                        {item.designation}
                      </td>

                      <td>{item.date}</td>

                      <td>
                        <button
                          onClick={() =>
                            handleEdit(
                              item._id
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              item._id
                            )
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {totalPages > 1 && (
        <footer className="BlogManagement-pagination-container">
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.max(prev - 1, 1)
              )
            }
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentPage(
                    index + 1
                  )
                }
              >
                {index + 1}
              </button>
            )
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(
                  prev + 1,
                  totalPages
                )
              )
            }
            disabled={
              currentPage === totalPages
            }
          >
            Next
          </button>
        </footer>
      )}
    </div>
  );
};

export default BlogManagement;