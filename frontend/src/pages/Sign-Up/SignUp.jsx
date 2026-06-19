import React, { useState } from "react";
import hero from "../../assets/hero.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // TODO: Replace with real registration logic (e.g. API call)
    console.log("Registering user:", formData);
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      {/* Left panel — image placeholder */}
      <div className="auth-image-panel">
        <img src={hero} alt="JACKED hero" className="auth-hero-image" />
        <div className="image-placeholder"></div>
      </div>

      {/* Right panel — form */}
      <div className="auth-form-panel">
        <div className="auth-card">
          <h1 className="brand-title">JACKED</h1>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                className={`form-input${errors.username ? " input-error" : ""}`}
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
              />
              {errors.username && (
                <p className="form-error">{errors.username}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className={`form-input${errors.email ? " input-error" : ""}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className={`form-input${errors.password ? " input-error" : ""}`}
                placeholder="Create a password (min. 8 characters)"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              {errors.password && (
                <p className="form-error">{errors.password}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                className={`form-input${
                  errors.confirmPassword ? " input-error" : ""
                }`}
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <p className="form-error">{errors.confirmPassword}</p>
              )}
            </div>

            <button type="submit" className="btn-primary">
              CREATE ACCOUNT
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
