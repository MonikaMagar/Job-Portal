// // src/pages/AdminPage.js
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AdminPage.css';

// const AdminPage = () => {
//   const [jobs, setJobs] = useState([]); // ✅ Must be an array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const fetchJobs = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch('http://localhost:5000/api/jobs', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       console.log('Jobs fetched:', data); // Debug

//       if (Array.isArray(data)) {
//         setJobs(data);
//       } else if (Array.isArray(data.jobs)) {
//         setJobs(data.jobs);
//       } else {
//         setJobs([]);
//       }
//     } catch (err) {
//       setError('Failed to load jobs');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (jobId) => {
//     const confirm = window.confirm('Are you sure you want to delete this job?');
//     if (!confirm) return;

//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.ok) {
//         alert('✅ Job deleted');
//         fetchJobs(); // Reload jobs
//       } else {
//         const data = await res.json();
//         alert(`❌ ${data.msg || 'Delete failed'}`);
//       }
//     } catch (err) {
//       alert('❌ Error deleting job');
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   return (
//     <div className="admin-container">
//       <h2>🛠️ Admin Dashboard - Job Listings</h2>

//       {loading ? (
//         <p>Loading jobs...</p>
//       ) : error ? (
//         <p className="error">{error}</p>
//       ) : jobs.length === 0 ? (
//         <p>No jobs posted yet.</p>
//       ) : (
//         <div className="job-list">
//           {jobs.map((job) => (
//             <div className="job-card" key={job._id}>
//               <h3>{job.title}</h3>
//               <p>{job.description}</p>
//               <p><strong>Location:</strong> {job.location}</p>
//               <p><strong>Salary:</strong> {job.salary}</p>

//               <div className="btns">
//                 <button onClick={() => navigate(`/admin/edit/${job._id}`)}>✏️ Edit</button>
//                 <button className="delete" onClick={() => handleDelete(job._id)}>🗑️ Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminPage;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editJob, setEditJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    location: '',
    type: '',
    description: '',
    salaryRange: { min: '', max: '' }
  });

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setJobs(data);
      else if (data.jobs && Array.isArray(data.jobs)) setJobs(data.jobs);
      else setJobs([]);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'min' || name === 'max') {
      setFormData(prev => ({
        ...prev,
        salaryRange: { ...prev.salaryRange, [name]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddJob = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        alert('✅ Job added');
        setFormData({
          title: '',
          companyName: '',
          location: '',
          type: '',
          description: '',
          salaryRange: { min: '', max: '' }
        });
        fetchJobs();
        setShowForm(false);
      } else {
        alert('Error: ' + data.msg);
      }
    } catch (err) {
      console.error('Add job error:', err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJobs();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleEdit = (job) => {
    setEditJob(job);
    setShowForm(true);
    setFormData({
      title: job.title || '',
      companyName: job.companyName || '',
      location: job.location || '',
      type: job.type || '',
      description: job.description || '',
      salaryRange: {
        min: job.salaryRange?.min || '',
        max: job.salaryRange?.max || ''
      }
    });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${editJob._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        alert('✅ Job updated successfully');
        setEditJob(null);
        fetchJobs();
        setShowForm(false);
      } else {
        alert('Update failed: ' + data.msg);
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div className="admin-wrapper">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <button onClick={() => { setShowForm(!showForm); setEditJob(null); }}>
          {showForm ? 'Hide Job Form' : 'Add New Job'}
        </button>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <h1>Job Listings</h1>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="add-job-section">
            <h3>{editJob ? 'Edit Job' : 'Add Job'}</h3>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" />
            <input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" />
            <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
            <input name="min" value={formData.salaryRange.min} onChange={handleChange} placeholder="Min Salary" />
            <input name="max" value={formData.salaryRange.max} onChange={handleChange} placeholder="Max Salary" />

            <div className="btn-group">
              {editJob ? (
                <>
                  <button onClick={handleUpdate}>Update</button>
                  <button className="cancel-btn" onClick={() => { setEditJob(null); setShowForm(false); }}>Cancel</button>
                </>
              ) : (
                <button onClick={handleAddJob}>Add Job</button>
              )}
            </div>
          </div>
        )}

        {/* Job Cards */}
        <div className="job-card-container">
          {jobs.length === 0 ? (
            <p>No jobs found.</p>
          ) : (
            jobs.map((job) => (
              <div key={job._id} className="job-card">
                <h3>{job.title}</h3>
                <p><strong>Company:</strong> {job.companyName}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.type}</p>
                <p><strong>Description:</strong> {job.description}</p>
                <p><strong>Salary:</strong> ₹{job.salaryRange?.min} - ₹{job.salaryRange?.max}</p>
                <div className="btn-group">
                  <button onClick={() => handleEdit(job)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(job._id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
