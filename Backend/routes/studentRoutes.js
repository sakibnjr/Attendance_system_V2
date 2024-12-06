// src/routes/studentRoutes.js
const express = require("express");
const Student = require("../models/student");

const router = express.Router();

// Add new student
router.post("/add-student", async (req, res) => {
  const { name, id, mac } = req.body;

  const student = new Student({ name, id, mac });
  try {
    await student.save();
    res.status(201).send("Student added successfully");
  } catch (error) {
    res.status(500).send("Error adding student");
  }
});

// Fetch all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).send("Error fetching students");
  }
});

// Update student information
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, id: newId, mac: newMac } = req.body;

  try {
    const student = await Student.findById(id);
    if (student) {
      student.name = name;
      student.id = newId;
      student.mac = newMac;
      await student.save();
      res.send("Student updated successfully");
    } else {
      res.status(404).send("Student not found");
    }
  } catch (error) {
    res.status(500).send("Error updating student");
  }
});

// Delete a student
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findByIdAndDelete(id);
    if (student) {
      res.send("Student deleted successfully");
    } else {
      res.status(404).send("Student not found");
    }
  } catch (error) {
    res.status(500).send("Error deleting student");
  }
});

module.exports = router;
