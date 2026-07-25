const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const connectDB = require("./src/config/db");

// Routes Imports
const teamRoutes = require("./src/routes/teamRoutes");
const galleryRoutes = require("./src/routes/galleryRoutes");
const testimonialRoutes = require("./src/routes/testimonialRoutes");
const contactRoutes = require("./src/routes/contactRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const manageRoutes = require("./src/routes/manageRoutes");
const vehicleRoutes =require("./src/routes/vehicleRoutes");
const damageRoutes = require("./src/routes/damageRoutes");
const deliveryRoutes = require("./src/routes/deliveryRoutes");
const boysassigneRoutes = require("./src/routes/boyassigneRoutes");
// Connect Database
connectDB();

const app = express();

// ================= Middleware =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= Static Folder =================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= API Routes =================
app.use("/api/team", teamRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/manage", manageRoutes);
app.use("/api/damage", damageRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/boysassigne", boysassigneRoutes);

// ================= Home Route =================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Association Backend Running Successfully",
  });
});

// ================= 404 Route Handler =================
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ================= Global Error-Handling Middleware =================
// This catches file upload structure, Multer, limits, and runtime engine crashes
app.use((err, req, res, next) => {
  console.error("GLOBAL SERVER ERROR:", err);
  
  // If Multer error occurs (e.g. invalid file, file limit exceeded)
  if (err instanceof require("multer").MulterError) {
    return res.status(400).json({
      success: false,
      message: `File Upload Error: ${err.message}`
    });
  }

  // If we passed an error inside multer filter validation manually
  if (err.message && err.message.includes("Only JPG, JPEG, PNG")) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  // Fallback for any other unexpected system crashes
  res.status(500).json({
    success: false,
    message: err.message || "An unexpected system error occurred"
  });
});

// ================= Start Server =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}`);
});