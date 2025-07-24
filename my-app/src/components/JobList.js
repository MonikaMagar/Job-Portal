// src/components/JobList.js
import React from 'react';

const JobList = ({ jobs, onEdit, onDelete }) => {
  return (
    <div>
      <h3>📋 All Jobs</h3>
      {jobs.map((job) => (
        <div key={job._id} style={styles.card}>
          <h4>{job.title}</h4>
          <p><b>Company:</b> {job.companyName}</p>
          <p><b>Type:</b> {job.type}</p>
          <p><b>Salary:</b> ₹{job.salaryRange.min} - ₹{job.salaryRange.max}</p>
          <button onClick={() => onEdit(job)}>✏️ Edit</button>
          <button onClick={() => onDelete(job._id)}>🗑️ Delete</button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  card: {
    background: '#fff',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
};

export default JobList;
