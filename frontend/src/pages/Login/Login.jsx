import './Login.css';
import MainButton from '../../components/button/MainButton';
import React, { useState } from "react";
import hero from "../../assets/hero.jpg";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    // TODO: Replace with real auth logic (e.g. API call)
    console.log("Logging in with:", formData);
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      {/* Left panel — image placeholder */}
      <div className="auth-image-panel">
        <img src={hero} alt="JACKED hero" className="auth-hero-image" />
        <div className="auth-image-placeholder"></div>
      </div>
      {/* Right panel — form */}
      <div className="auth-form-panel">
        <div className="auth-card">
          <h1 className="brand-title">JACKED</h1>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="btn-primary">
              LOG IN
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
