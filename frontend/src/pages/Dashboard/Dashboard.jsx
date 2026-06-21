import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <h1>Welcome to JACKED</h1>
      <p>You are logged in and authenticated.</p>
      <p>
        Use the navigation bar to access your account, workouts, and nutrition pages.
      </p>
      <Link to="/" className="btn-secondary">
        Go to Home
      </Link>
    </div>
  );
};

export default Dashboard;
