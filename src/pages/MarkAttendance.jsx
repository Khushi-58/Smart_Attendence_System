import React, { useState, useEffect } from "react";
import api from "../api";

export default function MarkAttendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await api.get("/students");
      setStudents(res.data);
    };
    fetchStudents();
  }, []);

  const toggleAttendance = (id) => {
    setAttendance({ ...attendance, [id]: !attendance[id] });
  };

  const submitAttendance = async () => {
    const marked = Object.entries(attendance).map(([id, present]) => ({ studentId: id, present }));
    await api.post("/attendance/mark", { records: marked });
    alert("Attendance saved!");
  };

  return (
    <div className="container">
      <h2>Mark Attendance</h2>
      <ul>
        {students.map((s) => (
          <li key={s._id}>
            <input type="checkbox" checked={attendance[s._id] || false} onChange={() => toggleAttendance(s._id)} />
            {s.name}
          </li>
        ))}
      </ul>
      <button onClick={submitAttendance}>Submit</button>
    </div>
  );
}
