const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
} = require("../controllers/blogController");

// Routes
router.post("/create", upload.single("image"), createBlog);
router.get("/all", getBlogs);
router.put("/update/:id", upload.single("image"), updateBlog);
router.delete("/delete/:id", deleteBlog);
router.get("/:id", getBlogById); // GET SINGLE (Keep Last)

module.exports = router;