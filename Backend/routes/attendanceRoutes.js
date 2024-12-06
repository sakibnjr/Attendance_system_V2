// src/routes/attendanceRoutes.js
const express = require("express");
const Attendance = require("../models/attendance");

const router = express.Router();

// Get attendance records
router.get("/", async (req, res) => {
  try {
    const records = await Attendance.find().sort({ timestamp: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).send("Error fetching attendance records");
  }
});

// Delete all attendance records
router.delete("/", async (req, res) => {
  try {
    await Attendance.deleteMany({});
    res.send("All attendance records deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting attendance records");
  }
});

module.exports = router;
