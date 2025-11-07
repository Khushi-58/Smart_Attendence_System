const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema({
    date: String,
    present_students: [String], // roll numbers
    absent_students: [String]
});
module.exports = mongoose.model('Attendance', AttendanceSchema);