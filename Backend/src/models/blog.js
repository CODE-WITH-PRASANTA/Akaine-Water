const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },

    designation: {
      type: String,
      required: [true, "Author designation is required"],
      trim: true,
    },

    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },

    category: {
      type: String,
      default: "",
      trim: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    description: {
      type: String,
      required: [true, "Blog description is required"],
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);