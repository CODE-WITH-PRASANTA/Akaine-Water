const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    date: { type: String, required: true },
    name: { type: String, required: true },
    designation: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);