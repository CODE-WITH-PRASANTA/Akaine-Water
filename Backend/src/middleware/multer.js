const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Upload folder path (relative to this file, points to /uploads/blog at the root)
const uploadPath = path.join(__dirname, "../../uploads/blog");

// Create folder recursively if it does not exist
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 999999)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// Image validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    // Pass custom error to be handled by express error-handler
    cb(new Error("Only JPG, JPEG, PNG, and WEBP images are allowed"), false);
  }
};

// Export configured multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = upload;