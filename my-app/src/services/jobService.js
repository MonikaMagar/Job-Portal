// src/services/jobService.js
const API = "http://localhost:5000/api/jobs";
const token = localStorage.getItem("token");

export const fetchJobs = async () => {
  const res = await fetch(API);
  return res.json();
};

export const createJob = async (job) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(job),
  });
  return res.json();
};

export const deleteJob = async (id) => {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const updateJob = async (id, job) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(job),
  });
  return res.json();
};
