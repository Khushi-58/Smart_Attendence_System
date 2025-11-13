import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <h2>Welcome, {user?.name || "User"}</h2>
      <nav>
        <Link to="/mark">Mark Attendance</Link> |{" "}
        <Link to="/report">View Reports</Link> |{" "}
        <Link to="/students">Manage Students</Link> |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        <button onClick={logout}>Logout</button>
      </nav>
    </div>
  );
}
