import React, { useEffect, useState } from "react";
import api from "../api";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await api.get("/students");
      setStudents(res.data);
    };
    fetchStudents();
  }, []);

  const addStudent = async () => {
    await api.post("/students", newStudent);
    alert("Student added!");
    setNewStudent({ name: "", email: "" });
  };

  return (
    <div className="container">
      <h2>Manage Students</h2>
      <input placeholder="Name" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
      <input placeholder="Email" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} />
      <button onClick={addStudent}>Add Student</button>

      <ul>
        {students.map((s) => (
          <li key={s._id}>{s.name} — {s.email}</li>
        ))}
      </ul>
    </div>
  );
}
