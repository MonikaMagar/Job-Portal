# 🧑‍💼 Job Portal - Backend + Frontend

A full-stack Job Portal Application with **Node.js**, **Express**, **MongoDB**, and **React**. Built as part of an 8-hour test to demonstrate backend + frontend integration, authentication, job CRUD, and candidate application workflows.

---

## 📦 Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** React, Bootstrap (or plain CSS)
- **Authentication:** JWT, bcrypt
- **Validation & Middleware:** Custom Express Middleware
- **API Testing:** Postman
- **Bonus:** Token expiration, folder structure (MVC), pagination, filters

---

## 🔐 Features

### 🔑 Authentication
- Register: `name`, `email`, `password`, `role (admin | candidate)`
- Login: JWT-based login
- Bcrypt password hashing
- Middleware: `protect` (auth), `isAdmin` (authorization)

### 📃 Job Management (Admin Only)
- Create, Read, Update, Delete Jobs
- Job Fields:
  - Title
  - Description
  - Company Name
  - Location
  - Salary Range
  - Type (Full-time, Part-time, Internship, etc.)
  - Posted Date (auto)

### 🧑‍💻 Apply for Jobs
- Candidates can apply (admins cannot)
- Application Fields:
  - Job ID
  - Candidate ID
  - Resume Link
  - Cover Letter (optional)
  - Applied Date

### 🔍 Job Listing with Filters
- Anyone can view all jobs
- Filters:
  - Location
  - Type
  - Salary Range (min-max)
  - Keyword (search in title/description)
- Pagination and sorting by posted date

---

## 🌐 Frontend Pages

- Login Page (stores JWT)
- Admin Dashboard
  - Add/Edit/Delete Jobs
  - View Applicants
- Candidate Dashboard
  - View Jobs
  - Apply for Job
  - See Applied Jobs
- Job Filters (location, type, etc.)

---
##Output :
<img width="1909" height="869" alt="Screenshot 2025-07-25 050218" src="https://github.com/user-attachments/assets/cd41df52-930c-4c62-95e2-2ab66e33f068" />

<img width="1235" height="756" alt="Screenshot 2025-07-25 050256" src="https://github.com/user-attachments/assets/6ec99f4f-498b-4ad9-b9b4-d8139af8e4ba" />

<img width="900" height="755" alt="Screenshot 2025-07-25 050315" src="https://github.com/user-attachments/assets/3d24b7f2-053d-42f5-9a4d-35d6b3e4632c" />

<img width="1916" height="881" alt="Screenshot 2025-07-25 050339" src="https://github.com/user-attachments/assets/e9411fe9-a2db-4761-8cbd-c76ff26f4160" />

<img width="1909" height="883" alt="Screenshot 2025-07-25 050609" src="https://github.com/user-attachments/assets/5c0e80e9-03ab-46eb-ae41-0b314622307d" />

<img width="1907" height="873" alt="Screenshot 2025-07-25 050646" src="https://github.com/user-attachments/assets/9a963145-557f-4cc2-b195-bcb73a9e212b" />


<img width="1308" height="686" alt="Screenshot 2025-07-25 050710" src="https://github.com/user-attachments/assets/67638b5c-33e1-44af-88e5-9eae9baa9431" />

<img width="1891" height="874" alt="Screenshot 2025-07-25 050735" src="https://github.com/user-attachments/assets/da886390-0418-4b50-849b-8aa928a6cb33" />

## 🚀 Setup Instructions

### Backend
```bash
cd backend
npm install
npm run dev  # Runs on http://localhost:5000





