const Application = require("../models/Application");
const Job = require("../models/Job");

exports.applyForJob = async (req, res) => {
  const { resumeLink, coverLetter } = req.body;
  const jobId = req.params.jobId;

  try {
    // Prevent admin from applying
    if (req.user.role === "admin") {
      return res.status(403).json({ msg: "Admins cannot apply for jobs" });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    // Optional: Prevent duplicate applications
    const alreadyApplied = await Application.findOne({
      jobId,
      candidateId: req.user._id
    });
    if (alreadyApplied) {
      return res.status(400).json({ msg: "You already applied for this job" });
    }

    const application = new Application({
      jobId,
      candidateId: req.user._id,
      resumeLink,
      coverLetter
    });

    const savedApp = await application.save();
    res.status(201).json(savedApp);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


exports.getMyApplications = async (req, res) => {
  try {
    if (req.user.role !== "candidate") {
      return res.status(403).json({ msg: "Only candidates can view their applications" });
    }

    const apps = await Application.find({ candidateId: req.user._id })
      .populate("jobId", "title companyName location type");

    res.json(apps);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// View applicants for a job (Admin only)
exports.getApplicantsForJob = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admins can view applicants" });
    }

    const jobId = req.params.jobId;
    const applicants = await Application.find({ jobId })
      .populate("candidateId", "name email")
      .populate("jobId", "title");

    res.json(applicants);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


