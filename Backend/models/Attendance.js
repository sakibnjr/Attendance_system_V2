const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  mac: String,
  name: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Attendance', attendanceSchema); 