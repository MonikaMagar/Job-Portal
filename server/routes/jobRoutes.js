const express = require("express");
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob
} = require("../controllers/jobController"); // ✅ path must match your project structure

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/roleMiddleware");

const jobController = require("../controllers/jobController");
const router = express.Router();

// ✅ Public Routes
router.get("/", getJobs);               // All jobs
router.get("/:id", getJobById);         // Job by ID

// ✅ Admin Routes
router.post("/", protect, isAdmin, createJob);
router.put("/:id", protect, isAdmin, updateJob);
router.delete("/:id", protect, isAdmin, deleteJob);


// Candidate: View Applied Jobs
router.get("/applied", protect, jobController.getAppliedJobs);

// Admin: View Applicants for a Job
router.get("/:id/applicants", protect, isAdmin, jobController.getApplicants);

module.exports = router;
