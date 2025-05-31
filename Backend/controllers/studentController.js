const Student = require('../models/Student');

let validMacAddresses = {};

const loadValidMacAddresses = async () => {
  try {
    const students = await Student.find({});
    validMacAddresses = students.reduce((acc, student) => {
      acc[student.mac] = student.name;
      return acc;
    }, {});
    console.log("Loaded valid MAC addresses:", validMacAddresses);
  } catch (error) {
    console.error("Error loading students:", error);
  }
};

const addStudent = async (req, res) => {
  const { name, id, mac } = req.body;
  const student = new Student({ name, id, mac });
  try {
    await student.save();
    validMacAddresses[mac] = name;
    res.status(201).send("Student added successfully");
  } catch (error) {
    res.status(500).send("Error adding student");
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).send("Error fetching students");
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, id: newId, mac: newMac } = req.body;

  try {
    const student = await Student.findById(id);
    if (student) {
      const oldMac = student.mac;
      student.name = name;
      student.id = newId;
      student.mac = newMac;
      await student.save();

      delete validMacAddresses[oldMac];
      validMacAddresses[newMac] = name;

      res.send("Student updated successfully");
    } else {
      res.status(404).send("Student not found");
    }
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).send("Error updating student");
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findByIdAndDelete(id);
    if (student) {
      delete validMacAddresses[student.mac];
      res.send("Student deleted successfully");
    } else {
      res.status(404).send("Student not found");
    }
  } catch (error) {
    res.status(500).send("Error deleting student");
  }
};

module.exports = {
  loadValidMacAddresses,
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  validMacAddresses
}; 