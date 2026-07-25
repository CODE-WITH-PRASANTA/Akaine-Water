const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Upload folder path (relative to this file, points to /uploads at the root)
const uploadPath = path.join(__dirname, "../../uploads");

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

// File validation for profileImage (images) and offerLetter (documents)
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "profileImage") {
    const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, JPEG, PNG, and WEBP images are allowed for profile image"), false);
    }
  } else if (file.fieldname === "offerLetter") {
    const allowedDocTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    if (allowedDocTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, and DOCX files are allowed for offer letter"), false);
    }
  } else {
    cb(null, true);
  }
};

// Export configured multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = upload;