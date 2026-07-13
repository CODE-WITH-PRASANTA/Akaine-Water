const express = require("express");

const router = express.Router();

const upload = require(
  "../middleware/multer"
);

const {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} = require(
  "../controllers/blogController"
);

router.post(
  "/",
  upload.single("image"),
  createBlog
);

router.get("/", getBlogs);

router.get("/:id", getSingleBlog);

router.put(
  "/:id",
  upload.single("image"),
  updateBlog
);

router.delete(
  "/:id",
  deleteBlog
);

module.exports = router;