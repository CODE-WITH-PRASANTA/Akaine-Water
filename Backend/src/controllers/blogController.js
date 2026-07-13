const Blog = require("../models/blog");
const fs = require("fs");
const path = require("path");

exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      name: req.body.name,
      designation: req.body.designation,
      title: req.body.title,
      category: req.body.category,
      date: req.body.date,
      description: req.body.description,
      image: req.file ? req.file.filename : "",
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(
      req.params.id
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(
      req.params.id
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    let image = blog.image;

    if (req.file) {
      const oldImage = path.join(
        __dirname,
        "..",
        "uploads",
        "blog",
        blog.image
      );

      if (fs.existsSync(oldImage)) {
        fs.unlinkSync(oldImage);
      }

      image = req.file.filename;
    }

    const updatedBlog =
      await Blog.findByIdAndUpdate(
        req.params.id,
        {
          name:
            req.body.name || blog.name,

          designation:
            req.body.designation ||
            blog.designation,

          title:
            req.body.title || blog.title,

          category:
            req.body.category ||
            blog.category,

          date:
            req.body.date || blog.date,

          description:
            req.body.description ||
            blog.description,

          image,
        },
        {
          returnDocument: "after",
        }
      );

    res.status(200).json({
      success: true,
      message:
        "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(
      req.params.id
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.image) {
      const imagePath = path.join(
        __dirname,
        "..",
        "uploads",
        "blog",
        blog.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Blog.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};