const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    facebook: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Team", teamSchema);