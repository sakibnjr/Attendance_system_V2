const express = require('express');
const router = express.Router();
const {
  markAttendance,
  getAttendance,
  deleteAllAttendance,
  handleScan
} = require('../controllers/attendanceController');

router.post('/attendance', markAttendance);
router.get('/attendance', getAttendance);
router.delete('/attendance', deleteAllAttendance);
router.post('/scan', handleScan);

module.exports = router; 