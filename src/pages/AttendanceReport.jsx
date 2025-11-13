import React, { useState, useEffect } from "react";
import api from "../api";

export default function AttendanceReport() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/attendance/report");
      setRecords(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Attendance Report</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Student</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id}>
              <td>{r.studentName}</td>
              <td>{new Date(r.date).toLocaleDateString()}</td>
              <td>{r.present ? "Present" : "Absent"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
