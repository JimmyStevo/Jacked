import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login attempt', { email, password });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="brand-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to track your workouts, meals, and progress.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="form-label">
            Email
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="form-label">
            Password
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </label>

          <button type="submit" className="main-button">
            Log in
          </button>
        </form>

        <p className="auth-switch">
          New here?{' '}
          <Link to="/signUp" className="auth-link">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;