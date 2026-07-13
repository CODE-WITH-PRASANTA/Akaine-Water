const express = require("express");
const router = express.Router();

const {
  createGallery,
  getGallery,
  getSingleGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/galleryController");

const upload = require("../middleware/multer");

router.post(
  "/",
  upload.single("image"),
  createGallery
);

router.get("/", getGallery);

router.get("/:id", getSingleGallery);

router.put(
  "/:id",
  upload.single("image"),
  updateGallery
);

router.delete("/:id", deleteGallery);

module.exports = router;