// src/models/attendance.js
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  mac: { type: String, required: true },
  name: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
