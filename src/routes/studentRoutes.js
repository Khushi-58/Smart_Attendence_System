const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { addStudent, getStudents } = require("../controllers/studentController");

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.get("/", getStudents);
router.post("/upload", upload.single("image"), addStudent);

module.exports = router;
