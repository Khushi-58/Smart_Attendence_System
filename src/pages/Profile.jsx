import React from "react";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container">
      <h2>Profile</h2>
      <p><b>Name:</b> {user?.name}</p>
      <p><b>Email:</b> {user?.email}</p>
      <p><b>Role:</b> {user?.role}</p>
    </div>
  );
}
