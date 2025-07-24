// src/components/JobForm.js
import React, { useState, useEffect } from 'react';

const JobForm = ({ onSubmit, jobToEdit }) => {
  const [job, setJob] = useState({
    title: '',
    description: '',
    companyName: '',
    location: '',
    salaryRange: { min: '', max: '' },
    type: 'Full-time',
  });

  useEffect(() => {
    if (jobToEdit) setJob(jobToEdit);
  }, [jobToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'min' || name === 'max') {
      setJob({ ...job, salaryRange: { ...job.salaryRange, [name]: value } });
    } else {
      setJob({ ...job, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(job);
    setJob({
      title: '',
      description: '',
      companyName: '',
      location: '',
      salaryRange: { min: '', max: '' },
      type: 'Full-time',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={job.title} onChange={handleChange} placeholder="Title" required />
      <input name="description" value={job.description} onChange={handleChange} placeholder="Description" required />
      <input name="companyName" value={job.companyName} onChange={handleChange} placeholder="Company" required />
      <input name="location" value={job.location} onChange={handleChange} placeholder="Location" required />
      <input name="min" value={job.salaryRange.min} onChange={handleChange} placeholder="Min Salary" required />
      <input name="max" value={job.salaryRange.max} onChange={handleChange} placeholder="Max Salary" required />
      <select name="type" value={job.type} onChange={handleChange}>
        <option>Full-time</option>
        <option>Part-time</option>
        <option>Internship</option>
      </select>
      <button type="submit">{jobToEdit ? "Update Job" : "Add Job"}</button>
    </form>
  );
};

export default JobForm;
