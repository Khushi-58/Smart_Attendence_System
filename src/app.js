// ================================
// 📘 Smart Attendance System Backend
// ================================

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ================================
// 🗂 Ensure uploads folder exists
// ================================
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ================================
// 📸 Multer Configuration for File Uploads
// ================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// ================================
// 📤 POST: Upload Student Info + Image
// ================================
app.post("/api/students/uploads", upload.single("image"), (req, res) => {
  const { name, rollNo } = req.body;

  // Check if image was uploaded
  if (!req.file) {
    return res.status(400).json({ error: "Image is required" });
  }

  // Path for saving image
  const imagePath = `/uploads/${req.file.filename}`;
  const dataPath = path.join(__dirname, "data.json");

  // Read existing data or create a new one
  let existingData = { students: [] };
  if (fs.existsSync(dataPath)) {
    existingData = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  }

  // Create new student entry
  const newStudent = {
    id: Date.now().toString(),
    name,
    rollNo,
    imagePath,
  };

  existingData.students.push(newStudent);

  // Write updated data back to data.json
  fs.writeFileSync(dataPath, JSON.stringify(existingData, null, 2));

  res.json({
    message: "✅ Student added successfully!",
    student: newStudent,
  });
});

// ================================
// 📥 GET: Fetch All Students
// ================================
app.get("/api/students", (req, res) => {
  const dataPath = path.join(__dirname, "data.json");

  if (fs.existsSync(dataPath)) {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    res.json(data.students);
  } else {
    res.json([]);
  }
});


// ================================
// 🕒 POST: Mark Attendance
// ================================
app.post("/api/attendance", (req, res) => {
  const { rollNo, status } = req.body; // status = "Present" or "Absent"
  const dataPath = path.join(__dirname, "data.json");

  // Check if data.json exists
  if (!fs.existsSync(dataPath)) {
    return res.status(400).json({ error: "No student data found" });
  }

  // Read current data
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  // Find student
  const student = data.students.find((s) => s.rollNo === rollNo);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  // Initialize attendance array if missing
  if (!data.attendance) data.attendance = [];

  // Create attendance record
  const record = {
    rollNo,
    status,
    date: new Date().toLocaleDateString(),
  };

  data.attendance.push(record);

  // Save updated data
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  res.json({ message: "✅ Attendance marked successfully", record });
});


// ================================
// 🌐 Serve Uploaded Images Publicly
// ================================
app.use("/uploads", express.static(uploadDir));

// ================================
// 🚀 Start the Server
// ================================
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
