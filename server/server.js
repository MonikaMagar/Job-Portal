// server.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// Routes
app.use("/api/auth", require("./routes/authRoutes"));       // 🔐 Auth routes
app.use("/api/jobs", require("./routes/jobRoutes"));        // 💼 Job routes
app.use("/api/apply", require("./routes/applicationRoutes"));// 📄 Application routes

// Root Route
app.get("/", (req, res) => {
  res.send("Job Portal API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
