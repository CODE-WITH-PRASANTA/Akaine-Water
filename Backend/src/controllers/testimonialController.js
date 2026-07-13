const Testimonial = require("../models/testimonial");
const fs = require("fs");
const path = require("path");

exports.createTestimonial = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const testimonial = await Testimonial.create({
      name: req.body.name,
      address: req.body.address,
      description: req.body.description,
      rating: req.body.rating,
      image: req.file.filename,
    });

    res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingleTestimonial = async (req, res) => {
  try {
    const testimonial =
      await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const testimonial =
      await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    let image = testimonial.image;

    if (req.file) {
      const oldImage = path.join(
        __dirname,
        "..",
        "uploads",
        "testimonial",
        testimonial.image
      );

      if (fs.existsSync(oldImage)) {
        fs.unlinkSync(oldImage);
      }

      image = req.file.filename;
    }

    const updated =
      await Testimonial.findByIdAndUpdate(
        req.params.id,
        {
          name:
            req.body.name || testimonial.name,

          address:
            req.body.address ||
            testimonial.address,

          description:
            req.body.description ||
            testimonial.description,

          rating:
            req.body.rating ||
            testimonial.rating,

          image,
        },
        {
          returnDocument: "after",
        }
      );

    res.status(200).json({
      success: true,
      message:
        "Testimonial updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial =
      await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    const imagePath = path.join(
      __dirname,
      "..",
      "uploads",
      "testimonial",
      testimonial.image
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Testimonial.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Testimonial deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};