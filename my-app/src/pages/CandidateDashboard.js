// // src/pages/CandidateDashboard.js
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./CandidateDashboard.css";

// const CandidateDashboard = () => {
//   const [jobs, setJobs] = useState([]);
//   const [filters, setFilters] = useState({
//     location: "",
//     type: "",
//     minSalary: "",
//     maxSalary: "",
//     search: ""
//   });

//   const navigate = useNavigate();

//   const fetchJobs = async () => {
//     let query = Object.entries(filters)
//       .filter(([_, val]) => val)
//       .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
//       .join("&");

//     const res = await fetch(`http://localhost:5000/api/jobs?${query}`);
//     const data = await res.json();
//     if (res.ok) setJobs(data.jobs);
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const applyToJob = async (jobId) => {
//     const token = localStorage.getItem("token");
//     const resumeLink = prompt("Enter Resume Link:");
//     const coverLetter = prompt("Enter Cover Letter (optional):");

//     if (!resumeLink) return alert("Resume link is required");

//     const res = await fetch(`http://localhost:5000/api/apply/${jobId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({ resumeLink, coverLetter })
//     });

//     const data = await res.json();
//     if (res.ok) alert("✅ Applied successfully");
//     else alert("❌ " + data.msg);
//   };

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="candidate-dashboard">
//       <h2>Available Jobs</h2>

//       <div className="filters">
//         <input name="location" placeholder="Location" onChange={handleFilterChange} />
//         <select name="type" onChange={handleFilterChange}>
//           <option value="">Type</option>
//           <option>Full-time</option>
//           <option>Part-time</option>
//           <option>Internship</option>
//         </select>
//         <input name="minSalary" placeholder="Min Salary" type="number" onChange={handleFilterChange} />
//         <input name="maxSalary" placeholder="Max Salary" type="number" onChange={handleFilterChange} />
//         <input name="search" placeholder="Search by title or description" onChange={handleFilterChange} />
//         <button onClick={fetchJobs}>Apply Filters</button>
//       </div>

//       <div className="job-list">
//         {jobs.map((job) => (
//           <div className="job-card" key={job._id}>
//             <h3>{job.title}</h3>
//             <p><strong>Company:</strong> {job.companyName}</p>
//             <p><strong>Location:</strong> {job.location}</p>
//             <p><strong>Type:</strong> {job.type}</p>
//             <p><strong>Salary:</strong> ₹{job.salaryRange.min} - ₹{job.salaryRange.max}</p>
//             <button onClick={() => applyToJob(job._id)}>Apply</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CandidateDashboard;
// src/pages/CandidateDashboard.jsximport React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
 import { useNavigate } from "react-router-dom";
import "./CandidateDashboard.css";

const CandidateDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    minSalary: "",
    maxSalary: "",
    search: "",
  });

  const [view, setView] = useState("available");
  const [showModal, setShowModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [resumeLink, setResumeLink] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/login");
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    let query = Object.entries(filters)
      .filter(([_, val]) => val)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");

    const res = await fetch(`http://localhost:5000/api/jobs?${query}`);
    const data = await res.json();
    if (res.ok) setJobs(data.jobs);
  };

  const fetchAppliedJobs = async () => {
    const res = await fetch("http://localhost:5000/api/jobs/applied", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) setAppliedJobs(data.appliedJobs || []);
  };

  useEffect(() => {
    if (view === "applied") fetchAppliedJobs();
  }, [view]);

  const openApplyModal = (jobId) => {
    setSelectedJobId(jobId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setResumeLink("");
    setCoverLetter("");
  };

  const submitApplication = async () => {
    if (!resumeLink) return alert("Resume link is required");
    const res = await fetch(`http://localhost:5000/api/apply/${selectedJobId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ resumeLink, coverLetter }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("✅ Applied successfully");
      closeModal();
    } else {
      alert("❌ " + data.msg);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="profile">
          <div className="avatar">{user?.name?.charAt(0)}</div>
          <h3>{user?.name || "Candidate"}</h3>
        </div>
        <nav>
          <button onClick={() => setView("available")}> Available Jobs</button> <br></br>
          <button onClick={() => setView("applied")}>Applied Jobs</button><br></br>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </aside>

      <main className="main-content">
        {view === "available" && (
          <>
            <h2>Available Jobs</h2>
            <div className="filters">
              <input name="location" placeholder="Location" onChange={handleFilterChange} />
              <select name="type" onChange={handleFilterChange}>
                <option value="">Type</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Internship</option>
              </select>
              <input name="minSalary" placeholder="Min Salary" type="number" onChange={handleFilterChange} />
              <input name="maxSalary" placeholder="Max Salary" type="number" onChange={handleFilterChange} />
              <input name="search" placeholder="Search job title" onChange={handleFilterChange} />
              <button onClick={fetchJobs}>Apply Filters</button>
            </div>

            <div className="job-list">
              {jobs.map((job) => (
                <div className="job-card" key={job._id}>
                  <h3>{job.title}</h3>
                  <p><strong>Company:</strong> {job.companyName}</p>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Type:</strong> {job.type}</p>
                  <p><strong>Salary:</strong> ₹{job.salaryRange.min} - ₹{job.salaryRange.max}</p>
                  <button onClick={() => openApplyModal(job._id)}>Apply</button>
                </div>
              ))}
            </div>
          </>
        )}

        {view === "applied" && (
          <>
            <h2>My Applications</h2>
            <div className="job-list">
              {appliedJobs.length === 0 ? (
                <p>No applications yet.</p>
              ) : (
                appliedJobs.map((job) => (
                  <div className="job-card" key={job._id}>
                    <h3>{job.title}</h3>
                    <p><strong>Company:</strong> {job.companyName}</p>
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Status:</strong> {job.status || "Applied"}</p>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </main>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Apply to Job</h3>
            <input
              type="text"
              placeholder="Resume Link"
              value={resumeLink}
              onChange={(e) => setResumeLink(e.target.value)}
            />
            <textarea
              placeholder="Cover Letter (optional)"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={submitApplication}>Submit</button>
              <button onClick={closeModal} className="cancel">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateDashboard;
