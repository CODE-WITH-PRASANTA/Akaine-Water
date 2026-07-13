const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");

const {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// Create Blog
router.post(
  "/",
  upload.single("image"),
  createBlog
);

// Get All Blogs
router.get("/", getBlogs);

// Get Single Blog
router.get("/:id", getSingleBlog);

// Update Blog
router.put(
  "/:id",
  upload.single("image"),
  updateBlog
);

// Delete Blog
router.delete("/:id", deleteBlog);

module.exports = router;