const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../data/data.json");

// Helper: Read existing data
function readData() {
  if (!fs.existsSync(dataFilePath)) {
    return { students: [] };
  }
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
}

// Helper: Write new data
function writeData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Add new student
exports.addStudent = (req, res) => {
  const { name, rollNo } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const data = readData();
  const newStudent = {
    id: Date.now().toString(),
    name,
    rollNo,
    imagePath: image,
  };

  data.students.push(newStudent);
  writeData(data);

  res.status(201).json({
    message: "Student added successfully!",
    student: newStudent,
  });
};

// Get all students
exports.getStudents = (req, res) => {
  const data = readData();
  res.json(data.students);
};
