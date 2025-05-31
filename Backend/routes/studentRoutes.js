const express = require('express');
const router = express.Router();
const {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

router.post('/add-student', addStudent);
router.get('/students', getStudents);
router.put('/update-student/:id', updateStudent);
router.delete('/students/:id', deleteStudent);

module.exports = router; 