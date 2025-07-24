// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
// import JobsPage from './pages/JobsPage'; // You must create this page
import AdminPage from './pages/AdminPage'; // Optional, for admin role
import CandidateDashboard from './pages/CandidateDashboard';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        {/* <Route path="/jobs" element={<JobsPage />} /> ✅ This is required */}
        <Route path="/admin" element={<AdminPage />} /> {/* ✅ Optional for admin */}
        <Route path="/dashboard" element={<CandidateDashboard/>} /> {/* ✅ Optional for admin */}
      </Routes>
    </Router>
  );
}

export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import LoginForm from "./components/LoginForm";
// import RegisterForm from "./components/RegisterForm";
// import AdminPage from "./pages/AdminPage";
// import UserDashboard from "../src/pages/CandidateDashboard";
// // import Home from "./pages/Home";

// const App = () => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role"); // store user's role on login

//   const PrivateRoute = ({ children, allowedRole }) => {
//     if (!token) return <Navigate to="/login" />;
//     if (allowedRole && role !== allowedRole) return <Navigate to="/" />;
//     return children;
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* <Route path="/" element={<Home />} /> */}
//         <Route path="/" element={<LoginForm />} />
//         <Route path="/register" element={<RegisterForm />} />

//         <Route
//           path="/admin"
//           element={
//             <PrivateRoute allowedRole="admin">
//               <AdminPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute allowedRole="candidate">
//               <UserDashboard />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
