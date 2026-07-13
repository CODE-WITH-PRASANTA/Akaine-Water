const express = require("express");

const router = express.Router();

const upload = require("../middleware/multer");

const {
  createTestimonial,
  getTestimonials,
  getSingleTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require(
  "../controllers/testimonialController"
);

router.post(
  "/",
  upload.single("image"),
  createTestimonial
);

router.get("/", getTestimonials);

router.get(
  "/:id",
  getSingleTestimonial
);

router.put(
  "/:id",
  upload.single("image"),
  updateTestimonial
);

router.delete(
  "/:id",
  deleteTestimonial
);

module.exports = router;