const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");

const {
  createTeam,
  getAllTeam,
  getSingleTeam,
  updateTeam,
  deleteTeam,
} = require("../controllers/teamController");

router.post(
  "/",
  upload.single("image"),
  createTeam
);

router.get("/", getAllTeam);

router.get("/:id", getSingleTeam);

router.put(
  "/:id",
  upload.single("image"),
  updateTeam
);

router.delete("/:id", deleteTeam);

module.exports = router;