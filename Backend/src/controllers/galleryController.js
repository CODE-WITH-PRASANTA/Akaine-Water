const Gallery = require("../models/gallery");
const fs = require("fs");

const createGallery = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const gallery = await Gallery.create({
      imageName: req.body.imageName,
      image: req.file.filename,
    });

    res.status(201).json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    res.status(200).json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    let image = gallery.image;

    if (req.file) {
      const oldImage = `uploads/gallery/${gallery.image}`;

      if (fs.existsSync(oldImage)) {
        fs.unlinkSync(oldImage);
      }

      image = req.file.filename;
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      {
        imageName: req.body.imageName || gallery.imageName,
        image,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedGallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    const imagePath = `uploads/gallery/${gallery.image}`;

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Gallery deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createGallery,
  getGallery,
  getSingleGallery,
  updateGallery,
  deleteGallery,
};