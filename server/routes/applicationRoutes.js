const express = require("express");
const {
  applyForJob,
  getMyApplications,
  getApplicantsForJob
} = require("../controllers/applicationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Candidate applies for a job
router.post("/:jobId", protect, applyForJob);

// Candidate views their applications
router.get("/my", protect, getMyApplications);

// Admin views applicants for a job
router.get("/job/:jobId", protect, getApplicantsForJob);

module.exports = router;
