const Blog = require("../models/blog");

// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    console.log("BLOG BODY:", req.body);
    console.log("BLOG FILE:", req.file);

    // 1. Check if file was uploaded successfully
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Blog image is required"
      });
    }

    const { date, name, designation, title, description, category } = req.body;

    // 2. Pre-validate text fields
    if (!date || !name || !designation || !title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields (date, name, designation, title, description, category) are required."
      });
    }

    // 3. Save to database
    const blog = await Blog.create({
      image: `/uploads/blog/${req.file.filename}`,
      date,
      name,
      designation,
      title,
      description,
      category
    });

    return res.status(201).json({
      success: true,
      blog
    });

  } catch (error) {
    console.error("CREATE BLOG ERROR:", error);
    return res.status(error.name === "ValidationError" ? 400 : 500).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL BLOGS
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      blogs
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET SINGLE BLOG
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    return res.status(200).json({
      success: true,
      blog
    });
  } catch (error) {
    return res.status(error.name === "CastError" ? 400 : 500).json({
      success: false,
      message: error.name === "CastError" ? "Invalid Blog ID format" : error.message
    });
  }
};

// UPDATE BLOG
exports.updateBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    // Protect values from turning into undefined
    blog.name = req.body.name || blog.name;
    blog.designation = req.body.designation || blog.designation;
    blog.title = req.body.title || blog.title;
    blog.category = req.body.category || blog.category;
    blog.date = req.body.date || blog.date;
    blog.description = req.body.description || blog.description;

    if (req.file) {
      blog.image = `/uploads/blog/${req.file.filename}`;
    }

    await blog.save();

    return res.status(200).json({
      success: true,
      blog
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE BLOG
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
       return res.status(404).json({ success: false, message: "Blog not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};