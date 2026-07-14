const Team = require("../models/team");
const fs = require("fs");
const path = require("path");

const createTeam = async (req, res) => {
  try {
    const { fullName, designation, facebook, linkedin, instagram } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const team = await Team.create({
      fullName,
      designation,
      facebook,
      linkedin,
      instagram,
      image: req.file.filename,
    });

    res.status(201).json({
      success: true,
      message: "Team member created successfully",
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllTeam = async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: teams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    let image = team.image;

    if (req.file) {
      const oldImage = path.join("uploads", team.image);

      if (fs.existsSync(oldImage)) {
        fs.unlinkSync(oldImage);
      }

      image = req.file.filename;
    }

    const updated = await Team.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Team updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    const imagePath = path.join("uploads", team.image);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Team.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Team member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTeam,
  getAllTeam,
  getSingleTeam,
  updateTeam,
  deleteTeam,
};