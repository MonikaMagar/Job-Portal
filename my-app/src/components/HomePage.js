import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Find Your Dream Job Today</h1>
          <p>Connect with top companies and explore exciting career opportunities.</p>
          <button onClick={() => navigate("/login")}>Get Started</button>
        </div>
        <div className="hero-image">
          <img
            src="https://img.freepik.com/free-vector/job-hunting-concept-illustration_114360-476.jpg"
            alt="Job Hunt"
          />
        </div>
      </header>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png" alt="Candidate" />
            <h3>Easy Application</h3>
            <p>Apply to jobs with just a few clicks and get notified instantly.</p>
          </div>
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" alt="Company" />
            <h3>Top Companies</h3>
            <p>We partner with the best startups and enterprises looking for talent.</p>
          </div>
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/4213/4213410.png" alt="Security" />
            <h3>Secure & Fast</h3>
            <p>Your data is protected. Enjoy a smooth and fast experience.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to land your next job?</h2>
        <p>Join our community of job seekers and get noticed by top recruiters.</p>
        <button onClick={() => navigate("/register")}>Register Now</button>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Job Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
