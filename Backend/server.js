const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const connectDB = require("./src/config/db");

// Routes

const teamRoutes = require("./src/routes/teamRoutes");
const galleryRoutes = require("./src/routes/galleryRoutes");
const testimonialRoutes = require(
  "./src/routes/testimonialRoutes");
const contactRoutes= require("./src/routes/contactRoutes");
const blogRoutes = require(
  "./src/routes/blogRoutes"
);

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
app.use(
  "/api/testimonial",
  testimonialRoutes
);
app.use("/api/contact", contactRoutes);
app.use(
  "/api/blog",
  blogRoutes
);



// ================= Home Route =================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Association Backend Running Successfully",
  });
});

// ================= 404 Route =================
// Express 5 Compatible
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ================= Start Server =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}`);
});