const Job = require("../models/Job");

// ✅ Create Job (Admin Only)
exports.createJob = async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      createdBy: req.user._id
    });
    const saved = await job.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get All Jobs (Public with optional filters & pagination)
exports.getJobs = async (req, res) => {
  try {
    const {
      location,
      type,
      minSalary,
      maxSalary,
      search,
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    if (location) query.location = { $regex: location, $options: "i" };
    if (type) query.type = type;
    if (minSalary || maxSalary) {
      query["salaryRange.min"] = { $gte: Number(minSalary) || 0 };
      query["salaryRange.max"] = { $lte: Number(maxSalary) || Infinity };
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    const jobs = await Job.find(query)
      .sort({ postedDate: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Job.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      jobs
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get Job by ID (Public)
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Update Job (Admin Only)
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Delete Job (Admin Only)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.json({ msg: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// ✅ Apply to Job (Candidate)
exports.applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    // Check if already applied
    const alreadyApplied = job.appliedCandidates.some(candidate =>
      candidate.user.toString() === req.user._id.toString()
    );
    if (alreadyApplied) {
      return res.status(400).json({ msg: "You have already applied for this job" });
    }

    // Add application
    job.appliedCandidates.push({ user: req.user._id });
    await job.save();

    res.json({ msg: "Job application successful" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get Applied Jobs for Logged-in Candidate
exports.getAppliedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ 
      "appliedCandidates.user": req.user._id 
    }).sort({ postedDate: -1 });

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// Admin: Get Applicants for a Job
exports.getApplicants = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("appliedCandidates.user", "name email role"); // Only basic info

    if (!job) return res.status(404).json({ msg: "Job not found" });

    res.json({
      jobTitle: job.title,
      totalApplicants: job.appliedCandidates.length,
      applicants: job.appliedCandidates
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
